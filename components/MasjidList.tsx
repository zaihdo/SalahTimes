import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Link } from 'expo-router';
import { Text } from './Themed';
import { DataHandler } from '../services/DataHandler';
import { Utilities } from '../util/Utilities';
import fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import Suspense from './Suspense';

const { width } = Dimensions.get('window');
const DEFAULT_COLUMNS = 2;
const TILE_ASPECT = 165 / 227; // width / height

type MasjidItem = { Masjid?: string } | string;

interface Props {
  columns?: number;
  contentStyle?: any;
}

function normalizeNameForLookup(name?: string) {
  if (!name) return '';
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function MasjidList({ columns = DEFAULT_COLUMNS, contentStyle }: Props) {
  const [masjids, setMasjids] = useState<MasjidItem[] | null>(null);
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const tileSpacing = 12;
  const horizontalPadding = 20;
  const tileWidth = (width - horizontalPadding * 2 - tileSpacing * (columns - 1)) / columns;
  const tileHeight = Math.round(tileWidth / TILE_ASPECT);

  // raw image files mapped to the original file labels
  const rawImages: Record<string, any> = useMemo(
    () => ({
      'Francistown Masjid': require('../assets/images/Francistown Masjid.jpg'),
      'Jamia Masjid Gaborone': require('../assets/images/Jamia Masjid Gaborone.jpg'),
      'Kanye Masjid': require('../assets/images/Kanye Masjid.jpg'),
      'Lethlakane Masjid': require('../assets/images/Lethlakane Masjid.jpg'),
      'Lobatse Masjid': require('../assets/images/Lobatse Masjid.jpg'),
      'Mahalapye Masjid': require('../assets/images/Mahalapye Masjid.jpg'),
      'Masjid Dun Noor Gwest': require('../assets/images/Masjid Dun Noor Gwest.jpg'),
      'Masjid Ut Taqwa Block 6': require('../assets/images/Masjid Ut Taqwa Block 6.jpg'),
      'Maun Masjid': require('../assets/images/Maun Masjid.jpg'),
      'Mochudi Masjid': require('../assets/images/Mochudi Masjid.jpg'),
      'Palapye Masjid': require('../assets/images/Palapye Masjid.jpg'),
      'Rasesa Masjid': require('../assets/images/Rasesa Masjid.jpg'),
      'Selebi Phikwe Masjid': require('../assets/images/Selebi Phikwe Masjid.jpg'),
      'Selebi Phikwe Masjid2': require('../assets/images/Selebi Phikwe Masjid2.jpg'),
      'Serowe Masjid': require('../assets/images/Serowe Masjid.jpg'),
      onboardingBg: require('../assets/images/onboardingBg.png'),
    }),
    []
  );

  // build normalized map (normalized key -> image) with onboardingBg available as 'onboardingbg'
  const resolvedImageMap = useMemo(() => {
    const m: Record<string, any> = {};
    Object.keys(rawImages).forEach((label) => {
      const key = normalizeNameForLookup(label);
      m[key] = rawImages[label];
    });
    return m;
  }, [rawImages]);

  useEffect(() => {
    if (!db) return;
    let mounted = true;
    (async () => {
      try {
        const rows = await DataHandler.masjidQuery(db);
        if (mounted) setMasjids(Array.isArray(rows) ? rows : []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[MasjidList] masjidQuery error', err);
        if (mounted) setMasjids([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [db]);

  function findImageForName(name?: string) {
    if (!name) return resolvedImageMap['onboardingbg'];
    const key = normalizeNameForLookup(name);
    // exact normalized match only, otherwise return default onboarding bg
    return resolvedImageMap[key] ?? resolvedImageMap['onboardingbg'];
  }

  const renderTile = ({ item }: { item: MasjidItem }) => {
    const raw = typeof item === 'string' ? item : item?.Masjid ?? String(item);
    const displayName = Utilities.toCapitalCase(String(raw));
    const image = findImageForName(raw);

    return (
      <View style={[{ width: tileWidth, marginRight: tileSpacing, marginBottom: tileSpacing}]}>
        <Link href={{ pathname: '/Iqamah', params: { query: String(raw) } }} asChild>
          <Pressable
            style={{ width: tileWidth, height: tileHeight, borderRadius: 16, overflow: 'hidden', flex: 0, justifyContent: 'flex-start' }}
            accessibilityLabel={`Open ${displayName}`}
          >
            <ImageBackground source={image} imageStyle={styles.imageStyle} resizeMode="cover">
              <View style={styles.overlay}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={[fonts.text, styles.nameText, { color: '#fff'}]}>
                  {displayName}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        </Link>
      </View>
    );
  };

  if (masjids === null) {
    return (
      <View style={[styles.container, { backgroundColor: Colors[theme].background[theme === 'dark' ? 'dark' : 'light'] }]}>
        <ActivityIndicator style={{ marginTop: 32 }} />
      </View>
    );
  }

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={[styles.container, contentStyle, { backgroundColor: Colors[theme].background[theme === 'dark' ? 'dark' : 'light'] }]}>
        <View style={styles.header}>
          <Text style={[fonts.headingLarge, styles.title, { color: Colors[theme].text[theme === 'dark' ? 'dark' : 'light'] }]}>Mosques</Text>
        </View>

        <FlatList
          data={masjids}
          keyExtractor={(item, idx) => {
            const raw = typeof item === 'string' ? item : item?.Masjid ?? String(item);
            return String(raw) + '_' + idx;
          }}
          renderItem={renderTile}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingBottom: 28 }]}
          columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[fonts.text, { color: Colors[theme].text[theme === 'dark' ? 'dark' : 'light'] }]}>No mosques found.</Text>
            </View>
          }
        />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    
  },
  header: {
    marginBottom: 16,
    marginTop: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  listContent: {
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: width * TILE_ASPECT,
    borderRadius: 16,
  },
  overlay: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  nameText: {
    fontSize: 16,
    textTransform: 'capitalize',
    lineHeight: 20,
  },
  empty: {
    padding: 28,
    alignItems: 'center',
  },
});