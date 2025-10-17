import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FinishOnboarding() {
  const [selectedMadhabIndex, setSelectedMadhabIndex] = useState<number | null>(null);

  const madhabs = [
    { id: 1, name: 'Hanafi' },
    { id: 2, name: "Shafi'ee" },
  ];

  // Animated values for tick icons
  const tickAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    // Initialize animated values for each madhab
    tickAnimations.current = madhabs.map(() => new Animated.Value(0));
  }, []);

  useEffect(() => {
    if (
      selectedMadhabIndex !== null &&
      tickAnimations.current[selectedMadhabIndex]
    ) {
      Animated.timing(tickAnimations.current[selectedMadhabIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    tickAnimations.current.forEach((anim, idx) => {
      if (idx !== selectedMadhabIndex) {
        anim.setValue(0);
      }
    });
  }, [selectedMadhabIndex]);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
    router.replace('/(tabs)/');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
      <View style={{maxWidth: '90%'}}>
        <View style={{marginTop: 10}}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#102540' }}>Select Your Madhab</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 20, color: '#8D8D8D', minHeight: 24 }} numberOfLines={2}>
            This is used to determine the prayer times for Asr. It can be changed later in Settings.
          </Text>
        </View>
        <ScrollView>
          {madhabs.map((madhab, index) => {
            const isSelected = selectedMadhabIndex === index;
            return (
              <View key={index} style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 8}}>
                <Pressable
                  onPress={() => setSelectedMadhabIndex(index)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFEFE',
                    padding: 10,
                    borderRadius: 10,
                    width: '100%',
                    borderColor: isSelected ? '#102540' : '#E5E5E5',
                    borderWidth: 1,
                  }}
                >
                  <Text style={{
                    flex: 1,
                    textAlign: 'left',
                    color: '#102540',
                    fontSize: 16,
                    fontWeight: '500'
                  }}>
                    {madhab.name}
                  </Text>
                  <Animated.View
                    style={{
                      marginLeft: 10,
                      opacity: tickAnimations.current[index] || 0,
                      transform: [
                        {
                          scale: tickAnimations.current[index]
                            ? tickAnimations.current[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                              })
                            : 1,
                        },
                      ],
                    }}
                  >
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="green"
                      />
                    )}
                  </Animated.View>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
        <Pressable
          style={({ pressed }) => [
            styles.wrapperCustom,
            { opacity: pressed ? 0.5 : 1 }
          ]}
          onPress={completeOnboarding}
        >
          <Text style={{
            color: '#102540',
            fontSize: 18,
            fontWeight: '500',
            textAlign: 'center',
          }}>
            Save and Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffc801',
    marginTop: 10,
  },
});