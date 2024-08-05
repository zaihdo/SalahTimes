import { View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { SplashScreen, useRouter } from 'expo-router';

export default function splash() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  const router = useRouter();

  return (
    <View></View>
  )
}
