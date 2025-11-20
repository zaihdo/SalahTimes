import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import CalendarPicker from './CalendarPicker';
import CalendarSvg from '../assets/icons/calendar.svg';

type Props = {
  initialDate?: Date;
  onDateChange: (date: Date) => void;
};

export default function CalendarIconPicker({ initialDate, onDateChange }: Props) {
  const [date, setDate] = useState<Date>(initialDate ?? new Date());
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'dark';
  const themeColors = (Colors as any)[theme] ?? {};
  const iconColor =
    (Colors as any)[colorScheme ?? 'light']?.text?.primary?.[colorScheme === 'dark' ? 'light' : 'light'] ;

  useEffect(() => {
    onDateChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={({ pressed }) => [styles.iconWrap, pressed && styles.pressed]}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Open calendar"
      >
        <CalendarSvg width={20} height={20} fill={Colors.dark.icon.switchOn.light} />
      </Pressable>

      <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowPicker(false)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.modalContent,
              { backgroundColor: themeColors.card?.[theme === 'dark' ? 'dark' : 'light'] ?? '#fff' },
            ]}
          >
            <CalendarPicker
              value={date}
              onChange={(d) => {
                setDate(d);
                setShowPicker(false);
              }}
              onCancel={() => setShowPicker(false)}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    padding: 8,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.8,
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
});