import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { useScreenSize } from '@/hooks/useScreenSize';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

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
        { padding: isSmall ? 5 : 20, 
          backgroundColor: Colors[colorScheme ?? 'light'].accent[colorScheme === 'dark' ? 'dark' : 'light']
        }
      ]} 
      lightColor='#fff'>
      <Text 
        style={styles.prayerText}
        lightColor="rgba(0,0,0,0.5)"
        darkColor="rgba(255,255,255,0.5)">
        {props.prayer}
      </Text>
      <Text 
        style={styles.prayerText}
        lightColor="rgba(0,0,0,0.5)"
        darkColor="rgba(255,255,255,0.5)">
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
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});