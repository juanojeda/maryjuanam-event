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
  serifLight: `${fontNames.serifLight}, serif`,
  serifRegular: `${fontNames.serifRegular}, serif`,
  serifBold: `${fontNames.serifBold}, serif`,
};

const fontCursive = {
  fontFamily: fontNames.cursive,
  fontFilePath: `${fontPath}DawningofaNewDay`,
};

const fontSerifRegular = {
  fontFamily: `${fontNames.serifLight}`,
  fontFilePath: `${fontPath}CormorantInfant-Regular`,
  fontWeight: 400,
};

const fontSerifLight = {
  fontFamily: `${fontNames.serifRegular}`,
  fontFilePath: `${fontPath}CormorantInfant-Light`,
  fontWeight: 200,
};

const fontSerifBold = {
  fontFamily: `${fontNames.serifBold}`,
  fontFilePath: `${fontPath}CormorantInfant-SemiBold`,
  fontWeight: 600,
};

export const getFonts = () => [
  { ...fontFace({ ...fontCursive, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifLight, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifRegular, fileFormats: ['ttf'] }) },
  { ...fontFace({ ...fontSerifBold, fileFormats: ['ttf'] }) },
];
