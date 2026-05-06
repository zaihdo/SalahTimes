import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import SectionCard from '../../components/SectionCard';

// Import your structured data (adjust path as needed)
import { appContent as aboutSections } from '../../assets/data/menu-data';

export default function AboutUs() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
      <View style={styles.inner}>
        {aboutSections.about.map((section: any, index: number) => (
          <SectionCard
            key={`${section.title}-${index}`}
            icon={section.icon}
            title={section.title}
            content={section.content}
            onPress={section.onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 16,
  },
  // kept for compatibility if other local elements reference them
  section: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  sectionTitle: {
    marginBottom: 2,
  },
  sectionContent: {
    lineHeight: 22,
  },
});