import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ImageBackground, View as RNView, Pressable, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, View } from '../components/Themed';
import Suspense from '../components/Suspense';
import { IqamahTime } from '../types/dbTypes';
import { DataHandler } from '../services/DataHandler';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Utilities } from '../util/Utilities';
import IqamahList from '../components/IqamahList';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import fonts from '../constants/Fonts'; // added import
import { resolveMasjidImage } from '../constants/MasjidImages'; // added imports
import { Ionicons } from '@expo/vector-icons';

interface IqamahProps {
  Name: string;
}

export default function IqamahScreen(Masjid: IqamahProps) {
  const [IqamahTimes, setIqamahTimes] = useState<IqamahTime[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(Utilities.getCurrentTime(new Date()));
  const [imageLoaded, setImageLoaded] = useState(false);
  const { query, img } = useLocalSearchParams<{ query: string; img?: string }>();
  const router = useRouter();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // resolve header image from passed img key; fallback to default header
  const headerImage = resolveMasjidImage(img as string) ?? require('../assets/images/homeScreenHeader.png');

  // Fade in the image when loaded
  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const results = await DataHandler.iqamahQuery(db, query);
      setIqamahTimes(results);
    }).catch((err) => {
      if (__DEV__) {
        console.error('[Iqamah] withTransactionAsync error', err);
      }
    });
  }, [db, query]);

  // Update current time every second (styling parity with Salaah)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Utilities.getCurrentTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].primary[colorScheme === 'dark' ? 'dark' : 'light'] }}>
        <ImageBackground
          source={headerImage}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <RNView style={styles.headerContent}>
            <Pressable
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
              onPress={() => router.back()}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </Pressable>
            <RNView style={styles.timeContainer}>
              <Text style={styles.time}>{currentTime}</Text>
              <Text style={styles.smallDate}>{Utilities.getFormattedDate(new Date())}</Text>
            </RNView>
          </RNView>
        </ImageBackground>

        <View
          style={[
            styles.bottomContainer,
            { backgroundColor: Colors[colorScheme ?? 'light'].primary[colorScheme === 'dark' ? 'dark' : 'light'] },
          ]}
        >
          <Text
            style={[
              fonts.headingLarge,
              { color: Colors[colorScheme ?? 'light'].text.primary[colorScheme === 'dark' ? 'dark' : 'light'], marginHorizontal: 16},
            ]}
          >
            {Utilities.toCapitalCase(String(query ?? ''))}
          </Text>
          <IqamahList iqamahs={IqamahTimes} masjid={query?.toLowerCase?.()} />
        </View>
      </View>
      <StatusBar style="light" />
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 48 : 24,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 28,
    left: 14,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  backButtonPressed: {
    backgroundColor: 'rgba(0,0,0,0.36)',
  },
  cityContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 20,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // use font definitions from Fonts.ts (safe fallback to empty object)
  cityText: {
    ...(fonts.heading ?? {}),
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // apply heading styles from Fonts.ts
  time: {
    ...(fonts.headingXLarge ?? {}),
    color: '#fff',
    textAlign: 'center',
  },
  smallDate: {
    ...(fonts.textMedium ?? {}),
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  bottomContainer: {
    flex: 2,
    padding: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -24, // overlap the header (same technique as Salaah.tsx)
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
});