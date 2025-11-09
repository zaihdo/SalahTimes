import React from 'react';
import { StyleSheet, Switch, Pressable } from 'react-native';
import { Text, View } from './Themed';
import { useScreenSize } from '../hooks/useScreenSize';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import fonts from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { SvgProps } from 'react-native-svg';

// import menu SVG icons (requires react-native-svg & react-native-svg-transformer)
import AboutIcon from '../assets/icons/about-us.svg';
import ContactIcon from '../assets/icons/contact-us.svg';
import PrivacyIcon from '../assets/icons/privacy-security.svg';
import SettingsIcon from '../assets/icons/settings.svg';

const menuIcons: Record<string, React.ComponentType<any>> = {
  'About Us': AboutIcon as React.ComponentType<any>,
  'Contact Us': ContactIcon as React.ComponentType<any>,
  'Privacy & Security': PrivacyIcon as React.ComponentType<any>,
  'Settings': SettingsIcon as React.ComponentType<any>,
};

type MenuIconListItemProps = {
  title: string;
  route?: string;
  suffix?: 'toggle' | 'chevron' | 'none';
};

export default function MenuIconListItem({ title, route, suffix = 'chevron' }: MenuIconListItemProps) {
  const { isSmall } = useScreenSize();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const [isEnabled, setIsEnabled] = React.useState(true);
  const router = useRouter();

  // get SVG component (no fallback)
  const Icon = menuIcons[title];

  // Get theme colors
  const currentColors = Colors[theme];

  const handleChevronPress = () => {
    if (route) {
      // push expects Href<string | object>; cast to any to allow passing string routes
      router.push(route as any);
    }
  };

  const iconColor = currentColors?.primary?.[theme === 'dark' ? 'light' : 'dark'] ?? '#555';

  const renderIcon = () => {
    if (!Icon) return null;
    // pass fill/stroke/color so the SVG uses theme color
    return <Icon width={28} height={28} stroke={iconColor} color={iconColor} />;
  };

  return (
    <View
      style={[
        styles.container,
        {
          padding: isSmall ? 6 : 10,
          borderColor: currentColors?.tertiary?.[theme === 'dark' ? 'dark' : 'light'] ?? 'rgba(0,0,0,0.08)',
        },
      ]}
      lightColor={Colors.light.primary.light}
      darkColor={Colors.dark.primary.dark}
    >
      {/* Icon (SVG component) */}
      {renderIcon()}

      {/* Title */}
      <Text
        style={[
          styles.titleText,
          { fontFamily: 'PlusJakartaSans-Regular', color: currentColors?.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] },
        ]}
      >
        {title}
      </Text>

      {/* Suffix: toggle | chevron | none */}
      {suffix === 'toggle' ? (
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          thumbColor={isEnabled ? '#FFFFFF' : '#F5F5F5'}
          trackColor={{
            false: currentColors.icon.switchOff[theme === 'dark' ? 'dark' : 'light'],
            true: currentColors.icon.switchOn[theme === 'dark' ? 'dark' : 'light'],
          } as any}
          style={styles.switch}
        />
      ) : suffix === 'chevron' ? (
        <Pressable
          onPress={handleChevronPress}
          hitSlop={308}
          accessibilityRole="link"
          accessibilityLabel={`${title} - open`}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            borderRadius: 16,
            padding: 0,
            backgroundColor: currentColors?.quartery?.[theme === 'dark' ? 'dark' : 'light'],
          })}
          disabled={!route}
        >
          <Ionicons
            name="chevron-forward"
            size={22}
            color={currentColors?.text?.primary?.[theme === 'dark' ? 'dark' : 'light']}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  titleText: {
    lineHeight: 24,
    minWidth: 'auto',
    flex: 1,
    marginLeft: 8,
  },
  switch: {
    marginLeft: 10,
  },
});