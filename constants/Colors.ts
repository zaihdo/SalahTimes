// eslint-disable-next-line @typescript-eslint/ban-types
const colors = {
  // Brand Colors
  primary: {
    light: '#FFFFFF', // 60% in light mode
    dark: '#102540',  // 60% in dark mode
  },
  secondary: {
    light: '#102540', // 30% in light mode
    dark: '#FFFFFF',  // 30% in dark mode
  },
  accent: {
    light: '#FFC801', // 10% in light mode
    dark: '#FFC801',  // 10% in dark mode
  },
  
  // State Colors (same for both modes)
  state: {
    info: '#2F80ED',
    success: '#22BA61',
    warning: '#FFC107',
    error: '#EB5757',
  },
  
  // Text Colors
  text: {
    primary: {
      light: '#102540', // Text1 in light mode
      dark: '#FFFFFF',  // Text1 in dark mode
    },
    secondary: {
      light: '#8D8D8D', // Gray 1 in light mode
      dark: '#AAB4BE',  // Gray 1 in dark mode
    },
    tertiary: {
      light: '#7C7C7C', // Gray 2 in light mode
      dark: '#B0BEC5',  // Gray 2 in dark mode
    },
  },
  
  // Icon Colors
  icon: {
    switchOff: {
      light: '#E6E6E6',
      dark: '#4A5C6C',
    },
    tabBarOff: {
      light: '#AAAAAA',
      dark: '#6D88A0',
    },
    tabBarOn: {
      light: '#102540', // Using secondary color for active tab
      dark: '#FFFFFF',  // Using secondary color for active tab
    },
  },
  
  // Background Colors (for different sections)
  background: {
    light: '#FFFFFF',   // Primary in light mode
    dark: '#102540',    // Primary in dark mode
  },
  card: {
    light: '#F8F9FA',   // Light background for cards
    dark: '#1A2E48',    // Dark background for cards
  },
  
  // Border Colors
  border: {
    light: '#E6E6E6',
    dark: '#4A5C6C',
  },
  
  // Legacy colors (keeping for backward compatibility)
  tint: {
    light: '#102540',
    dark: '#FFC801',
  },
  tabIconDefault: {
    light: '#AAAAAA',   // Using tabBarOff color
    dark: '#6D88A0',    // Using tabBarOff color
  },
  tabIconSelected: {
    light: '#102540',   // Using tabBarOn color
    dark: '#FFFFFF',    // Using tabBarOn color
  },
  main: {
    light: '#FFC801',
    dark: '#102540',
  },
  contrast: {
    light: '#102540',
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
    light: '#8D8D8D',   // Using Gray 1
    dark: '#AAB4BE',    // Using Gray 1
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