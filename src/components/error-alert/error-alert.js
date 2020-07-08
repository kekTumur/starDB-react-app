import React from 'react';

import './error-alert.css';

const ErrorAlert = () => {
    return (
        <React.Fragment>
            <h1>BOOM!</h1>
            <span className="err">error</span>
        </React.Fragment>
    );
};

export default ErrorAlert;
