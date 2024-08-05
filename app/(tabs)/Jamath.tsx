import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime, Masjid } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from '@/components/useColorScheme';



export default function MasjidScreen() {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);
  const [masjids, setMasjids] = useState<any[]>([]);
  const colorScheme = useColorScheme();

  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const masjidNames = await DataHandler.masjidQuery(db);
      setMasjids(masjidNames);
      console.log(masjidNames);
    });
  }, [db])

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
            <View >
            <Link href={{pathname: '/modal', params: {query: item.Masjid}}} asChild style={styles.masjidContainer} >
              <Pressable>
                {({ pressed }) => (
                  <>
                    <Text style={styles.masjidText} lightColor='rgba(16, 37, 64, 0.8)'>🕌 {toCapitalCase(item.Masjid)}</Text>
                    {/* <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    /> */}
                  </>
                )}
              </Pressable>
            </Link>
            </View>
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
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
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
    // flex: 1,
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 2,
    padding: 15,
    // width: '95%',
    backgroundColor: 'transparent'
  },
  masjidText: {
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'capitalize',
  }
});
