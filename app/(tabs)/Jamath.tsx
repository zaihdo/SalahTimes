import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { ScrollView, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      padding: 20
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
    borderColor: '#efefef',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: 'transparent',
  },
  flatListContainer: {
    borderRadius: 15,
    borderStyle: 'solid',
    backgroundColor: Colors[colorScheme ?? 'light'].secondary,
    padding: 8,
    paddingHorizontal: 16
  },
  masjidText: {
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'capitalize',
    color: Colors[colorScheme ?? 'light'].tint
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

return (
  <React.Suspense fallback={<Suspense />}>
    <View style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
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
                size={10}
                color={Colors[colorScheme ?? 'light'].tint}
                style={{ textAlign: 'right', marginRight: 15, opacity: pressed ? 0.1 : 1 }}
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