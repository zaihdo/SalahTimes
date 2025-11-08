import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';

function OnboardingScreen1() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // resolve tint to a concrete color string (Colors[theme].tint can be string or { light, dark })
  const tintColor =
    typeof Colors[theme]?.accent === 'string'
      ? Colors[theme]?.accent
      : Colors[theme]?.accent?.[theme === 'dark' ? 'dark' : 'light'] ?? '#ffc801';

  const handlePress = async () => {
    router.push('/(onboarding)/onboarding2');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboardingBg.png')}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
     }}
    >
        <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
            <View style={{ width: '90%'}}>
                <Text style={[fonts.headingXLarge, styles.title, { color: Colors[theme].text?.primary?.[theme === 'dark' ? 'dark' : 'light'] ?? '#fff' }]}>
                  Start Your Prayer Journey
                </Text>
                <Text style={[fonts.text, styles.subtitle, { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] ?? 'white' }]}>
                  Select your city to see nearby mosques and get prayer reminders, wherever you are.
                </Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.wrapperCustom,
                        { backgroundColor: tintColor, opacity: pressed ? 0.8 : 1 }
                      ]}
                    onPress={handlePress}
                >
                    <Text style={[fonts.text, styles.buttonText]}>
                      Get Started
                    </Text>
                </Pressable>
             </View>
         </SafeAreaView>
     </ImageBackground>
   );
 }

 export default OnboardingScreen1;

 const styles = StyleSheet.create({
   wrapperCustom: {
     borderRadius: 24,
     paddingVertical: 10,
     paddingHorizontal: 20,
     alignItems: 'center',
   },
   buttonText: {
     color: '#102540',
     fontSize: 18,
     fontWeight: '600',
     textAlign: 'center',
   },
   title: {
     marginBottom: 20,
   },
   subtitle: {
     marginBottom: 20,
     marginRight: 20,
   },
 });