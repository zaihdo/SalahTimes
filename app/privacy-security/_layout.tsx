import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform, Pressable, Text } from 'react-native';

export default function PrivacySecurityLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const router = useRouter();

  return (
    <Stack
      screenOptions={({ route }) => ({
        title: 'Privacy & Security',
        header: ({ navigation, options, back }) => (
          <View
            style={{
              backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'],
              paddingTop: Platform.OS === 'ios' ? 50 : 20,
              paddingBottom: 16,
              paddingHorizontal: 16,
              borderBottomWidth: 0,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              {/* Left column: chevron on top, title below */}
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                {back ? (
                  <Pressable
                    onPress={() => router.back()}
                    style={{
                      marginBottom: 6,
                      paddingTop: 8,
                      paddingBottom: 16,
                    }}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={Colors[theme].text?.primary?.[theme === 'dark' ? 'dark' : 'light']}
                    />
                  </Pressable>
                ) : (
                  // keep spacing similar when there's no back button
                  <View style={{ height: 24, marginBottom: 6 }} />
                )}

                 <Text
                  style={[
                    fonts?.headingXLarge ?? {},
                    {
                      color: Colors[theme].text?.primary?.[theme === 'dark' ? 'dark' : 'light'],
                      marginLeft: 4,
                    },
                  ]}
                >
                  {options.title || route.name}
                </Text>
              </View>

              {/* right side placeholder for balance (can hold actions later) */}
              <View style={{ width: 40 }} />
            </View>
          </View>
        ),
        headerShadowVisible: false,
      })}
    />
  );
}