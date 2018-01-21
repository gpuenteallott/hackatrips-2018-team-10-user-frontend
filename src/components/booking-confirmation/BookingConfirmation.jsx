import React from 'react';

import { Button } from 'antd';

import Header from '../common/Header';

import {
    flexCenter,
    standardMargin,
    flexColumn,
    fullMinHeight,
    flexGrow,
    standardPadding,
    textCentered,
} from '../../constants/styles';
import { LANDING } from '../../constants/pages';

export default props => (
    <div style={{ ...fullMinHeight, ...flexColumn }}>
        <Header />

        <div style={{ ...flexCenter, ...flexColumn, ...flexGrow() }}>
            <div style={{ ...standardPadding, maxWidth: '300px' }}>
                <h2 style={{ ...standardMargin, marginBottom: '3rem', ...textCentered }}>
                    Success!
                </h2>

                <div style={{ ...standardMargin }}>
                    <p>Your booking is complete! We'll get to work to save you money now.</p>
                    <p>You'll receive an email 2 days before your trip with the hotel details.</p>
                </div>

                <div style={{ ...standardMargin, marginTop: '2rem', ...textCentered }}>
                <Button
                    onClick={() => props.onGoToView(LANDING)}
                >
                    Done
                </Button>
                </div>
            </div>
        </div>
    </div>
);
