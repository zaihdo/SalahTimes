import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import Icon from '../../components/Icon';
import fonts from '../../constants/Fonts';
import { Text } from '../../components/Themed';

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

  const activeIconColor = resolveColor(
    currentColors.tabBarIcon?.[currentTheme]?.active ??
      currentColors.icon?.tabBarOn ??
      currentColors.text?.primary
  );

  const inactiveIconColor = resolveColor(
    currentColors.tabBarIcon?.[currentTheme]?.inactive ??
      currentColors.icon?.tabBarOff ??
      currentColors.text?.secondary
  );

  const activeTabLabelColor = resolveColor(
    currentColors.tabBarLabel?.[currentTheme]?.active ??
      currentColors.icon?.tabBarOn ??
      currentColors.text?.primary
  );

  const inactiveTabLabelColor = resolveColor(
    currentColors.tabBarLabel?.[currentTheme]?.inactive ??
      currentColors.icon?.tabBarOff ??
      currentColors.text?.secondary
  );

  const backgroundColor = resolveColor(currentColors.primary);
  const headerTextColor = resolveColor(currentColors.text?.primary);
  const isIOS = Platform.OS === 'ios';

  const tabIcons: Record<string, any> = {
    home: require('../../assets/icons/home2.svg'),
    calendar: require('../../assets/icons/calendar.svg'),
    mosque: require('../../assets/icons/mosque2.svg'),
    menu: require('../../assets/icons/menu.svg'),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: inactiveIconColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          height: isIOS ? '8%' : '10%',
        },
        tabBarItemStyle: {
          paddingVertical: isIOS ? 4 : 0,
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
          tabBarLabel: ({ focused }) => (
            <Text style={[focused ? fonts.textSmallBold : fonts.textSmall, { color: focused ? activeTabLabelColor : inactiveTabLabelColor }]}>
              Home
            </Text>
          ),
          headerStyle: { backgroundColor },
          headerTintColor: headerTextColor,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="mosques"
        options={{
          title: 'Mosques',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.mosque} width={28} height={28} color={color} stroke={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[focused ? fonts.textSmallBold : fonts.textSmall, { color: focused ? activeIconColor : inactiveIconColor }]}>
              Mosques
            </Text>
          ),
          headerStyle: { backgroundColor, elevation: 0 },
          headerShadowVisible: false,
          headerTitleStyle: { color: headerTextColor, ...fonts.headingXLarge },
          headerTitleAlign: 'left',
          tabBarLabelStyle: { color: headerTextColor, ...fonts.textSmall },
          headerTintColor: headerTextColor,
          headerShown: true
        }}
      />

      {/* <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.calendar} width={22} height={22} color={color} stroke={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[focused ? fonts.textSmallBold : fonts.textSmall, { color: focused ? activeIconColor : inactiveIconColor }]}>
              Calendar
            </Text>
          ),
          headerStyle: { backgroundColor, elevation: 0 },
          headerTitleStyle: { color: headerTextColor, ...fonts.headingXLarge },
          headerTitleAlign: 'left',
          tabBarLabelStyle: { color: headerTextColor, ...fonts.textSmall },
          headerTintColor: headerTextColor,
          headerShown: false,
        }}
      /> */
      // Calendar tab is temporarily disabled. Move calendar.tsx from (misc) to (tabs) to re-enable.
      }

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <Icon source={tabIcons.menu} width={22} height={22} fill="none" color={color} stroke={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[focused ? fonts.textSmallBold : fonts.textSmall, { color: focused ? activeIconColor : inactiveIconColor }]}>
              Menu
            </Text>
          ),
          headerStyle: { backgroundColor, elevation: 0 },
          headerShadowVisible: false,
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