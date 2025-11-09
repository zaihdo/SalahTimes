import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category, NestedItem} from '../assets/data/about-data';
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
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import { useScreenSize } from '../hooks/useScreenSize';

type Props = {
  value: Category;
  type: string;
  onPress?: () => void;
};

const Accordion = ({value, type, onPress}: Props) => {
  const colorScheme = useColorScheme();
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const { isSmall, isLarge } = useScreenSize();
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = withTiming(measure(listRef)!.height);
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
    onPress?.();
  };

  return (
    <View 
      style={[
        styles.container,
        {
          marginVertical: isSmall ? 6 : isLarge ? 12 : 10
        },
      ]}>
      <Pressable
        onPress={handlePress}
        hitSlop={10}
        style={[
          styles.titleContainer,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].complement[colorScheme === 'dark' ? 'dark' : 'light'],
            borderColor: Colors[colorScheme ?? 'light'].outlineInactive[colorScheme === 'dark' ? 'dark' : 'light'],
            borderWidth: 1,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderStyle: 'solid',
          },
        ]}>
        <Text style={[
          fonts.heading,
          {
            color: Colors[colorScheme ?? 'light'].text.primary[colorScheme === 'dark' ? 'dark' : 'light'],
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
                    backgroundColor: Colors[colorScheme ?? 'light'].complement[colorScheme === 'dark' ? 'dark' : 'light'],
                    borderColor: Colors[colorScheme ?? 'light'].outlineInactive[colorScheme === 'dark' ? 'dark' : 'light'],
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius: 16,
                    borderStyle: 'solid',
                  },
                ]}>
                  <Text style={[
                    styles.textContent,
                    fonts.text,
                    {
                      color: Colors[colorScheme ?? 'light'].text.secondary[colorScheme === 'dark' ? 'dark' : 'light'],
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
                  backgroundColor: Colors[colorScheme ?? 'light'].primary[colorScheme === 'dark' ? 'dark' : 'light'],
                },
              ]}>
                <Text style={[
                  styles.textContent,
                  {
                    color: Colors[colorScheme ?? 'light'].text.secondary[colorScheme === 'dark' ? 'dark' : 'light'],
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