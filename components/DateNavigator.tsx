import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Utilities } from '../util/Utilities';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import CalendarPicker from './CalendarPicker';

export default function DateNavigator({
  initialDate,
  onDateChange,
}: {
  initialDate?: Date;
  onDateChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date>(initialDate ?? new Date());
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'dark';
  const themeColors = (Colors as any)[theme] ?? {};
  const textColor =
    Colors[colorScheme ?? 'light'].text.primary[
      colorScheme === 'dark' ? 'dark' : 'light'
    ];
  const subTextColor =
    Colors[colorScheme ?? 'light'].text.secondary[
      colorScheme === 'dark' ? 'dark' : 'light'
    ];

  // notify parent whenever date changes
  useEffect(() => {
    onDateChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const changeDay = (delta: number) => {
    setDate((prev) => {
      const next = new Date(prev.getTime());
      next.setDate(next.getDate() + delta);
      return next;
    });
  };



  const gregorian = Utilities?.getFormattedDate
    ? Utilities.getFormattedDate(date)
    : date.toLocaleDateString();

  // Hijri (Islamic) date via Intl if available, fallback to empty string
  let hijri = '';
  try {
    hijri = new Intl.DateTimeFormat('en-GB-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    try {
      hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      hijri = '';
    }
  }

  return (
    <>
      <View style={styles.row}>
        <Pressable onPress={() => changeDay(-1)} style={styles.arrow} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={textColor} />
        </Pressable>

        <Pressable onPress={() => setShowPicker(true)} style={styles.center}>
          <Text style={[styles.gregorianText, { color: textColor }]}>{gregorian}</Text>
          {hijri !== '' && <Text style={[styles.hijriText, { color: subTextColor }]}>{hijri}</Text>}
        </Pressable>

        <Pressable onPress={() => changeDay(1)} style={styles.arrow} hitSlop={8}>
          <Ionicons name="chevron-forward" size={22} color={textColor} />
        </Pressable>
      </View>

      <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowPicker(false)}>
          <TouchableOpacity activeOpacity={1} style={[styles.modalContent, { backgroundColor: themeColors.card?.[theme === 'dark' ? 'dark' : 'light'] ?? '#fff' }]}>
            {/* custom calendar */}
            <CalendarPicker
              value={date}
              onChange={(d) => {
                setDate(d);
                setShowPicker(false);
              }}
              minDate={undefined}
              maxDate={undefined}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalButton: {
    padding: 8,
  },
  modalButtonText: {
    fontSize: 16,
  },
});