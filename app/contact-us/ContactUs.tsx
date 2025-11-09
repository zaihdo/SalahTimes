import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ContactUs() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={styles.inner}>
        <Text style={[fonts.text, { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
          For support and enquiries you can email us or visit our website.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 16 },
});