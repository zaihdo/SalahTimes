import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';
import SectionCard from '../../components/SectionCard';

// Import structured data (adjust path if your data shape differs)
import { appContent as content } from '../../assets/data/menu-data';

export default function ContactUs() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // prefer a contact-specific section list; fall back to a simple contact section
  const sections =
    content?.contact ??
    [
      {
        title: 'Contact Us',
        content:
          'For support and enquiries you can email us or visit our website.',
        icon: undefined,
      },
    ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}
      contentContainerStyle={styles.inner}
    >
      <View>
        {sections.map((section: any, index: number) => (
          <SectionCard
            key={`${section.title ?? 'section'}-${index}`}
            icon={section.icon}
            title={section.title}
            content={section.content}
            onPress={section.onPress}
          />
        ))}
      </View>

      {sections.length === 0 ? (
        <Text
          style={[
            fonts.text,
            { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginHorizontal: 16 },
          ]}
        >
          For support and enquiries you can email us or visit our website.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 16 },
});