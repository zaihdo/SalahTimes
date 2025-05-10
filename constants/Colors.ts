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
    light: '#f9f9f9',
    dark: '#102540',
  },
  text: {
    light: '#102540',
    dark: '#fff',
  },
  tint: {
    light: '#102540',
    dark: '#FFC801',
  },
  tabIconDefault: {
    light: '#17345E80',
    dark: '#FFC80180',
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
    light: '#FFC80160',
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
    light: '#666',
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
