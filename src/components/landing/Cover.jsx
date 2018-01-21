import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import {
    fullMinHeight,
    cover,
    backgroundCover,
    flexCenter,
    flexColumn,
    standardPadding,
    standardMargin,
    textCentered,
    bottomCentered,
    arrowButton,
    headlineSize,
    logo,
    centerViaMargin,
    relative,
} from '../../constants/styles';

import COMPANY_NAME from '../../constants/companyName';
import { BOOKING_FLOW } from '../../constants/pages';

const Cover = props => (
    <div style={{ ...fullMinHeight, ...flexCenter, ...relative, backgroundColor: '#000' }}>
        <div style={{
            ...cover,
            ...backgroundCover,
            filter: 'blur(5px) opacity(0.85)',
            backgroundImage: "url('/hotel-bg.jpg')",
        }}></div>


        <div style={{ ...flexColumn, minWidth: '300px', ...textCentered, zIndex: 1 }}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                width: '8rem',
                height: '8rem',
                padding: '0.5rem',
                ...centerViaMargin,
            }}>
                <div
                    style={{
                        ...centerViaMargin,
                        height: '100%',
                        width: '100%',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: "url('/travelbid-logo.png')"
                    }}
                />
            </div>
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
                    Reservar
                </Button>
                <Button
                    size="large"
                    href="#Arrow"
                    style={{ ...standardMargin }}
                >
                    Cómo funciona?
                </Button>
            </div>
        </div>

        <a id="Arrow" href="#Arrow" style={{ ...bottomCentered, ...textCentered, ...arrowButton }}>
            ⌄
        </a>
    </div>
);

Cover.propTypes = {
    onGoToView: PropTypes.func.isRequired,
};

export default Cover;