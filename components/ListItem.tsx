import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { useScreenSize } from '@/hooks/useScreenSize';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import fonts from '@/constants/Fonts';

export default function ListItem(props: { prayer: string, time: string }) {
  const { isSmall, isLarge, width, height } = useScreenSize();
  const colorScheme = useColorScheme();

  // Log screen size info on initial render
  React.useEffect(() => {
    console.log(
      '📱 ListItem Mounted - Screen Dimensions:',
      JSON.stringify({
        width,
        height,
        isSmallScreen: isSmall,
        isLargeScreen: isLarge,
        component: 'ListItem',
        prayer: props.prayer,
        calculatedPadding: isSmall ? 5 : 20
      }, null, 2)
    );
  }, []);

  // Log when screen size changes
  React.useEffect(() => {
    console.log(
      '🔄 Screen Size Changed - New Dimensions:',
      `Width: ${width} | Height: ${height}`,
      `| isSmall: ${isSmall}`,
      `| isLarge: ${isLarge}`,
      `| Current Padding: ${isSmall ? 5 : 20}`
    );
  }, [isSmall, isLarge, width, height]);

  return (
    <View 
      style={[
        styles.container, 
        { padding: isSmall ? 6 : 20, 
          backgroundColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light']
        }
      ]} 
      lightColor='#fff'>
      <Text 
        style={[
          styles.prayerText,
          fonts.title
        ]}
        lightColor="rgb(16, 37, 64)"
        darkColor="rgb(255, 200, 1)">
        {props.prayer}
      </Text>
      <Text 
        style={[
          styles.prayerText,
          fonts.title
        ]}
        lightColor="rgb(16, 37, 64)"
        darkColor="rgb(255, 200, 1)">
        {props.time}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginTop: 5,
  },
  prayerText: {
    lineHeight: 24,
  },
});