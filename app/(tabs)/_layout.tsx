import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import CustomIcon from '../../components/CustomIcon'; // Import your custom component
import fonts from '../../constants/Fonts';

function TabBarIcon(props: {
  name: 'home' | 'calendar' | 'mosque' | 'menu'; // Use your custom icon names
  focused: boolean;
}) {
  return (
    <CustomIcon 
      name={props.name} 
      size={22} 
      focused={props.focused}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme ?? 'light';
  const currentColors = Colors[currentTheme];

  // helper to resolve themed tokens (objects like { light: '#fff', dark: '#000' }) to a string
  const resolveColor = (val: any) => {
    if (val == null) return val;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[currentTheme] ?? val.light ?? Object.values(val)[0];
    }
    return val;
  };

  const activeTintColor = resolveColor(currentColors.text.primary);
  const inactiveTintColor = resolveColor(currentColors.icon?.tabBarOff);
  const backgroundColor = resolveColor(currentColors.background);
  const headerTextColor = resolveColor(currentColors.text.primary);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopWidth: 0,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
          headerStyle: {
            backgroundColor: backgroundColor, 
          },
          tabBarLabelStyle: {
            color: headerTextColor,
            ...fonts.textSmall
          },
          headerTintColor: headerTextColor,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="masjids"
        options={{
          title: 'Masjids',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="mosque" focused={focused} />
          ),
          headerStyle: {
            backgroundColor: backgroundColor, 
          },
          tabBarLabelStyle: {
            color: headerTextColor, 
            ...fonts.textSmall
          },
          headerTintColor: headerTextColor, 
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="menu" focused={focused} />
          ),
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          tabBarLabelStyle: {
            color: headerTextColor,
            ...fonts.textSmall
          },
          headerTintColor: headerTextColor
        }}
      />
    </Tabs>
  );
}