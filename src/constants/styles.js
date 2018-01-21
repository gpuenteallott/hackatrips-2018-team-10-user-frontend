import {
    primaryColor,
    secondaryColor,
    softColor,
    accentColor as accentFontColor,
} from './palette';

export const fullMinHeight = { minHeight: '100vh' };
export const cover = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
export const backgroundCover = { backgroundSize: 'cover', backgroundPosition: 'center' };

export const flexCenter = { display: 'flex', alignItems: 'center', justifyContent: 'center' };
export const flexColumn = { display: 'flex', flexDirection: 'column' };
export const flexGrow = (grow = 1) => ({ flexGrow: grow });

export const standardPadding = { padding: '0.5rem' };
export const standardMargin = { margin: '0.5rem' };
export const textCentered = { textAlign: 'center' };
export const centerViaMargin = { margin: '0 auto' };

export const bottomCentered = { position: 'absolute', bottom: '1rem' };
export const relative = { position: 'relative' };
export const arrowButton = { fontSize: '3rem', color: '#fff' };

export const textBodySize = { fontSize: '1rem' };
export const subheadlineSize = { fontSize: '1.5rem' };
export const headlineSize = { fontSize: '2rem' };

export const logo = { color: accentFontColor, letterSpacing: '1px' };

export const primaryBgColor = { backgroundColor: primaryColor };
export const secondaryBgColor = { backgroundColor: secondaryColor };
export const softBgColor = { backgroundColor: softColor };
export const accentColor = { color: accentFontColor };