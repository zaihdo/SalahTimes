import React from 'react';
import { Stack } from 'expo-router';
import { Platform, Pressable, View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import fonts from '../../constants/Fonts';
import { Text } from '../../components/Themed';

export default function OnboardingLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const headerOptions = ({ route }: { route: any }) => ({
    header: ({ navigation: nav, options, back }: any) => (
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
              <View style={{ height: 24, marginBottom: 6 }} />
            )}

            <Text
              style={[
                fonts?.headingLarge ?? {},
                {
                  color: Colors[theme].text?.primary?.[theme === 'dark' ? 'dark' : 'light'],
                  ...Platform.select({
                    ios: { marginLeft: 10 },
                    android: { marginLeft: 0 },
                  }),
                },
              ]}
            >
              {options.title || route.name}
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>
      </View>
    ),
    headerShadowVisible: false,
  });

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'],
        },
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
      }}
    >
      <Stack.Screen name="onboarding1" options={{ headerShown: false }} />

      <Stack.Screen
        name="onboarding2"
        options={({ route }) => ({
          ...headerOptions({ route }),
          title: 'Select Your City',
        })}
      />
      <Stack.Screen
        name="onboarding3"
        options={({ route }) => ({
          ...headerOptions({ route }),
          title: 'Select Your Preferred Madhab',
        })}
      />
    </Stack>
  );
}