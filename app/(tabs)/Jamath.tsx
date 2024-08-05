import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MasjidScreen() {
  const [masjids, setMasjids] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const masjidNames = await DataHandler.masjidQuery(db);
      setMasjids(masjidNames);
    });
  }, [db]);

  const toCapitalCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(/[\s-]+/) // Split by any whitespace or hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={styles.container}>
        <FlatList
          data={masjids}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/modal',
                params: { query: item.Masjid }
              }}
              asChild
              style={styles.masjidContainer}
            >
              <Pressable >
                {({ pressed }) => (
                  <>
                  <Text
                    style={[
                      styles.masjidText,
                    ]}
                  >
                    🕌 {toCapitalCase(item.Masjid)}
                  </Text>
                  {/* <FontAwesome
                  name="chevron-right"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].tint}
                  style={{ right: 0, marginRight: 15, opacity: pressed ? 0.1 : 1 }}
                  /> */}
                  </>
                )}
              </Pressable>
            </Link>
          )}
        />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  masjidContainer: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    padding: 15,
    backgroundColor: 'transparent',
  },
  masjidText: {
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
