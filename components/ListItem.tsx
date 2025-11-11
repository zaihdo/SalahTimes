import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Text, View } from './Themed';
import { useScreenSize } from '../hooks/useScreenSize';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import fonts from '../constants/Fonts';

// import SVGs as React components (requires react-native-svg & react-native-svg-transformer)
import FajrIcon from '../assets/icons/Fajr.svg';
import SunriseIcon from '../assets/icons/Sunrise.svg';
import DhuhrIcon from '../assets/icons/Dhuhr.svg';
import AsrIcon from '../assets/icons/Asr.svg';
import MaghribIcon from '../assets/icons/Maghrib.svg';
import IshaIcon from '../assets/icons/Esha.svg';
import IshaDarkIcon from '../assets/icons/EshaDark.svg';

const prayerIcons: Record<string, React.ComponentType<any>> = {
  Fajr: FajrIcon,
  Sunrise: SunriseIcon,
  Zawwal: DhuhrIcon,
  Dhuhr: DhuhrIcon,
  "Dhuhr-Sunday": DhuhrIcon,
  "Asr-Shafiee": AsrIcon,
  "Asr-Hanafee": AsrIcon,
  Asr: AsrIcon,
  Sunset: MaghribIcon,
  Maghrib: MaghribIcon,
  Isha: IshaDarkIcon
};

export default function ListItem(props: { prayer: string; time: string }) {
  const { isSmall } = useScreenSize();
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = React.useState(true);

  // get SVG component (no fallback)
  const Icon = prayerIcons[props.prayer];

  // Get theme colors
  const currentColors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        styles.container,
        {
          padding: isSmall ? 6 : 10,
          borderColor: currentColors.cardOutline?.[colorScheme === 'dark' ? 'dark' : 'light'] ?? 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ]}
      lightColor={Colors.light.cardBg.light}
      darkColor={Colors.dark.cardBg.dark}
    >
      {/* Icon (SVG component) */}
      {Icon ? <Icon width={28} height={28} /> : null}

      {/* Prayer Name */}
      <Text
        style={[
          styles.prayerText,
          { fontFamily: 'PlusJakartaSans-Regular' },
        ]}
        lightColor={currentColors.text.primary.light}
        darkColor={currentColors.text.primary.dark}
      >
        {props.prayer}
      </Text>

      {/* Prayer Time */}
      <Text
        style={[
          styles.timeText,
          { fontFamily: 'PlusJakartaSans-Regular' },
        ]}
        lightColor={currentColors.text.primary.light}
        darkColor={currentColors.text.primary.dark}
      >
        {props.time}
      </Text>

      {/* Toggle */}
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        thumbColor={isEnabled ? '#FFFFFF' : '#F5F5F5'}
        trackColor={{
          false: currentColors.icon.switchOff[colorScheme === 'dark' ? 'dark' : 'light'],
          true: currentColors.icon.switchOn[colorScheme === 'dark' ? 'dark' : 'light'],
        } as any}
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

  },
  prayerText: {
    lineHeight: 24,
    fontSize: 16,
    minWidth: 70,
    flex: 1,
    marginLeft: 8,
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