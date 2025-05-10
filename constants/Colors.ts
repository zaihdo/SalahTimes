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




// const colors = {
//   primary: {
//     light: '#3498db', // A softer blue for better readability
//     dark: '#2c3e50', // A deeper blue for better contrast
//   },
//   secondary: {
//     light: '#f7dc6f', // A warm, inviting yellow-orange
//     dark: '#f7dc6f', // Consistent secondary color across modes
//   },
//   background: {
//     light: '#f9f9f9', // A slight off-white for better text contrast
//     dark: '#2c3e50', // Same as primary dark for consistency
//   },
//   text: {
//     light: '#333', // A dark gray for better readability
//     dark: '#fff', // White text for high contrast on dark background
//   },
//   tint: {
//     light: '#666', // A medium gray for subtle highlights
//     dark: '#999', // A lighter gray for subtle highlights on dark
//   },
//   tabIconDefault: {
//     light: '#ccc', // A medium gray for default tab icons
//     dark: '#666', // A darker gray for default tab icons on dark
//   },
//   tabIconSelected: {
//     light: '#3498db', // Primary color for selected tab icons
//     dark: '#f7dc6f', // Secondary color for selected tab icons on dark
//   },
//   main: {
//     light: '#f7dc6f', // Secondary color for main highlights
//     dark: '#3498db', // Primary color for main highlights on dark
//   },
//   accent: {
//     light: '#17345E', // A deep blue for accents (unchanged)
//     dark: '#17345E', // A deep blue for accents (unchanged)
//   },
//   navy: {
//     light: '#091825', // A dark navy blue (unchanged)
//     dark: '#091825', // A dark navy blue (unchanged)
//   },
//   lightNavy: {
//     light: 'rgba(16, 37, 64, 0.25)', // A lighter navy blue with opacity
//     dark: 'rgba(16, 37, 64, 0.25)', // A lighter navy blue with opacity
//   },
//   gold: {
//     light: '#ffd700', // A vibrant, golden yellow
//     dark: '#ffd700', // A vibrant, golden yellow
//   },
//   textSecondary: {
//     light: '#999', // A lighter gray for secondary text
//     dark: '#666', // A darker gray for secondary text on dark
//   },
// };

// const theme = {
//   light: {
//     ...colors,
//     mode: 'light',
//   },
//   dark: {
//     ...colors,
//     mode: 'dark',
//   },
// };

// export default theme;