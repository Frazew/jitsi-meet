// @flow

import React from 'react';
import type { Dispatch } from 'redux';

import { translate } from '../../base/i18n';
import { NavigateSectionList } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import { showDialInSummary } from '../../invite';

import { deleteRecentListEntry } from '../actions';
import { isRecentListEnabled, toDisplayableList } from '../functions';
import AbstractRecommendedList from './AbstractRecommendedList';

/**
 * The type of the React {@code Component} props of {@link RecentList}
 */
type Props = {

    /**
     * Renders the list disabled.
     */
    disabled: boolean,

    /**
     * The redux store's {@code dispatch} function.
     */
    dispatch: Dispatch<any>,

    /**
     * The translate function.
     */
    t: Function,

    /**
     * The default server URL.
     */
    _defaultServerURL: string,

    /**
     * The recent list from the Redux store.
     */
    _recommendedList: Array<Object>
};

declare var interfaceConfig: Object;
const recommendedList = new Set(interfaceConfig.RECOMMENDED_ROOMS);

/**
 * A class that renders the list of the recently joined rooms.
 *
 */
class RecommendedList extends AbstractRecommendedList<Props> {
    _getRenderListEmptyComponent: () => React$Node;
    _onPress: string => {};

    /**
     * Initializes a new {@code RecentList} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onDelete = this._onDelete.bind(this);
        this._onShowDialInInfo = this._onShowDialInInfo.bind(this);
    }

    /**
     * Implements the React Components's render method.
     *
     * @inheritdoc
     */
    render() {
        if (!isRecentListEnabled()) {
            return null;
        }
        const {
            disabled,
            t,
            _defaultServerURL,
            _recentList
        } = this.props;
        const recentList = toDisplayableList(_recentList, t, _defaultServerURL);
        const slideActions = [ {
            backgroundColor: ColorPalette.blue,
            onPress: this._onShowDialInInfo,
            text: t('welcomepage.info')
        }, {
            backgroundColor: 'red',
            onPress: this._onDelete,
            text: t('welcomepage.recentListDelete')
        } ];

        return (
            <NavigateSectionList
                disabled = { disabled }
                onPress = { this._onPress }
                renderListEmptyComponent
                    = { this._getRenderListEmptyComponent() }
                sections = { recentList }
                slideActions = { slideActions } />
        );
    }

    _onDelete: Object => void

    /**
     * Callback for the delete action of the list.
     *
     * @param {Object} itemId - The ID of the entry thats deletion is
     * requested.
     * @returns {void}
     */
    _onDelete(itemId) {
        this.props.dispatch(deleteRecentListEntry(itemId));
    }

    _onShowDialInInfo: Object => void

    /**
     * Callback for the dial-in info action of the list.
     *
     * @param {Object} itemId - The ID of the entry for which we'd like to show the dial in numbers.
     * @returns {void}
     */
    _onShowDialInInfo(itemId) {
        this.props.dispatch(showDialInSummary(itemId.url));
    }
}

/**
 * Maps (parts of) the redux state to {@link Toolbox}'s React {@code Component}
 * props.
 *
 * @param {Object} state - The redux store/state.
 * @private
 * @returns {{}}
 */
function _mapStateToProps() {
    return {
        _recommendedList: recommendedList
    };
}

export default translate(connect(_mapStateToProps)(RecommendedList));
