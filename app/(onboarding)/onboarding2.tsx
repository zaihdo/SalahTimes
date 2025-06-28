import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function FinishOnboarding() {
  const completeOnboarding = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You're all set!</Text>
      <Link 
        href="/" 
        asChild
        onPress={completeOnboarding}
      >
        <Button title="Get my prayers" />
      </Link>
    </View>
  );
}