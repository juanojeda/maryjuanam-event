import { fontFace } from 'polished';

const fontPath = '/static/fonts/';

export const fontNames = {
  cursive: 'Dawning of a New Day',
  serifLight: 'Cormorant Infant Light',
  serifRegular: 'Cormorant Infant Regular',
  serifBold: 'Cormorant Infant Bold',
};

export const fontStacks = {
  cursive: `${fontNames.cursive}, cursive`,
  serif: `${fontNames.serif}, serif`,
};

const fontCursive = {
  fontFamily: fontNames.cursive,
  fontFilePath: `${fontPath}DawningofaNewDay`,
};

const fontSerifRegular = {
  fontFamily: `${fontNames.serifLight}`,
  fontFilePath: `${fontPath}CormorantInfant-Regular`,
  fontWeight: 'regular',
};

const fontSerifLight = {
  fontFamily: `${fontNames.serifRegular}`,
  fontFilePath: `${fontPath}CormorantInfant-Light`,
  fontWeight: 'light',
};

const fontSerifBold = {
  fontFamily: `${fontNames.serifBold}`,
  fontFilePath: `${fontPath}CormorantInfant-SemiBold`,
  fontWeight: 'bold',
};

export const getFonts = () => [
  { ...fontFace({ ...fontCursive, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifLight, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifRegular, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifBold, fileFormats: ['ttf'] }) },
];
