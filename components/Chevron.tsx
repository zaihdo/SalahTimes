import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

type Props = {
  progress: Animated.SharedValue<number>;
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome6>['name'];
    color: string;
  }) {
    return <FontAwesome6 size={18} style={{ marginBottom: -3 }} {...props} />;
  }

const Chevron = ({ progress }: Props) => {
  const iconStyle = useAnimatedStyle(() => ({ 
    transform: [{ rotate: `${progress.value * 180}deg` }]
   }))
  return (
    <Animated.View style={iconStyle}>
      <TabBarIcon name="chevron-down" color= "#fff"/>
    </Animated.View>
  )
}

export default Chevron