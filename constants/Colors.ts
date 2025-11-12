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
    light: '#FFC107', // 10% in light mode
    dark: '#FFC107',  // 10% in dark mode
  },
  tertiary: {
      light: '#7C7C7C', // Gray 2 in light mode
      dark: '#B0BEC5',  // Gray 2 in dark mode
  },
  quartery: {
    light: '#F5F5F5',
    dark: '#7C7C7C',
  },
  complement: {
    light: '#FFFFFF',
    dark: '#182F47'
  },
  outlineActive: {
    light: '#243C57',
    dark: '#E6E6E6',
  },
  outlineInactive: {
    light: '#E6E6E6',
    dark: '#243C57',
  },
  cardBg: {
    light: '#FFFFFF',
    dark: '#182F47',
  },
  cardOutline: {
    light: '#E6E6E6',
    dark: '#243C57',
  },
  
  // State Colors (same for both modes)
  state: {
    info: '#2F80ED',
    success: '#22BA61',
    warning: '#FFC107',
    error: '#EB5757',
  },

  tabBarIcon: {
    light: {
      active: '#FFC107', 
      inactive: '#AAAAAA',
    },
    dark: {
      active: '#FFC107',
      inactive: '#6D88A0',
    } 
  },

  tabBarLabel: {
    light: {
      active: '#102540', 
      inactive: '#AAAAAA',
    },
    dark: {
      active: '#FFFFFF',
      inactive: '#6D88A0',
    } 
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
    switchOn: {
      light: '#FFD053',
      dark: '#FFD053',
    },
    tabBarOff: {
      light: '#AAAAAA',
      dark: '#6D88A0',
    },
    tabBarOn: {
      light: '#102540', // Using secondary color for active tab
      dark: '#FFFFFF',  // Using secondary color for active tab
    },
  }
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