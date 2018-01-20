import React from 'react';
import PropTypes from 'prop-types';

import Cover from './Cover';
import Steps from './Steps';

const Landing = props => (
    <div>
        <Cover onGoToView={props.onGoToView} />
        <Steps />
    </div>
);

Landing.propTypes = {
    onGoToView: PropTypes.func.isRequired,
};

export default Landing;