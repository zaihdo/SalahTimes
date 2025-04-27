const colors = {
  primary: {
    light: '#2f95dc',
    dark: '#fff',
  },
  secondary: {
    light: '#FFC801',
    dark: '#FFC801',
  },
  background: {
    light: '#fff',
    dark: '#091825',
  },
  text: {
    light: '#000',
    dark: '#fff',
  },
  tint: {
    light: '#091825',
    dark: '#FFC801',
  },
  tabIconDefault: {
    light: '#ccc',
    dark: '#ccc',
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
    light: '#17345E',
    dark: '#17345E',
  },
  navy: {
    light: '#091825',
    dark: '#091825',
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