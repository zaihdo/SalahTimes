import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { Text } from '../../components/Themed';
import { useColorScheme } from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import CalendarPicker from '../../components/CalendarPicker';

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = (Colors as any)[theme] ?? {};
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prayerTimes = useMemo(() => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const mk = (h: number, m = 0) => `${pad(h)}:${pad(m)}`;
    return [
      { id: 'fajr', label: 'Fajr', time: mk(5, 0) },
      { id: 'sunrise', label: 'Sunrise', time: mk(6, 30) },
      { id: 'dhuhr', label: 'Dhuhr', time: mk(12, 15) },
      { id: 'asr', label: 'Asr', time: mk(15, 45) },
      { id: 'maghrib', label: 'Maghrib', time: mk(18, 0) },
      { id: 'isha', label: 'Isha', time: mk(19, 30) },
    ];
  }, [selectedDate]); // recalc when selectedDate changes

  const bg = themeColors.primary?.[theme === 'dark' ? 'dark' : 'light'] ?? '#fff';
  const cardBg = themeColors.card?.[theme === 'dark' ? 'dark' : 'light'] ?? bg;
  const textPrimary = themeColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] ?? '#111';
  const outline = themeColors.cardOutline?.[theme === 'dark' ? 'dark' : 'light'] ?? 'rgba(0,0,0,0.06)';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>

      <View style={[styles.half, { backgroundColor: cardBg }]}>
        <CalendarPicker
          value={selectedDate}
          onChange={(d) => setSelectedDate(d)}
          onCancel={() => {}}
        />
      </View>

      <View style={[styles.half, styles.bottom, { backgroundColor: bg }]}>
        <View style={styles.timesHeader}>
          <Text style={[fonts.heading ?? {}, styles.dateText, { color: textPrimary }]}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </View>

        <FlatList
          data={prayerTimes}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.timesList}
          renderItem={({ item }) => (
            <View style={[styles.timeRow, { borderColor: outline }]}>
              <Text style={[fonts.text ?? {}, styles.timeLabel, { color: textPrimary }]}>{item.label}</Text>
              <Text style={[fonts.heading ?? {}, styles.timeValue, { color: textPrimary }]}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  half: {
    flex: 1,
    padding: 12,
  },
  bottom: {
    paddingTop: 8,
  },
  timesHeader: {
    paddingVertical: 8,
  },
  timesList: {
    paddingTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  timeValue: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '600',
  },
});