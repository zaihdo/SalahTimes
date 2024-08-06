import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Utilities } from '@/util/Utilities';

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

return (
  <React.Suspense fallback={<Suspense />}>
    <View style={styles.container}>
      <FlatList
        style={[{backgroundColor: Colors[colorScheme ?? 'light'].secondary}, styles.flatListContainer]}
        data={masjids}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/Iqamah',
              params: { query: item.Masjid }
            }}
            asChild
            style={styles.masjidContainer}
          >
            <Pressable >
              {({ pressed }) => (
                <>
                <Text
                  style={[{color: Colors[colorScheme ?? 'light'].tint},
                    styles.masjidText,
                  ]}
                >
                  🕌 {Utilities.toCapitalCase(item.Masjid)}
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
    padding: 8,
    paddingHorizontal: 16
  },
  masjidText: {
    fontSize: 16,
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