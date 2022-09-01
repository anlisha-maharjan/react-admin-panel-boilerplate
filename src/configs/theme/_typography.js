function pxToRem(value) {
  return `${value / 10}rem`;
}

export const Typography = {
  fontFamily: "Montserrat",
  htmlFontSize: 10,
  fontSize: 18,

  body1: {
    fontSize: pxToRem(18),
    fontWeight: 400,
  },
  body2: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: pxToRem(24),
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: pxToRem(20),
    fontWeight: 400,
  },
  h1: {
    fontSize: pxToRem(48),
    fontWeight: 700,
  },
  h2: {
    fontSize: pxToRem(32),
    fontWeight: 700,
  },
  h3: {
    fontSize: pxToRem(28),
    fontWeight: 700,
  },
  h4: {
    fontSize: pxToRem(24),
    fontWeight: 700,
    lineHeight: 1.6,
  },
  h5: {
    fontSize: pxToRem(20),
    fontWeight: 700,
  },
  h6: {
    fontSize: pxToRem(16),
    fontWeight: 700,
  },
};
