import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category, NestedItem} from '@/assets/data/about-data';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';
import AccordionNested from './AccordionNested';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import fonts from '@/constants/Fonts';

type Props = {
  value: Category;
  type: string;
};

const Accordion = ({value, type}: Props) => {
  const colorScheme = useColorScheme();
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View 
      style={[
        styles.container,
        {
          borderColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light'],
        },
      ]}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              heightValue.value = withTiming(measure(listRef)!.height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}
        style={[
          styles.titleContainer,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light'],
          },
        ]}>
        <Text style={[
          fonts.heading,
          {
            color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light'],
          },
        ]}>{value.title}</Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={[
          styles.contentContainer,
        ]} ref={listRef}>
          {type === 'regular' &&
            value.content.map((v, i) => {
              return (
                <View key={i} style={[
                  styles.content,
                  {
                    backgroundColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light'],
                  },
                ]}>
                  <Text style={[
                    styles.textContent,
                    fonts.text,
                    {
                      color: Colors[colorScheme ?? 'light'].textSecondary[colorScheme === 'dark' ? 'dark' : 'light'],
                    },
                  ]}>{v}</Text>
                </View>
              );
            })}
          {type === 'nested' && (
            <>
              <View style={[
                styles.content,
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'],
                },
              ]}>
                <Text style={[
                  styles.textContent,
                  {
                    color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light'],
                  },
                ]}>{value.content}</Text>
              </View>
              {value.contentNested.map((val: NestedItem, ind: number) => {
                return (
                  <AccordionNested
                    value={val}
                    key={ind}
                    parentHeighValue={heightValue}
                  />
                );
              })}
            </>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 3,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
  },
  content: {
    padding: 15,
  },
  textContent: {
    fontSize: 18,
  },
});