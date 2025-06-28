import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function onboarding1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to our app!</Text>
      <Link href="/(onboarding)/onboarding2" asChild>
        <Button title="Get Started" />
      </Link>
    </View>
  );
}