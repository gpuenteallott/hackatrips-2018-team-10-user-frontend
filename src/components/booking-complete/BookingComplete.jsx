import React from 'react';

import { Button } from 'antd';

import Header from '../common/Header';

import {
    flexCenter,
    standardMargin,
} from '../../constants/styles';
import { LANDING } from '../../constants/pages';

export default props => (
    <div>
        <Header />

        <div style={{ ...flexCenter }}>
            <h3 style={{ ...standardMargin }}>
                Success!
            </h3>

            <div style={{ ...standardMargin }}>
                <p>Your booking is complete! We'll get to work to save you money now.</p>
                <p>You'll receive an email 2 days before your trip with the hotel details.</p>
            </div>

            <Button
                onClick={() => props.onGoToView(LANDING)}
                style={{ ...standardMargin }}
            >
                Done
            </Button>
        </div>
    </div>
);
