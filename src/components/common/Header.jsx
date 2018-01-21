import React from 'react';

import {
    standardPadding,
    secondaryBgColor,
    logo,
    accentColor,
    standardMargin,
} from '../../constants/styles';
import COMPANY_NAME from '../../constants/companyName';

export default props => (
    <header style={{ ...standardPadding, ...secondaryBgColor, ...accentColor }}>
        <h2
            style={{ ...logo, ...standardMargin }}
            onClick={props.onLogoClick}
        >
            {props.onLogoClick && '< '}{COMPANY_NAME}
        </h2>
    </header>
)