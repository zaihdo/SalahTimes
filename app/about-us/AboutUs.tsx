import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AboutUs() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={styles.inner}>
        <Text style={[fonts.text, { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
          {/* Replace with real content */}
          We provide accurate prayer times and nearby mosque information. Our mission is to make prayer observance easy and accessible.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 16 },
});