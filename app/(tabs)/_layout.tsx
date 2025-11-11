import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import Icon from '../../components/Icon';
import fonts from '../../constants/Fonts';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme ?? 'light';
  const currentColors = Colors[currentTheme];

  const resolveColor = (val: any) => {
    if (val == null) return val;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[currentTheme] ?? val.light ?? Object.values(val)[0];
    }
    return val;
  };

  const activeTintColor = resolveColor(currentColors.tabBarIcon?.dark.active);
  const inactiveTintColor = resolveColor(currentColors.tabBarIcon?.dark.inactive);
  const backgroundColor = resolveColor(currentColors.primary);
  const headerTextColor = resolveColor(currentColors.text.primary);

  const tabIcons: Record<string, any> = {
    home: require('../../assets/icons/home2.svg'),
    calendar: require('../../assets/icons/calendar.svg'),
    mosque: require('../../assets/icons/mosque2.svg'),
    menu: require('../../assets/icons/menu.svg'),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopWidth: 0,
          padding: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.home} width={22} height={22} color={color} stroke={color} />
          ),
          headerStyle: { backgroundColor},
          tabBarLabelStyle: { color: headerTextColor, ...fonts.textSmall },
          headerTintColor: headerTextColor,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="mosques"
        options={{
          title: 'Mosques',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.mosque} width={28} height={28} color={color} stroke={color}/>
          ),
          headerStyle: { backgroundColor, elevation: 0 },
          headerTitleStyle: { color: headerTextColor, ...fonts.headingXLarge },
          headerTitleAlign: 'left',
          tabBarLabelStyle: { color: headerTextColor, ...fonts.textSmall },
          headerTintColor: headerTextColor,
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.menu} width={22} height={22} fill='none' color={color} stroke={color} />
          ),
          headerStyle: { backgroundColor, elevation: 0 },
          headerTitleStyle: { color: headerTextColor, ...fonts.headingXLarge },
          headerTitleAlign: 'left',
          tabBarLabelStyle: { color: headerTextColor, ...fonts.textSmall },
          headerTintColor: headerTextColor,
          headerShown: true,
        }}
      />
    </Tabs>
  );
}