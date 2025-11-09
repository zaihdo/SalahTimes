import React from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={{ padding: 16 }}>
        <Pressable style={[styles.row, { borderColor: Colors[theme].complement?.[theme === 'dark' ? 'dark' : 'light'] ?? '#E6E6E6' }]}>
          <Text style={[fonts.text, { color: Colors[theme].text?.primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>Notification preferences</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light']} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});