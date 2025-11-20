import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import { useColorScheme } from '../hooks/useColorScheme';

type CalendarPickerProps = {
  value: Date;
  onChange: (d: Date) => void;
  onCancel?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  backgroundImage?: ImageSourcePropType; // new optional prop
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

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

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CalendarPicker({
  value,
  onChange,
  onCancel,
  minDate,
  maxDate,
  locale = undefined,
  backgroundImage,
}: CalendarPickerProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'dark';
  const themeColors = Colors[theme];
  const [displayDate, setDisplayDate] = useState<Date>(startOfMonth(value));
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  useEffect(() => {
    // Keep display month and selected date in sync when value changes externally
    setDisplayDate(startOfMonth(value));
    setSelectedDate(value);
  }, [value]);

  const monthLabel = displayDate.toLocaleString(locale ?? undefined, { month: 'long', year: 'numeric' });

  const weeks = useMemo(() => {
    const first = startOfMonth(displayDate);
    const last = endOfMonth(displayDate);
    const startWeekday = first.getDay(); // 0=Sun
    const totalDays = last.getDate();
    const days: (Date | null)[] = [];

    // Pad leading nulls
    for (let i = 0; i < startWeekday; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), d));

    // Pad trailing nulls to complete the last week
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
    setSelectedDate(d);
  };

  const handleConfirm = () => {
    onChange(selectedDate);
  };

  const handleCancel = () => {
    setSelectedDate(value); // Reset to original value
    onCancel?.();
  };

  // FIXED CALENDAR SIZE (keeps modal size stable regardless of month)
  const CALENDAR_HEIGHT = 420; // adjust if needed
  const HEADER_HEIGHT = 64;
  const WEEKDAYS_HEIGHT = 48;
  const FOOTER_HEIGHT = 76;
  const GRID_HEIGHT = CALENDAR_HEIGHT - HEADER_HEIGHT - WEEKDAYS_HEIGHT - FOOTER_HEIGHT;
  const ROWS = 6; // always render 6 rows to keep layout stable
  const ROW_HEIGHT = GRID_HEIGHT / ROWS;

  // Render exactly ROWS rows (fill with empty rows if month has fewer)
  const rowsToRender: (Date | null)[][] = Array.from({ length: ROWS }).map((_, i) => weeks[i] ?? Array(7).fill(null));

  // theme colors
  const primaryText = themeColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'];
  const secondaryText = themeColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'];
  const accent = themeColors.accent?.[theme === 'dark' ? 'dark' : 'light'];
  const cardBg = themeColors.cardBg?.[theme === 'dark' ? 'dark' : 'light'];
  const outline = themeColors.cardOutline?.[theme === 'dark' ? 'dark' : 'light'];
  const buttonBg = themeColors.complement?.[theme === 'dark' ? 'dark' : 'light'];

  const Content = (
    <>
      {/* Header */}
      <View style={[styles.header, { height: HEADER_HEIGHT - 8 }]}>
        <Pressable onPress={() => setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1))} style={styles.chev} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={primaryText} />
        </Pressable>

        <Text style={[fonts.heading, styles.monthLabel, { color: primaryText }]}>{monthLabel}</Text>

        <Pressable onPress={() => setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1))} style={styles.chev} hitSlop={8}>
          <Ionicons name="chevron-forward" size={20} color={primaryText} />
        </Pressable>
      </View>

      {/* Weekday labels */}
      <View style={[styles.weekdays, { height: WEEKDAYS_HEIGHT, borderTopColor: outline, borderBottomColor: outline }]}>
        {weekdayShort.map((w) => (
          <Text key={w} style={[fonts.textSmall, styles.weekday, { color: secondaryText }]}>{w}</Text>
        ))}
      </View>

      {/* Fixed grid (no ScrollView) - always 6 rows */}
      <View style={{ height: GRID_HEIGHT }}>
        {rowsToRender.map((week, rowIdx) => (
          <View key={rowIdx} style={[styles.weekRow, { height: ROW_HEIGHT }]}>
            {week.map((d, idx) => {
              const disabled = isDisabled(d || undefined);
              const selected = d ? sameDay(d, selectedDate) : false;
              const isToday = d ? sameDay(d, today) : false;
              const isCurrentMonth = d && d.getMonth() === displayDate.getMonth();

              return (
                <Pressable
                  key={idx}
                  onPress={() => onSelectDay(d)}
                  style={[
                    styles.day,
                    selected && { backgroundColor: accent, transform: [{ scale: 1.04 }] },
                    !selected && isToday && { borderWidth: 2, borderColor: accent, backgroundColor: 'transparent' },
                    !isCurrentMonth && { opacity: 0.35 },
                  ]}
                  disabled={!d || disabled}
                  accessibilityRole="button"
                  accessibilityLabel={d ? `Select ${d.toDateString()}` : undefined}
                >
                  <Text style={[
                    fonts.text,
                    styles.dayText,
                    {
                      color: selected ? (themeColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light']) : (isToday ? accent : (disabled ? secondaryText : primaryText)),
                      fontWeight: selected ? '700' : '500',
                    },
                  ]}>
                    {d ? d.getDate() : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {/* Action buttons (equal sizes) */}
      <View style={[styles.actions, { height: FOOTER_HEIGHT, borderTopColor: outline }]}>
        <Pressable
          onPress={handleCancel}
          android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: buttonBg },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[fonts.text, { color: secondaryText, fontWeight: '600' }]}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleConfirm}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: accent },
            pressed && styles.buttonPressedConfirm,
          ]}
        >
          <Text style={[fonts.text, { color: themeColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'], fontWeight: '700' }]}>OK</Text>
        </Pressable>
      </View>
    </>
  );

  // If a background image is provided, render inside ImageBackground to use it.
  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={[styles.container, { height: CALENDAR_HEIGHT }]}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        <View style={[styles.bgInner, { backgroundColor: 'transparent' }]}>
          {Content}
        </View>
      </ImageBackground>
    );
  }

  return <View style={[styles.container, { height: CALENDAR_HEIGHT, backgroundColor: cardBg }]}>{Content}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bgInner: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  chev: {
    padding: 8,
    borderRadius: 8,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  weekdays: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  weekday: {
    width: 36,
    textAlign: 'center',
    paddingVertical: 8,
    fontWeight: '500',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  day: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Press feedback */
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  buttonPressedConfirm: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
});