import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Category } from '@/assets/data/about'
import Chevron from './Chevron';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
    value: Category;
}

const Accordion = ({value}: Props) => {
 const open = useSharedValue(false);
 const progress = useDerivedValue(() => 
open.value ? withTiming(1) : withTiming(0))


  return (
    <View style={styles.container}>
        <Pressable style={styles.titleContainer} onPress={() => open.value = !open.value}>
            <Text style={styles.textTitle}>{value.title}</Text>
            <Chevron/>
        </Pressable>
        <View style={styles.contentContainer}>
            {value.content.map((v,i) => {
                return (
                    <View key={i} style={styles.content}>
                        <Text style={styles.textContent}>{v}</Text>
                    </View>
                );
            })}
        </View>
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3edfb',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#0f56b3',
        overflow: 'hidden'
    },
    titleContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 16,
        color: 'black'
    },
    contentContainer: {
        // position: "absolute",
        // top: 0,
        width: '100%'
    },
    content: {
        padding: 20,
        backgroundColor: '#d6e1f0'
    },
    textContent: {
        fontSize: 14,
        color: 'black'
    }
})