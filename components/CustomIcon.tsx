// components/CustomIcon.tsx
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

// Define your icon mappings with active and inactive states
const iconMap: Record<string, { active: ImageSourcePropType; inactive: ImageSourcePropType }> = {
  mosque: {
    active: require('../assets/icons/Mosque_Active.png'),
    inactive: require('../assets/icons/Mosque_Inactive.png'),
  },
  menu: {
    active: require('../assets/icons/Menu_Active.png'),
    inactive: require('../assets/icons/Menu_Inactive.png'),
  },
  calendar: {
    active: require('../assets/icons/Calendar_Active.png'),
    inactive: require('../assets/icons/Calendar_Inactive.png'),
  },
  home: {
    active: require('../assets/icons/Home_Active.png'),
    inactive: require('../assets/icons/Home_Inactive.png'),
  },
  // Prayer time icons (these might not need active/inactive states)
  fajr: {
    active: require('../assets/icons/Fajr.png'),
    inactive: require('../assets/icons/Fajr.png'), // Same for both states
  },
  dhuhr: {
    active: require('../assets/icons/Dhuhr.png'),
    inactive: require('../assets/icons/Dhuhr.png'), // Same for both states
  },
  asr: {
    active: require('../assets/icons/Asr.png'),
    inactive: require('../assets/icons/Asr.png'), // Same for both states
  },
  maghrib: {
    active: require('../assets/icons/Maghrib.png'),
    inactive: require('../assets/icons/Maghrib.png'), // Same for both states
  },
  esha: {
    active: require('../assets/icons/Esha.png'),
    inactive: require('../assets/icons/Esha.png'), // Same for both states
  },
  sunrise: {
    active: require('../assets/icons/Sunrise.png'),
    inactive: require('../assets/icons/Sunrise.png'), // Same for both states
  }
};

interface CustomIconProps {
  name: keyof typeof iconMap;
  size?: number;
  focused?: boolean;
}

export default function CustomIcon({ name, size = 24, focused = false }: CustomIconProps) {
  const iconSet = iconMap[name];
  
  if (!iconSet) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  const iconSource = focused ? iconSet.active : iconSet.inactive;

  return (
    <Image 
      source={iconSource}
      style={[
        styles.icon,
        { 
          width: size, 
          height: size,
        }
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});