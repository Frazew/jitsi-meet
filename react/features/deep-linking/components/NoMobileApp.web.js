/* @flow */

import React, { Component } from 'react';

import { createDeepLinkingPageEvent, sendAnalytics } from '../../analytics';

declare var interfaceConfig: Object;

/**
 * React component representing no mobile app page.
 *
 * @class NoMobileApp
 */
export default class NoMobileApp extends Component<*> {
    /**
     * Implements the Component's componentDidMount method.
     *
     * @inheritdoc
     */
    componentDidMount() {
        sendAnalytics(
            createDeepLinkingPageEvent(
                'displayed', 'noMobileApp', { isMobileBrowser: true }));
    }

    /**
     * Renders the component.
     *
     * @returns {ReactElement}
     */
    render() {
        const ns = 'no-mobile-app';

        return (
            <div className = { ns }>
                <h2 className = { `${ns}__title` }>
                    Ce site a tendance à ne pas bien fonctionner sur téléphone.
                </h2>
                <p className = { `${ns}__description` }>
                    Si vous voulez quand même essayer, passez en mode "Version pour ordinateur" dans les paramètres du navigateur.
                </p>
            </div>
        );
    }
}
