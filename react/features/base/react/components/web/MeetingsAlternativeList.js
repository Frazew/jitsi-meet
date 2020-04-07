// @flow

import React, { Component } from 'react';

import Container from './Container';
import Text from './Text';
import {
    IconYoutube
} from '../../../icons';
import Icon from '../../../icons/components/Icon';

type Props = {

    /**
     * Indicates if the list is disabled or not.
     */
    disabled: boolean,

    /**
     * Indicates if the URL should be hidden or not.
     */
    hideURL: boolean,

    /**
     * Function to be invoked when an item is pressed. The item's URL is passed.
     */
    onPress: Function,

    /**
     * Rendered when the list is empty. Should be a rendered element.
     */
    listEmptyComponent: Object,

    /**
     * An array of meetings.
     */
    meetings: Array<Object>,

    /**
     * Defines what happens when  an item in the section list is clicked
     */
    onItemClick: Function
};

/**
 * Implements a React/Web {@link Component} for displaying a list with
 * meetings.
 *
 * @extends Component
 */
export default class MeetingsAlternativeList extends Component<Props> {
    /**
     * Constructor of the MeetingsAlternativeList component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onPress = this._onPress.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    /**
     * Renders the content of this component.
     *
     * @returns {React.ReactNode}
     */
    render() {
        const { listEmptyComponent, meetings } = this.props;

        /**
         * If there are no recent meetings we don't want to display anything
         */
        if (meetings) {
            return (
                <Container
                    className = 'meetings-list'>
                    {
                        meetings.length === 0
                            ? listEmptyComponent
                            : meetings.map(this._renderItem)
                    }
                </Container>
            );
        }

        return null;
    }

    _onPress: string => Function;

    /**
     * Returns a function that is used in the onPress callback of the items.
     *
     * @param {string} url - The URL of the item to navigate to.
     * @private
     * @returns {Function}
     */
    _onPress(url) {
        const { disabled, onPress } = this.props;

        if (!disabled && url && typeof onPress === 'function') {
            return () => onPress(url);
        }

        return null;
    }

    _renderItem: (Object, number) => React$Node;

    /**
     * Renders an item for the list.
     *
     * @param {Object} meeting - Information about the meeting.
     * @param {number} index - The index of the item.
     * @returns {Node}
     */
    _renderItem(meeting, index) {
        const {
            title,
            url,
            ytURL,
            hint
        } = meeting;
        const { hideURL = false, disabled } = this.props;
        const onPress = this._onPress(url);
        const onPressYT = this._onPress(`https://youtube.com/watch?v=${ytURL}`);
        const rootClassName
            = `item${
                disabled ? ' item-disabled' : ''}`;
        const leftClassName
            = `left-column ${
                onPress ? 'with-click-handler' : 'without-click-handler'}`;
        const itemTitleClass
            = `right-column ${
                onPress ? 'with-click-handler' : 'without-click-handler'}`;

        return (
            <Container
                className = { rootClassName }
                key = { index }>
                <Container
                    className = { leftClassName }
                    onClick = { onPressYT }>
                    {
                        ytURL
                            ? <Icon src = { IconYoutube } />
                            : null
                    }
                </Container>
                <Container
                    className = { itemTitleClass }
                    onClick = { onPress }>
                    <Text className = 'title'>
                        { title }
                        { disabled ? <small>&nbsp;&nbsp;Pas encore ouverte - { hint } </small> : null}
                    </Text>
                    {
                        hideURL || !url ? null : (
                            <Text>
                                { url }
                            </Text>)
                    }
                </Container>
            </Container>
        );
    }
}
