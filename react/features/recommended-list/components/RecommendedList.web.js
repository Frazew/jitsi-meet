// @flow

import React from 'react';

import { MeetingsAlternativeList } from '../../base/react';

import AbstractRecommendedList from './AbstractRecommendedList';
import { connect } from '../../base/redux';
import { translate } from '../../base/i18n';

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
     * The recent list from the Redux store.
     */
    _recommendedList: Array<Object>
};

declare var interfaceConfig: Object;
const recommendedList = interfaceConfig.RECOMMENDED_ROOMS;

/**
 * The cross platform container rendering the list of the recently joined rooms.
 *
 */
class RecommendedList extends AbstractRecommendedList<Props> {
    _getRenderListEmptyComponent: () => React$Node;
    _onPress: string => {};

    /**
     * Initializes a new {@code RecommendedList} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._getRenderListEmptyComponent
            = this._getRenderListEmptyComponent.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    /**
     * Implements the React Components's render method.
     *
     * @inheritdoc
     */
    render() {
        const {
            disabled,
            _recommendedList
        } = this.props;
        const localRecommendedList = _recommendedList;

        return (
            <MeetingsAlternativeList
                disabled = { disabled }
                hideURL = { true }
                listEmptyComponent = { this._getRenderListEmptyComponent() }
                meetings = { localRecommendedList }
                onPress = { this._onPress } />
        );
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
