import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import { useColorScheme } from '../../hooks/useColorScheme';
import SectionCard from '../../components/SectionCard';

// Import structured data (adjust path if your data shape differs)
import { appContent as content } from '../../assets/data/menu-data';

export default function PrivacySecurity() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // prefer a privacy-specific section list; fall back to about if privacy not provided
  const sections = content?.privacy ?? content?.about ?? [
    {
      title: 'Privacy & Security',
      content:
        'We take your privacy seriously. All personal data is stored locally on your device and nothing is shared without your consent.',
      icon: undefined,
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] },
      ]}
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

      {/* fallback short summary at bottom if no sections were provided */}
      {sections.length === 0 ? (
        <Text
          style={[
            fonts.text,
            { color: Colors[theme].text?.secondary?.[theme === 'dark' ? 'dark' : 'light'], marginHorizontal: 16 },
          ]}
        >
          We take your privacy seriously. All personal data is stored locally on your device and nothing is shared without your consent.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    padding: 16,
  },
});