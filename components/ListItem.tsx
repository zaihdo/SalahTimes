import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';

export default function ListItem(props: {prayer: string, time: string}) {
  return (
    <View style={styles.container} lightColor='#ffc93c' darkColor='#ffc93c'>
        <Text 
          style={styles.prayerText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">{props.prayer}</Text>
        <Text 
          style={styles.prayerText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">{props.time}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#023047',
        padding: 15,
        marginTop: 5,
    },
    prayerText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
})