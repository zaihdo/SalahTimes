import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from '@/components/useColorScheme';

export default function IqamahScreen() {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);
  const colorScheme = useColorScheme();

  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const results = await DataHandler.iqamahQuery(db);
      setIqamahs(results);
    });
  }, [db])
  
  return (
    <React.Suspense
      fallback={
        <Suspense></Suspense>
      }
    >
    <View style={styles.masjidContainer}>
      <Link href="/modal" asChild>

        <Pressable>
          {({ pressed }) => (
      <><Text>hjshjshjshjsh</Text><FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme ?? 'light'].tint}
                style={{ opacity: pressed ? 0.5 : 1 }} /></>
          )}
        </Pressable>
      </Link>
    </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 5
  }
});
