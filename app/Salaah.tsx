import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ImageBackground, View as RNView, Pressable, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Text, View } from '../components/Themed';
import Suspense from '../components/Suspense';
import { SalaahTime } from '../types/dbTypes';
import { DataHandler } from '../services/DataHandler';
import { useLocalSearchParams } from 'expo-router';
import { Utilities } from '../util/Utilities';
import SalaahList from '../components/SalaahList';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import DateNavigator from '../components/DateNavigator';
import { ActionSheetIOS } from 'react-native';
import fonts from '../constants/Fonts';

interface SalaahProps {
  Name: string;
}

export default function SalaahScreen(City: SalaahProps) {
  const [salaahTimes, setSalaahTimes] = useState<SalaahTime[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(Utilities.getCurrentTime(new Date()));
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const { query } = useLocalSearchParams<{ query: string }>();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // city selector state
  const [cities, setCities] = useState<string[]>([]);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(query ?? undefined);

  // load city list from DB (avoid withTransactionAsync)
  useEffect(() => {
    if (!db) return;
    (async () => {
      try {
        const rows = await DataHandler.cityQuery(db);
        const list: string[] = Array.isArray(rows)
          ? rows
              .map((r: any) => (r.City ?? r.city ?? Object.values(r)[0]))
              .filter(Boolean)
              .map((c: any) => String(c))
          : [];
        setCities(list);
        // if no selectedCity, seed from query or first in list
        if (!selectedCity) {
          setSelectedCity(query ?? list[0]);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[Salaah] cityQuery error', err);
        setCities([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  useEffect(() => {
    if (!db) return;
    (async () => {
      try {
        const cityToUse = selectedCity ?? query ?? '';
        const results = await DataHandler.salaahQueryForDate(db, cityToUse, selectedDate);
        setSalaahTimes(Array.isArray(results) ? results : []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[Salaah] salaahQueryForDate error', err);
        setSalaahTimes([]);
      }
    })();
  }, [db, query, selectedDate, selectedCity]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Utilities.getCurrentTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // update currentPrayer whenever city/time changes (uses DataHandler.getCurrentPrayer)
  useEffect(() => {
    if (!db) return;
    (async () => {
      try {
        const cityToUse = (selectedCity ?? query ?? '').toString();
        const p = await DataHandler.getCurrentPrayer(db, cityToUse, new Date());
        setCurrentPrayer(p);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[Salaah] getCurrentPrayer error', err);
        setCurrentPrayer(null);
      }
    })();
    // run whenever db, selectedCity, query or currentTime (so it updates as time passes)
  }, [db, selectedCity, query, currentTime]);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] }}>
        {/* Top 1/3: Header with background and time */}
        <ImageBackground
          source={require('../assets/images/homeScreenHeader.png')}
          style={styles.headerBackground}
          resizeMode="stretch"
        >
          <RNView style={styles.headerContent}>
            {/* Top left: City selector styled like a dropdown */}
            <Pressable
              style={({ pressed }) => [styles.cityContainer, styles.cityDropdown, pressed && styles.cityPressed]}
              hitSlop={8}
              onPress={() => {
                if (!cities || cities.length === 0) return;
                if (Platform.OS === 'ios') {
                  const options = [...cities, 'Cancel'];
                  ActionSheetIOS.showActionSheetWithOptions(
                    { options, cancelButtonIndex: options.length - 1 },
                    (buttonIndex) => {
                      if (buttonIndex >= 0 && buttonIndex < cities.length) {
                        setSelectedCity(cities[buttonIndex]);
                      }
                    }
                  );
                } else {
                  setSelectorVisible(true);
                }
              }}
            >
              <RNView style={styles.cityLeft}>
                <Ionicons name="location-sharp" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.cityText} numberOfLines={1}>
                  {selectedCity ? capitalize(selectedCity) : (query ? capitalize(query) : 'City')}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </RNView>
            </Pressable>

            {/* Android modal selector */}
            <Modal visible={selectorVisible} transparent animationType="slide" onRequestClose={() => setSelectorVisible(false)}>
              <RNView style={styles.modalOverlay}>
                <RNView style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] }]}>
                  <FlatList
                    data={cities}
                    keyExtractor={(c) => c}
                    renderItem={({ item }) => (
                      <Pressable
                        style={({ pressed }) => [{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: pressed ? 'rgba(0,0,0,0.04)' : 'transparent' }]}
                        onPress={() => {
                          setSelectedCity(item);
                          setSelectorVisible(false);
                        }}
                      >
                        <Text style={{ color: Colors[colorScheme ?? 'light'].text.primary[colorScheme === 'dark' ? 'dark' : 'light'], fontSize: 16 }}>
                          {Utilities.toCapitalCase(item)}
                        </Text>
                      </Pressable>
                    )}
                    ItemSeparatorComponent={() => <RNView style={styles.separator} />}
                  />
                  <Pressable style={styles.modalCancel} onPress={() => setSelectorVisible(false)}>
                    <Text style={[styles.cancelText, { color: Colors[colorScheme ?? 'light'].text.secondary[colorScheme === 'dark' ? 'dark' : 'light'] }]}>Cancel</Text>
                  </Pressable>
                </RNView>
              </RNView>
            </Modal>

            {/* Center: Current prayer above current time */}
            <View style={styles.timeContainer}>
              {currentPrayer ? (
                <Text style={styles.currentPrayer}>{currentPrayer}</Text>
              ) : null}
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </RNView>
        </ImageBackground>
{/* Bottom 2/3: Date navigator (controls selectedDate) then Salaah times */}
<View
  style={[
    styles.bottomContainer,
    { backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] },
  ]}
>
  {/* DateNavigator inserted here — it returns the raw Date via onDateChange */}
  <DateNavigator
    initialDate={selectedDate}
    onDateChange={(d) => setSelectedDate(d)}
  />
  <SalaahList salaahs={salaahTimes} city={(selectedCity ?? query ?? '').toString().toLowerCase?.() ?? ''} />
</View>
      </View>
      <StatusBar style="light" />
    </React.Suspense>
  );
}

// Helper function to capitalize city name
function capitalize(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Utility function for 24hr time (if not already in Utilities)
if (!Utilities.getFormattedDate) {
  Utilities.getFormattedDate = (date: Date) =>
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: Platform.OS === 'ios' ? 50 : 20, // Adjust for status bar
    marginVertical: Platform.OS === 'ios' ? 40 : 20,
  },
  cityContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  cityDropdown: {
    // make the touchable compact so chevron stays next to text
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: 220,
  },
  cityPressed: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // allow text to truncate while keeping chevron next to it
    flexShrink: 1,
  },
  cityText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '600',
    marginRight: 6,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentPrayer: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#fff',
    marginBottom: 6,
    fontFamily: 'PlusJakartaSans-Regular',
    textTransform: 'capitalize',
  },
  time: {
    ...fonts.heading,
    fontSize: 32,
    letterSpacing: 2,
    color: '#fff',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 2,
    padding: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -32,
    backgroundColor: Colors.light.background.light,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    textAlign: 'center',
    padding: 10,
  },

  /* modal / selector styles */
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