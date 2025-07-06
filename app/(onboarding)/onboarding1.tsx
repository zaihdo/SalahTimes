import { Link } from 'expo-router';
import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import { useWindowDimensions } from 'react-native';

function OnboardingScreen1() {
  const { width, height } = useWindowDimensions();

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
                <Text style={{ fontSize: 28, fontWeight: 'semibold', marginBottom: 20, color: 'white' }}>Start Your Prayer Journey</Text>
                <Text style={{ fontSize: 16, fontWeight: 'light', marginBottom: 20, marginRight: 20, color: 'white' }}>Select your city to see nearby mosques and get prayer reminders, wherever you are.</Text>
                <Link href="/(onboarding)/onboarding2" asChild>
                    <Pressable
                        style={{
                        backgroundColor: '#ffc801',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 24,
                        }}
                    >
                        <Text style={{
                            color: '#102540',
                            fontSize: 18,
                            fontWeight: 'medium',
                            textAlign: 'center',
                        }}>
                        Get Started
                        </Text>
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    </ImageBackground>
  );
}

export default OnboardingScreen1;