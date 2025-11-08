import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

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
  const colorScheme = useColorScheme();
  const iconStyle = useAnimatedStyle(() => ({ 
    transform: [{ rotate: `${progress.value * 180}deg` }]
   }))
  return (
    <Animated.View style={iconStyle}>
      <TabBarIcon name="chevron-down" color= {Colors[colorScheme ?? 'light'].icon.tabBarOn[colorScheme === 'dark' ? 'dark' : 'light']}/>
    </Animated.View>
  )
}

export default Chevron