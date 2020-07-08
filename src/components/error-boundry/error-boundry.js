import React, { Component } from 'react';
import ErrorAlert from '../error-alert/error-alert';

export default class ErrorBoundry extends Component {
    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }
    
    render() {
        if (this.state.hasError) {
            return <ErrorAlert></ErrorAlert>
        }

        return this.props.children;
    }
}