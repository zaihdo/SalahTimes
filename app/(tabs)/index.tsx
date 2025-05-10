import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import fonts from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Utilities } from '@/util/Utilities';

export default function CityScreen() {
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      setCities(cityNames);
    });
  }, [db]);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'],
        },
      ]}>
        <FlatList
          contentContainerStyle={[
            styles.flatListContentContainer, 
            { backgroundColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light'],
              borderColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'],
             }]}
          style={[
            styles.flatListContainer
          ]}
          data={cities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/Salaah',
                params: { query: item.City },
              }}
              asChild
              style={[
                styles.masjidContainer,
                {
                  borderColor: Colors[colorScheme ?? 'light'].contrast[colorScheme === 'dark' ? 'dark' : 'light'],
                },
              ]}>
              <Pressable>
                {({ pressed }) => (
                  <>
                    <Text
                      style={[
                        styles.cityText,
                        fonts.text,
                        {
                          color: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'],
                        },
                      ]}
                    >
                      🕌 {Utilities.toCapitalCase(item.City)}
                    </Text>
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
    padding: 20,
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
  flatListContentContainer: {
    borderRadius: 15,
    borderStyle: 'solid',
    padding: 8,
    paddingHorizontal: 16,
  },
  flatListContainer: {
    borderRadius: 15,
    borderStyle: 'solid',
    padding: 8,
    paddingHorizontal: 16,
  },
  cityText: {
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