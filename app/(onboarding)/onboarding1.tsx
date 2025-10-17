import AsyncStorage from '@react-native-async-storage/async-storage';
import {router } from 'expo-router';
import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, Pressable, StyleSheet } from 'react-native';

function OnboardingScreen1() {

  const handlePress = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
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
                <Text style={{ fontSize: 28, fontWeight: 'semibold', marginBottom: 20, color: 'white' }}>Start Your Prayer Journey</Text>
                <Text style={{ fontSize: 16, fontWeight: 'light', marginBottom: 20, marginRight: 20, color: 'white' }}>Select your city to see nearby mosques and get prayer reminders, wherever you are.</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.wrapperCustom,
                        { opacity: pressed ? 0.5 : 1 }
                        ]}
                    onPress={handlePress}
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
    backgroundColor: '#ffc801',
  },
});