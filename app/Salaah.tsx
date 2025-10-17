import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ImageBackground, View as RNView } from 'react-native';
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
import fonts from '../constants/Fonts';
import { useColorScheme } from '../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

interface SalaahProps {
  Name: string;
}

export default function SalaahScreen(City: SalaahProps) {
  const [salaahTimes, setSalaahTimes] = useState<SalaahTime[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(Utilities.getCurrentTime(new Date()));
  const { query } = useLocalSearchParams<{ query: string }>();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const results = await DataHandler.salaahQuery(db, query);
      setSalaahTimes(results);
    });
  }, [db]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Utilities.getCurrentTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] }}>
        {/* Top 1/3: Header with background and time */}
        <ImageBackground
          source={require('../assets/images/homeScreenHeader.png')}
          style={styles.headerBackground}
          resizeMode="stretch"
          blurRadius={1}
        >
          <RNView style={styles.headerContent}>
            {/* Top left: City name with location pin */}
            <View style={styles.cityContainer}>
              <Ionicons name="location-sharp" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.cityText}>{query ? capitalize(query) : 'City'}</Text>
            </View>
            {/* Center: Current time */}
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </RNView>
        </ImageBackground>
        {/* Bottom 2/3: Salaah times */}
        <View style={styles.bottomContainer}>
          <SalaahList salaahs={salaahTimes} city={query?.toLowerCase?.() ?? ''} />
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
    minHeight: 5
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: Platform.OS === 'ios' ? 50 : 20, // Adjust for status bar
    marginVertical: Platform.OS === 'ios' ? 40 : 20,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  cityContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  cityText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '600',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 2,
    padding: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -24,
    backgroundColor: Colors.light.background.light,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
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
});