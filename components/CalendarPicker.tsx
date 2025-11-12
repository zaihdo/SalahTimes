import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import { useColorScheme } from '../hooks/useColorScheme';
import Icon from './Icon';

type CalendarPickerProps = {
  value: Date;
  onChange: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export default function CalendarPicker({ value, onChange, minDate, maxDate, locale = undefined }: CalendarPickerProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const colors = (Colors as any)[theme] ?? {};
  const [displayDate, setDisplayDate] = useState<Date>(startOfMonth(value));
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  useEffect(() => {
    // keep display month in sync when value changes externally
    setDisplayDate(startOfMonth(value));
  }, [value]);

  const monthLabel = displayDate.toLocaleString(locale ?? undefined, { month: 'long', year: 'numeric' });

  const weeks = useMemo(() => {
    const first = startOfMonth(displayDate);
    const last = endOfMonth(displayDate);
    const startWeekday = first.getDay(); // 0=Sun
    const totalDays = last.getDate();
    const days: (Date | null)[] = [];

    // pad leading nulls
    for (let i = 0; i < startWeekday; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), d));

    // pad trailing nulls to complete the last week
    while (days.length % 7 !== 0) days.push(null);

    const rows: (Date | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  }, [displayDate]);

  const isDisabled = (d?: Date) => {
    if (!d) return true;
    if (minDate && d < startOfDay(minDate)) return true;
    if (maxDate && d > endOfDay(maxDate)) return true;
    return false;
  };

  function startOfDay(d: Date) {
    const n = new Date(d);
    n.setHours(0, 0, 0, 0);
    return n;
  }
  function endOfDay(d: Date) {
    const n = new Date(d);
    n.setHours(23, 59, 59, 999);
    return n;
  }

  const weekdayShort = useMemo(() => {
    // Sun..Sat
    const base = new Date(2020, 7, 2); // Sunday
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dt = new Date(base);
      dt.setDate(base.getDate() + i);
      names.push(dt.toLocaleDateString(locale ?? undefined, { weekday: 'short' }));
    }
    return names;
  }, [locale]);

  const onSelectDay = (d: Date | null) => {
    if (!d) return;
    if (isDisabled(d)) return;
    onChange(d);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card?.[theme === 'dark' ? 'dark' : 'light'] ?? colors.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={styles.header}>
        <Pressable onPress={() => setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1))} style={styles.chev}>
          <Ionicons name="chevron-back" size={20} color={colors.text?.primary?.[theme === 'dark' ? 'dark' : 'light']} />
        </Pressable>

        <Text style={[fonts.heading, styles.monthLabel, { color: colors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>{monthLabel}</Text>

        <Pressable onPress={() => setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1))} style={styles.chev}>
          <Ionicons name="chevron-forward" size={20} color={colors.text?.primary?.[theme === 'dark' ? 'dark' : 'light']} />
        </Pressable>
      </View>

      <View style={styles.weekdays}>
        {weekdayShort.map((w) => (
          <Text key={w} style={[fonts.textSmall, styles.weekday, { color: colors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] }]}>{w}</Text>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 8 }}>
        {weeks.map((week, i) => (
          <View key={i} style={styles.weekRow}>
            {week.map((d, idx) => {
              const disabled = isDisabled(d || undefined);
              const selected = d ? sameDay(d, value) : false;
              const isToday = d ? sameDay(d, today) : false;
              const dayColor = disabled ? colors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] : colors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'];
              return (
                <Pressable
                  key={idx}
                  onPress={() => onSelectDay(d)}
                  style={[
                    styles.day,
                    selected ? { backgroundColor: colors.accent ?? '#FFC801' } : undefined,
                  ]}
                  disabled={!d || disabled}
                >
                  <Text style={[
                    fonts.text,
                    styles.dayText,
                    {
                      color: selected ? (colors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] ?? '#fff') : (isToday ? (colors.accent ?? '#FFC801') : dayColor),
                    },
                  ]}>
                    {d ? d.getDate() : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  chev: {
    padding: 6,
  },
  monthLabel: {
    fontSize: 16,
  },
  weekdays: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  weekday: {
    width: 36,
    textAlign: 'center',
    paddingVertical: 6,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  day: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
  },
});