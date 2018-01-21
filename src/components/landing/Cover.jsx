import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import {
    fullMinHeight,
    cover,
    backgroundCover,
    blur,
    flexCenter,
    flexColumn,
    standardPadding,
    standardMargin,
    textCentered,
    bottomCentered,
    arrowButton,
    headlineSize,
    logo,
} from '../../constants/styles';

import COMPANY_NAME from '../../constants/companyName';
import { BOOKING_FLOW } from '../../constants/pages';

const Cover = props => (
    <div style={{ ...fullMinHeight, ...flexCenter }}>
        <div style={{
            ...cover,
            ...backgroundCover,
            ...blur,
            zIndex: -1,
            backgroundImage: "url('/hotel-bg.jpg')",
        }}></div>


        <div style={{ ...flexColumn }}>
            <h1 style={{ ...standardPadding, ...headlineSize, ...logo }}>
                {COMPANY_NAME}
            </h1>

            <div style={{ ...standardPadding, ...flexColumn  }}>
                <Button
                    size="large"
                    type="primary"
                    style={{ ...standardMargin }}
                    onClick={() => props.onGoToView(BOOKING_FLOW)}
                >
                    Book Now
                </Button>
                <Button size="large" style={{ ...standardMargin }}>
                    Log in
                </Button>
            </div>
        </div>

        <button style={{ ...bottomCentered, ...textCentered, ...arrowButton }}>
            ⌄
        </button>
    </div>
);

Cover.propTypes = {
    onGoToView: PropTypes.func.isRequired,
};

export default Cover;