import { transparentize } from 'polished';

const tan = '#F5ECE6';
const bark = '#481210';
const black = '#100b0a';
const tangerine = '#EEAC33';
const berry = '#DB3630';
const grass = '#80C23E';

const colours = {
  images: {
    vignette: `radial-gradient(ellipse at 50% 50%, ${transparentize(0.7, black)}, ${transparentize(
      0.0,
      black,
    )})`,
  },
  body: {
    bg: tan,
    text: bark,
    text_light: tan,
  },
  navigation: {
    text: bark,
    activeBorderColor: bark,
  },
  forms: {
    borderColor: bark,
    borderFocusColor: tangerine,
    error: berry,
    success: grass,
  },
  rsvp: {
    yes: grass,
    no: berry,
  },
  button: {
    primary: {
      background: bark,
      color: tan,
    },
    hollow: {
      background: 'transparent',
      color: bark,
    },
  },
};

export default colours;
