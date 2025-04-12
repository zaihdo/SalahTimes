import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Props = {}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome6>['name'];
    color: string;
  }) {
    return <FontAwesome6 size={18} style={{ marginBottom: -3 }} {...props} />;
  }

const Chevron = (props: Props) => {
  return (
    <View>
      <TabBarIcon name="chevron-down" color='black'/>
    </View>
  )
}

export default Chevron