// @flow

import _ from 'lodash';

import { appNavigate } from '../../app';
import { connect } from '../../base/redux';
import { getConferenceName } from '../../base/conference/functions';
import { IconOpenInNew } from '../../base/icons/svg';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox';

declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of {@link HangupButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The subject or the of the conference.
     * Falls back to conference name.
     */
    _roomName: string,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * Component that renders a toolbar button for leaving the current conference.
 *
 * @extends AbstractHangupButton
 */
class SwitchRoomButton extends AbstractButton<Props, *> {
    _switchRoom: Function;

    icon = IconOpenInNew;
    accessibilityLabel = 'Changer de salle';
    label = 'Changer de salle';
    tooltip = 'Changer de salle';

    toggledIcon = IconOpenInNew;

    /**
     * Initializes a new HangupButton instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._switchRoom = _.once(() => {
            const { _roomName } = this.props;
            let found = false;
            let isNext = false;

            interfaceConfig.RECOMMENDED_ROOMS.forEach(
                configRoom => {
                    if (configRoom.title === _roomName) {
                        isNext = true;
                    } else if (isNext) {
                        found = true;
                        this.props.dispatch(appNavigate(`//onlight.minet.net/${configRoom.url}`));
                    }
                }
            );

            if (!found) {
                this.props.dispatch(appNavigate(`//onlight.minet.net/${interfaceConfig.RECOMMENDED_ROOMS[0].url}`));
            }
        });
    }

    /**
     * Handles clicking / pressing the button, and disconnects the conference.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this._doSwitch();
    }

    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _doSwitch() {
        this._switchRoom();
    }
}

/**
 * Maps (parts of) the Redux state to the associated
 * {@code Subject}'s props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _subject: string,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state) {
    return {
        _roomName: getConferenceName(state)
    };
}

export default connect(_mapStateToProps)(SwitchRoomButton);
