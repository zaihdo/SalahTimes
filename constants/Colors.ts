// eslint-disable-next-line @typescript-eslint/ban-types
const colors = {
  primary: {
    light: '#102540',
    dark: '#102540',
  },
  secondary: {
    light: '#f9f9f9',
    dark: '#FFC801',
  },
  background: {
    light: '#dbe5f1',
    dark: '#102540',
  },
  text: {
    light: '#102540',
    dark: '#FFC801',
  },
  tint: {
    light: '#102540',
    dark: '#FFC801',
  },
  tabIconDefault: {
    light: '#17345E90',
    dark: '#FFC80190',
  },
  tabIconSelected: {
    light: '#091825',
    dark: '#FFC801',
  },
  main: {
    light: '#FFC801',
    dark: '#102540',
  },
  accent: {
    light: '#FFC80180',
    dark: '#17345E',
  },
  contrast: {
    light: '#091825',
    dark: '#FFC801',
  },
  lightNavy: {
    light: 'rgba(16, 37, 64, 0.25)',
    dark: 'rgba(16, 37, 64, 0.25)',
  },
  gold: {
    light: '#FFC801',
    dark: '#FFC801',
  },
  textSecondary: {
    light: '#555',
    dark: '#ccc',
  },
};

const theme = {
  light: {
    ...colors,
    mode: 'light',
  },
  dark: {
    ...colors,
    mode: 'dark',
  },
};

export default theme;
