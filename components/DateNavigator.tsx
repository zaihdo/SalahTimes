import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Utilities } from '../util/Utilities';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function DateNavigator({
  initialDate,
  onDateChange,
}: {
  initialDate?: Date;
  onDateChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date>(initialDate ?? new Date());
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = (Colors as any)[theme] ?? {};
  const textColor = themeColors.text?.primary ?? (theme === 'dark' ? '#fff' : '#102540');
  const subTextColor = themeColors.text?.secondary ?? (theme === 'dark' ? 'rgba(255,255,255,0.9)' : '#666');

  useEffect(() => {
    onDateChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDay = (delta: number) => {
    setDate((prev) => {
      const next = new Date(prev.getTime());
      next.setDate(next.getDate() + delta);
      onDateChange(next);
      return next;
    });
  };

  const gregorian = Utilities?.getFormattedDate
    ? Utilities.getFormattedDate(date)
    : date.toLocaleDateString();

  // Hijri (Islamic) date via Intl if available, fallback to empty string
  let hijri = '';
  try {
    hijri = new Intl.DateTimeFormat('en-GB-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  } catch {
    try {
      hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    } catch {
      hijri = '';
    }
  }

  return (
    <View style={styles.row}>
      <Pressable onPress={() => changeDay(-1)} style={styles.arrow} hitSlop={8}>
        <Ionicons name="chevron-back" size={22} color={textColor} />
      </Pressable>

      <View style={styles.center}>
        <Text style={[styles.gregorianText, { color: textColor }]}>{gregorian}</Text>
        {hijri !== '' && <Text style={[styles.hijriText, { color: subTextColor }]}>{hijri}</Text>}
      </View>

      <Pressable onPress={() => changeDay(1)} style={styles.arrow} hitSlop={8}>
        <Ionicons name="chevron-forward" size={22} color={textColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  arrow: {
    padding: 8,
  },
  center: {
    alignItems: 'center',
  },
  gregorianText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '700',
  },
  hijriText: {
    fontSize: 13,
    marginTop: 4,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '400',
  },
});