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
    centerViaMargin,
} from '../../constants/styles';
import { LANDING } from '../../constants/pages';

export default props => (
    <div style={{ ...fullMinHeight, ...flexColumn }}>
        <Header />

        <div style={{ ...flexCenter, ...flexColumn, ...flexGrow() }}>
            <div style={{ ...standardPadding, maxWidth: '300px' }}>
                <div
                    style={{
                        ...centerViaMargin,
                        height: '6rem',
                        width: '6rem',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: "url('/travelbid-logo.png')"
                    }}
                />

                <h2 style={{ ...standardMargin, marginBottom: '3rem', ...textCentered }}>
                    Éxito!
                </h2>

                <div style={{ ...standardMargin }}>
                    <p>Reserva completada! Ahora nos ponemos a trabjar para ahorrarte dinero.</p>
                    <p>Recibirás un email 2 días antes de tu viaje con los detalles finales del hotel.</p>
                </div>

                <div style={{ ...standardMargin, marginTop: '2rem', ...textCentered }}>
                <Button
                    onClick={() => props.onGoToView(LANDING)}
                >
                    Terminar
                </Button>
                </div>
            </div>
        </div>
    </div>
);
