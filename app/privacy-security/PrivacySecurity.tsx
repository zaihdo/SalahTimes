import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function PrivacySecurity() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <Text style={[fonts.text, { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginHorizontal: 16 }]}>
        We take your privacy seriously. All personal data is stored locally on your device and nothing is shared without your consent.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});