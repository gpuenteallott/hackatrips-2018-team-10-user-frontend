import React from 'react';

import {
    fullMinHeight,
    flexColumn,
    flexCenter,
    standardMargin,
    standardPadding,
    textCentered,
    subheadlineSize,
} from '../../constants/styles';

const CenteredParagraph = (props) => (
    <p style={{ ...textCentered, ...props.style }}>{props.children}</p>
);

export default () => (
    <div style={{ ...flexCenter, ...flexColumn, ...fullMinHeight, ...standardPadding }}>
        <div style={{ ...flexColumn, ...standardMargin }}>
            <CenteredParagraph style={{ ...subheadlineSize }}>1</CenteredParagraph>
            <CenteredParagraph>Lorem Ipsum</CenteredParagraph>
        </div>

        <div style={{ ...flexColumn, ...standardMargin }}>
            <CenteredParagraph style={{ ...subheadlineSize }}>2</CenteredParagraph>
            <CenteredParagraph>Lorem Ipsum</CenteredParagraph>
        </div>

        <div style={{ ...flexColumn, ...standardMargin }}>
            <CenteredParagraph style={{ ...subheadlineSize }}>3</CenteredParagraph>
            <CenteredParagraph>Lorem Ipsum</CenteredParagraph>
        </div>
    </div>
);