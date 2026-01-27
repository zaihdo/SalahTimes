import { View, SafeAreaView, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { Text } from '../../components/Themed';

export default function CompleteOnboarding() {
  const [selectedMadhabIndex, setSelectedMadhabIndex] = useState<number | null>(null);
  const madhabs = useMemo(() => [
    { id: 1, name: 'Hanafee' },
    { id: 2, name: 'Shafiee' },
  ], []);
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const tickAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
      // Initialize tick animations based on the local madhabs array
      tickAnimations.current = madhabs.map(() => new Animated.Value(0));
    }, [madhabs]);

  useEffect(() => {
      if (selectedMadhabIndex !== null && tickAnimations.current[selectedMadhabIndex]) {
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

  const handlePress = async () => {
    if (selectedMadhabIndex === null) return;

    const selectedMadhab = madhabs[selectedMadhabIndex].name;
    const normalizedMadhab = selectedMadhab;

    await AsyncStorage.multiSet([
      ['@viewedOnboarding', 'true'],
      ['@selectedMadhab', "Asr" + normalizedMadhab],
    ]);

    router.replace('/(tabs)');
  };

  const isButtonDisabled = selectedMadhabIndex === null;
  const currentColors = Colors[theme];

  const resolveColor = (val: any, fallback: string) =>
    typeof val === 'string'
      ? val
      : val?.[theme === 'dark' ? 'dark' : 'light'] ?? fallback;

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: currentColors.primary?.[theme === 'dark' ? 'dark' : 'light'] ?? (theme === 'dark' ? '#000' : '#fff') },
      ]}
    >
      <View style={{ width: '100%', paddingHorizontal: 20, flex: 1, justifyContent: 'space-between' }}>
        <View style={{ marginTop: 0 }}>
          <Text style={[fonts.text ?? {}, styles.sub, { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
          Choose your preferred madhab for the Asr prayer time calculation.
          </Text>
        </View>

        <ScrollView style={{ marginBottom: 10 }}>
          {madhabs.map((madhab, index) => {
            const isSelected = selectedMadhabIndex === index;
            const borderColor = isSelected
              ? resolveColor(currentColors.outlineActive, '#102540')
              : currentColors.cardOutline?.[theme === 'dark' ? 'dark' : 'light'] ?? '#E5E5E5';
            const bg = currentColors.cardBg?.[theme === 'dark' ? 'dark' : 'light'] ?? (theme === 'dark' ? '#0B0B0B' : '#FFFEFE');
            const iconColor = currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'];

            return (
              <View key={index} style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 8 }}>
                <Pressable
                  onPress={() => setSelectedMadhabIndex(index)}
                  style={({ pressed }) => [
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: pressed ? resolveColor(currentColors.complement, bg) : bg,
                      padding: 10,
                      borderRadius: 10,
                      width: '100%',
                      borderColor,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Ionicons
                    name="book-outline"
                    size={20}
                    color={iconColor}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      fonts.text,
                      {
                        flex: 1,
                        textAlign: 'left',
                        color: iconColor,
                      },
                    ]}
                  >
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
                        color={resolveColor(currentColors.state.success, 'green')}
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
            styles.button,
            {
              opacity: isButtonDisabled ? 0.6 : pressed ? 0.85 : 1,
              backgroundColor: isButtonDisabled
                ? resolveColor(currentColors.complement, '#e5e5e5')
                : resolveColor(currentColors.accent, '#ffc801'),
            },
          ]}
          onPress={handlePress}
          disabled={isButtonDisabled}
        >
          <Text
            style={[
              fonts.textLargeBold,
              {
                color: isButtonDisabled ? currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] : currentColors.text?.primary?.[theme === 'dark' ? 'light' : 'light'],
                textAlign: 'center',
              },
            ]}
          >
            Save and Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 40,
  },
  sub: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});