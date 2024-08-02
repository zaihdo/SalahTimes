import React from 'react'
import { ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function Suspense() {
  return (
    <View>
          <ActivityIndicator size={'large'}/>
          <Text>Loading...</Text>
    </View>
  )
}
