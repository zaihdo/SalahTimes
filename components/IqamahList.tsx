import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { IqamahTime } from '../types/dbTypes';
import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import React from 'react';
import fonts from '../constants/Fonts';

interface ListProps {
  iqamahs: IqamahTime[];
  masjid: string
}

export default function List({iqamahs, masjid}: ListProps) {
  const colorScheme = useColorScheme();
  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  // Determine current prayer based on time
  const getCurrentPrayer = (prayerTimes: [string, string][]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Convert prayer times to minutes
    const timesInMinutes = prayerTimes.map(([name, time]) => {
      const [hours, minutes] = time.split(':').map(Number);
      return {
        name,
        minutes: hours * 60 + minutes,
      };
    });

    // Find the next prayer time that hasn't occurred yet
    for (let i = 0; i < timesInMinutes.length; i++) {
      if (currentMinutes < timesInMinutes[i].minutes) {
        // Current time is before this prayer, so we're in the previous prayer period
        return i > 0 ? timesInMinutes[i - 1].name : timesInMinutes[timesInMinutes.length - 1].name;
      }
    }

    // If we're past all prayer times, we're in the last prayer period
    return timesInMinutes[timesInMinutes.length - 1]?.name;
  };

  // flatten entries, filter Dhuhr/DhuhrSunday according to current day,
  // and limit to 5 items so the list always shows 5 iqamah times
  const isSunday = new Date().getDay() === 0; // 0 === Sunday

  const rawEntries = iqamahs.flatMap(iqamah => Object.entries(iqamah));

  const filteredEntries = rawEntries.filter(([key]) => {
    const normalized = formatColumnName(key).toLowerCase();
    if (isSunday) {
      // on Sunday, prefer 'dhuhr-sunday' and remove plain 'dhuhr'
      if (normalized === 'dhuhr') return false;
      return true;
    } else {
      // non-Sunday, remove 'dhuhr-sunday' and keep plain 'dhuhr'
      if (normalized === 'dhuhr-sunday') return false;
      return true;
    }
  });

  // preserve order, but ensure only 5 items are shown
  const data = filteredEntries.slice(0, 5);

  const currentPrayer = getCurrentPrayer(data);

  const renderItem = ({ item }: { item: [string, string] }) => {
    const isCurrent = item[0] === currentPrayer;
    return (
      <ListItem 
        prayer={formatColumnName(item[0])} 
        time={item[1]} 
        isCurrent={isCurrent}
      />
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text
            style={[
              { color: Colors[colorScheme ?? 'light'].text?.secondary?.[colorScheme === 'dark' ? 'dark' : 'light'], fontWeight: '700' },
              fonts.heading
            ]}
            numberOfLines={1}
          >
            Iqamah Times
          </Text>
        </View>
      }
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 0,
      margin: 10
    },
    header: {
      textAlign: 'center',
      padding: 15
    },
    headerContainer: {
      alignSelf: 'stretch',
      paddingHorizontal: 8,
      paddingVertical: 12,
    }
  });