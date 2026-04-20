import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Pressable, Alert, Animated } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSQLiteContext } from 'expo-sqlite';
import { DataHandler } from '../../services/DataHandler';

// Height of each option item in the dropdown (must match actual rendered height)
const OPTION_ITEM_HEIGHT = 60;

export default function Settings() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const db = useSQLiteContext();

  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedMadhab, setSelectedMadhab] = useState<string>('');
  const [hijriDayOffset, setHijriDayOffset] = useState<number>(0);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showMadhabSelector, setShowMadhabSelector] = useState(false);

  const cityAnimatedHeight = useRef(new Animated.Value(0)).current;
  const madhabAnimatedHeight = useRef(new Animated.Value(0)).current;

  const madhabs = [
    { id: 1, name: 'AsrHanafee', display: 'Hanafee' },
    { id: 2, name: 'AsrShafiee', display: 'Shafiee' },
  ];

  const currentColors = Colors[theme];

  const resolveColor = (val: any, fallback: string) =>
    typeof val === 'string'
      ? val
      : val?.[theme === 'dark' ? 'dark' : 'light'] ?? fallback;

  useEffect(() => {
    loadSettings();
    loadCities();
  }, []);

  useEffect(() => {
    Animated.timing(cityAnimatedHeight, {
      toValue: showCitySelector ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showCitySelector]);

  useEffect(() => {
    Animated.timing(madhabAnimatedHeight, {
      toValue: showMadhabSelector ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showMadhabSelector]);

  const loadSettings = async () => {
    try {
      const city = await AsyncStorage.getItem('@selectedCity');
      const madhab = await AsyncStorage.getItem('@selectedMadhab');
      const hijriOffset = await AsyncStorage.getItem('@hijriDayOffset');
      
      if (city) {
        const parsedCity = JSON.parse(city);
        setSelectedCity(parsedCity);
      }
      if (madhab) {
        setSelectedMadhab(madhab);
      }
      if (hijriOffset != null) {
        const parsed = parseInt(hijriOffset, 10);
        if (!Number.isNaN(parsed)) {
          setHijriDayOffset(Math.max(-2, Math.min(2, parsed)));
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to load settings:', error);
      }
    }
  };

  const loadCities = async () => {
    try {
      const cityNames = await DataHandler.cityQuery(db);
      const capitalizedCities = cityNames.map((city: any) => ({
        ...city,
        City: DataHandler.capitalize(city.City),
      }));
      setCities(capitalizedCities);
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to load cities:', error);
      }
    }
  };

  const handleCityChange = async (city: string) => {
    try {
      const normalizedCity = DataHandler.toUpperCase(city);
      await AsyncStorage.setItem('@selectedCity', JSON.stringify(normalizedCity));
      setSelectedCity(normalizedCity);
      setShowCitySelector(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update city');
    }
  };

  const handleMadhabChange = async (madhab: string) => {
    try {
      await AsyncStorage.setItem('@selectedMadhab', madhab);
      setSelectedMadhab(madhab);
      setShowMadhabSelector(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update madhab');
    }
  };

  const handleHijriOffsetChange = async (offset: number) => {
    const clamped = Math.max(-2, Math.min(2, offset));
    try {
      await AsyncStorage.setItem('@hijriDayOffset', String(clamped));
      setHijriDayOffset(clamped);
    } catch (error) {
      Alert.alert('Error', 'Failed to update Hijri date adjustment');
    }
  };

  const getDisplayCity = () => {
    if (!selectedCity) return 'Not set';
    return DataHandler.capitalize(selectedCity);
  };

  const getDisplayMadhab = () => {
    if (!selectedMadhab) return 'Not set';
    const madhab = madhabs.find(m => m.name === selectedMadhab);
    return madhab ? madhab.display : selectedMadhab.replace('Asr', '');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentColors.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={styles.section}>
        <Text style={[fonts.textLargeBold, styles.sectionTitle, { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
          Prayer Settings
        </Text>

        {/* City Selection */}
        <View style={styles.settingCard}>
          <Pressable 
            onPress={() => setShowCitySelector(!showCitySelector)}
            style={({ pressed }) => [
              styles.settingHeader,
              {
                backgroundColor: pressed 
                  ? resolveColor(currentColors.complement, '#f5f5f5') 
                  : 'transparent',
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text style={[fonts.text, { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
                City
              </Text>
              <Text style={[fonts.textSmall, { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginTop: 4 }]}>
                {getDisplayCity()}
              </Text>
            </View>
            <Ionicons 
              name={showCitySelector ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light']} 
            />
          </Pressable>

          <Animated.View
            style={[
              styles.optionsListContainer,
              {
                maxHeight: cityAnimatedHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, cities.length * OPTION_ITEM_HEIGHT],
                }),
                opacity: cityAnimatedHeight,
              },
            ]}
          >
            <View style={styles.optionsList}>
              {cities.map((city, index) => {
                const isSelected = DataHandler.toUpperCase(city.City) === selectedCity;
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleCityChange(city.City)}
                    style={({ pressed }) => [
                      styles.optionItem,
                      {
                        backgroundColor: pressed 
                          ? resolveColor(currentColors.complement, '#f5f5f5') 
                          : 'transparent',
                        borderLeftWidth: 3,
                        borderLeftColor: isSelected 
                          ? resolveColor(currentColors.accent, '#ffc801')
                          : 'transparent',
                      },
                    ]}
                  >
                    <Ionicons
                      name="location-sharp"
                      size={20}
                      color={currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light']}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={[
                        fonts.text,
                        {
                          flex: 1,
                          color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'],
                          fontWeight: isSelected ? '600' : '400',
                        },
                      ]}
                    >
                      {city.City}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={resolveColor(currentColors.state?.success, 'green')}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        </View>

        {/* Madhab Selection */}
        <View style={styles.settingCard}>
          <Pressable 
            onPress={() => setShowMadhabSelector(!showMadhabSelector)}
            style={({ pressed }) => [
              styles.settingHeader,
              {
                backgroundColor: pressed 
                  ? resolveColor(currentColors.complement, '#f5f5f5') 
                  : 'transparent',
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Text style={[fonts.text, { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
                Madhab (Asr Calculation)
              </Text>
              <Text style={[fonts.textSmall, { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginTop: 4 }]}>
                {getDisplayMadhab()}
              </Text>
            </View>
            <Ionicons 
              name={showMadhabSelector ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light']} 
            />
          </Pressable>

          <Animated.View
            style={[
              styles.optionsListContainer,
              {
                maxHeight: madhabAnimatedHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, madhabs.length * OPTION_ITEM_HEIGHT],
                }),
                opacity: madhabAnimatedHeight,
              },
            ]}
          >
            <View style={styles.optionsList}>
              {madhabs.map((madhab, index) => {
                const isSelected = selectedMadhab === madhab.name;
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleMadhabChange(madhab.name)}
                    style={({ pressed }) => [
                      styles.optionItem,
                      {
                        backgroundColor: pressed 
                          ? resolveColor(currentColors.complement, '#f5f5f5') 
                          : 'transparent',
                        borderLeftWidth: 3,
                        borderLeftColor: isSelected 
                          ? resolveColor(currentColors.accent, '#ffc801')
                          : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.text,
                        {
                          flex: 1,
                          color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'],
                          fontWeight: isSelected ? '600' : '400',
                        },
                      ]}
                    >
                      {madhab.display}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={resolveColor(currentColors.state?.success, 'green')}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        </View>

        {/* Hijri Date Adjustment */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={styles.settingInfo}>
              <Text style={[fonts.text, { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
                Hijri Date Adjustment
              </Text>
              <Text style={[fonts.textSmall, { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginTop: 4 }]}> 
                Shift Hijri date for local moon sighting ({hijriDayOffset > 0 ? `+${hijriDayOffset}` : hijriDayOffset} day)
              </Text>
            </View>
          </View>

          <View style={styles.hijriOffsetRow}>
            <Pressable
              onPress={() => handleHijriOffsetChange(hijriDayOffset - 1)}
              style={({ pressed }) => [
                styles.offsetButton,
                {
                  backgroundColor: pressed
                    ? resolveColor(currentColors.complement, '#f5f5f5')
                    : 'transparent',
                  opacity: hijriDayOffset <= -2 ? 0.4 : 1,
                },
              ]}
              disabled={hijriDayOffset <= -2}
            >
              <Ionicons name="remove" size={20} color={currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light']} />
            </Pressable>

            <Text style={[fonts.textLargeBold, { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
              {hijriDayOffset > 0 ? `+${hijriDayOffset}` : hijriDayOffset}
            </Text>

            <Pressable
              onPress={() => handleHijriOffsetChange(hijriDayOffset + 1)}
              style={({ pressed }) => [
                styles.offsetButton,
                {
                  backgroundColor: pressed
                    ? resolveColor(currentColors.complement, '#f5f5f5')
                    : 'transparent',
                  opacity: hijriDayOffset >= 2 ? 0.4 : 1,
                },
              ]}
              disabled={hijriDayOffset >= 2}
            >
              <Ionicons name="add" size={20} color={currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light']} />
            </Pressable>

            <Pressable
              onPress={() => handleHijriOffsetChange(0)}
              style={({ pressed }) => [
                styles.resetOffsetButton,
                {
                  backgroundColor: pressed
                    ? resolveColor(currentColors.complement, '#f5f5f5')
                    : 'transparent',
                },
              ]}
            >
              <Text style={[fonts.textSmall, { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] }]}>Reset</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flex: 1,
  },
  optionsListContainer: {
    overflow: 'hidden',
  },
  optionsList: {
    paddingBottom: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  hijriOffsetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  offsetButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetOffsetButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});