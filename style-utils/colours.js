import { transparentize } from 'polished';

const tan = '#F5ECE6';
const bark = '#481210';
const black = '#100b0a';

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
};

export default colours;
