import { View, SafeAreaView, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useColorScheme } from '../../hooks/useColorScheme';
import { DataHandler } from '../../services/DataHandler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { Text } from '../../components/Themed';

export default function SelectCityForOnboarding() {
  const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const db = useSQLiteContext();
  const tickAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      const capitalizedCities = cityNames.map((city: any) => ({
        ...city,
        City: DataHandler.capitalize(city.City),
      }));
      setCities(capitalizedCities);
      tickAnimations.current = capitalizedCities.map(() => new Animated.Value(0));
    }).catch((err) => {
      if (__DEV__) {
        console.error('[onboarding2] db error', err);
      }
    });
  }, [db]);

  useEffect(() => {
    if (selectedCityIndex !== null && tickAnimations.current[selectedCityIndex]) {
      Animated.timing(tickAnimations.current[selectedCityIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    tickAnimations.current.forEach((anim, idx) => {
      if (idx !== selectedCityIndex) {
        anim.setValue(0);
      }
    });
  }, [selectedCityIndex]);

  const handlePress = async () => {
    if (selectedCityIndex === null) return;

    const selectedCity = cities[selectedCityIndex].City;
    const normalizedCity = DataHandler.toUpperCase(selectedCity);
    if (__DEV__) {
      console.log('Selected City:', normalizedCity);
    }

    await AsyncStorage.multiSet([
      ['@viewedOnboarding', 'true'],
      ['@selectedCity', JSON.stringify(normalizedCity)],
    ]);

    router.push('/(onboarding)/onboarding3');
  };

  const isButtonDisabled = selectedCityIndex === null;
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
            Choose your city in Botswana to view nearby mosques and get accurate prayer times.
          </Text>
        </View>

        <ScrollView style={{ marginBottom: 10 }}>
          {cities.map((city, index) => {
            const isSelected = selectedCityIndex === index;
            const borderColor = isSelected
              ? resolveColor(currentColors.outlineActive, '#102540')
              : currentColors.cardOutline?.[theme === 'dark' ? 'dark' : 'light'] ?? '#E5E5E5';
            const bg = currentColors.cardBg?.[theme === 'dark' ? 'dark' : 'light'] ?? (theme === 'dark' ? '#0B0B0B' : '#FFFEFE');
            const iconColor = currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'];

            return (
              <View key={index} style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 8 }}>
                <Pressable
                  onPress={() => setSelectedCityIndex(index)}
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
                    name="location-sharp"
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
                    {city.City}
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