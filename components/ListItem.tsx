import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Text, View } from './Themed';
import { useScreenSize } from '../hooks/useScreenSize';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import fonts from '../constants/Fonts';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const prayerIcons: Record<string, React.ReactNode> = {
  Fajr: <MaterialCommunityIcons name="weather-night" size={28} color="#102540" />,
  Sunrise: <Ionicons name="sunny" size={28} color="#FFC801" />,
  Dhuhr: <Ionicons name="sunny-outline" size={28} color="#FFC801" />,
  Asr: <MaterialCommunityIcons name="weather-sunset" size={28} color="#FF9800" />,
  Maghrib: <MaterialCommunityIcons name="weather-sunset-down" size={28} color="#FF5722" />,
  Isha: <MaterialCommunityIcons name="weather-night" size={28} color="#102540" />,
};

export default function ListItem(props: { prayer: string; time: string }) {
  const { isSmall, isLarge, width, height } = useScreenSize();
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = React.useState(true);

  // Only log on mount
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '📱 ListItem Mounted - Screen Dimensions:',
      JSON.stringify(
        {
          width,
          height,
          isSmallScreen: isSmall,
          isLargeScreen: isLarge,
          component: 'ListItem',
          prayer: props.prayer,
          calculatedPadding: isSmall ? 5 : 20,
        },
        null,
        2
      )
    );
  }, []);

  // Log when screen size changes
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(
  //     '🔄 Screen Size Changed - New Dimensions:',
  //     `Width: ${width} | Height: ${height}`,
  //     `| isSmall: ${isSmall}`,
  //     `| isLarge: ${isLarge}`,
  //     `| Current Padding: ${isSmall ? 5 : 20}`
  //   );
  // }, [isSmall, isLarge, width, height]);

  const icon = prayerIcons[props.prayer] || (
    <Ionicons name="time-outline" size={28} color="#102540" />
  );

  // Get colors based on current theme
  const currentColors = Colors[colorScheme ?? 'light'];
  const isDarkMode = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          padding: isSmall ? 6 : 10,
        },
      ]}
      lightColor={Colors.light.background.light}
      darkColor={Colors.dark.background.dark}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        {React.cloneElement(icon as React.ReactElement, {
          color: isDarkMode ? currentColors.icon.tabBarOn : currentColors.text.primary
        })}
      </View>
      
      {/* Prayer Name */}
      <Text
        style={[
          styles.prayerText,
          { fontFamily: 'PlusJakartaSans-Regular' },
        ]}
        lightColor={Colors.light.text.primary.light}
        darkColor={Colors.dark.text.primary.dark}
      >
        {props.prayer}
      </Text>
      
      {/* Prayer Time */}
      <Text
        style={[
          styles.timeText,
          { fontFamily: 'PlusJakartaSans-Regular' },
        ]}
        lightColor={Colors.light.text.primary.light}
        darkColor={Colors.dark.text.primary.dark}
      >
        {props.time}
      </Text>
      
      {/* Toggle */}
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        thumbColor={isEnabled ? '#FFFFFF' : '#F5F5F5'}
        trackColor={({
          false: currentColors.icon.switchOff[colorScheme === 'dark' ? 'dark' : 'light'],
          true: currentColors.accent[colorScheme === 'dark' ? 'dark' : 'light'],
        } as any)}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 4,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    marginRight: 8,
  },
  prayerText: {
    lineHeight: 24,
    fontSize: 16,
    minWidth: 70,
    flex: 1,
  },
  timeText: {
    lineHeight: 24,
    fontSize: 16,
    minWidth: 60,
    textAlign: 'right',
    flex: 1,
  },
  switch: {
    marginLeft: 10,
  },
});