import React, { useState } from 'react';
import {
  Platform,
  ActionSheetIOS,
  Modal,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { Utilities } from '../util/Utilities';

export default function CitySelector({
  currentCity,
  cities = [],
  onCityChange,
}: {
  currentCity?: string;
  cities?: string[];
  onCityChange: (city: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = (Colors as any)[theme] ?? {};

  const open = () => {
    if (Platform.OS === 'ios') {
      const options = [...cities, 'Cancel'];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
        },
        (buttonIndex) => {
          if (buttonIndex >= 0 && buttonIndex < cities.length) {
            onCityChange(cities[buttonIndex]);
          }
        }
      );
    } else {
      setVisible(true);
    }
  };

  const renderAndroidItem = ({ item }: { item: string }) => (
    <Pressable
      style={({ pressed }) => [
        styles.androidItem,
        { backgroundColor: pressed ? themeColors.card?.light ?? '#eee' : 'transparent' },
      ]}
      onPress={() => {
        onCityChange(item);
        setVisible(false);
      }}
    >
      <Text style={[styles.androidItemText, { color: themeColors.text?.primary ?? '#102540' }]}>
        {Utilities.toCapitalCase?.(item) ?? item}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Pressable onPress={open} style={styles.pressable}>
        <Text style={[styles.cityText, { color: themeColors.text?.primary ?? '#fff' }]}>
          {Utilities.toCapitalCase?.(currentCity) ?? 'City'}
        </Text>
      </Pressable>

      {Platform.OS === 'android' && (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: themeColors.card?.light ?? '#fff' }]}>
              <FlatList
                data={cities}
                keyExtractor={(c) => c}
                renderItem={renderAndroidItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
              <Pressable style={styles.modalCancel} onPress={() => setVisible(false)}>
                <Text style={[styles.cancelText, { color: themeColors.text?.secondary ?? '#666' }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalContent: {
    maxHeight: '60%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 8,
  },
  androidItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  androidItemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  modalCancel: {
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
  },
});