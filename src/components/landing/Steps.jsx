import React from 'react';

import {
    fullMinHeight,
    flexColumn,
    flexCenter,
    standardMargin,
    standardPadding,
    textCentered,
    subheadlineSize,
    centerViaMargin,
    secondaryBgColor,
} from '../../constants/styles';

const StepParagraph = (props) => (
    <p style={{ ...textCentered, fontSize: '1.1rem', ...props.style }}>{props.children}</p>
);

const StepNumber = props => (
    <StepParagraph style={{ ...subheadlineSize, ...flexCenter }}>
        <span style={{
            ...secondaryBgColor,
            height: '2.5rem',
            width: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
        }}>
            {props.children}
        </span>
    </StepParagraph>
)

const Logo = () => (
    <div style={{ marginBottom: '3rem' }}>
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            width: '6rem',
            height: '6rem',
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
    </div>
)

export default () => (
    <div id="Steps" style={{ ...flexCenter, ...flexColumn, ...fullMinHeight, ...standardPadding, maxWidth: '400px', ...centerViaMargin }}>
        <Logo />

        <div style={{ ...flexColumn, ...standardMargin }}>
            <StepNumber>1</StepNumber>
            <StepParagraph>Cliente realiza reserva de habitación</StepParagraph>
        </div>

        <div style={{ ...flexColumn, ...standardMargin }}>
            <StepNumber>2</StepNumber>
            <StepParagraph>Los hoteles pujan por clientes con reservas a través de su dashboard</StepParagraph>
        </div>

        <div style={{ ...flexColumn, ...standardMargin }}>
            <StepNumber>3</StepNumber>
            <StepParagraph>48h antes del check-in, se asigna la reserva final al hotel con la puja ganadora</StepParagraph>
        </div>

        <div style={{ ...flexColumn, ...standardMargin }}>
            <StepParagraph style={{ fontSize: '2.5rem' }}>🎉</StepParagraph>
        </div>
    </div>
);