import React from 'react';
import { StyleSheet, View, Image, Pressable, ViewStyle } from 'react-native';
import { Text } from './Themed';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import Icon from './Icon';

type SectionCardProps = {
  icon?: any;
  title: string;
  content?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function SectionCard({ icon, title, content, onPress, style }: SectionCardProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const currentColors = Colors[theme];

  const Container: any = onPress ? Pressable : View;
  const iconColor = currentColors?.text?.primary?.[theme === 'dark' ? 'dark' : 'light'];

  return (
    <Container
      onPress={onPress}
      style={[
        styles.section,
        {
          backgroundColor:
            currentColors.cardBg?.[theme === 'dark' ? 'dark' : 'light'] ??
            currentColors.cardBg?.[theme === 'dark' ? 'dark' : 'light'] ??
            (theme === 'dark' ? '#000' : '#fff'),
          borderColor: currentColors.cardOutline?.[theme === 'dark' ? 'dark' : 'light'] ?? 'rgba(0,0,0,0.06)',
        },
        style,
      ]}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        {icon ? (
          <View style={{ width: 32, height: 32, borderRadius: 6, marginRight: 8, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <Icon source={icon} width={28} height={28} color={iconColor as string} stroke='' fill='transparent'/>
          </View>
        ) : null}

        <Text
          style={[
            fonts.heading,
            styles.sectionTitle,
            { color: currentColors.text?.primary?.[theme === 'dark' ? 'dark' : 'light'] },
          ]}
        >
          {title}
        </Text>
      </View>

      {content ? (
        <Text
          style={[
            fonts.text,
            styles.sectionContent,
            { color: currentColors.text?.secondary?.[theme === 'dark' ? 'dark' : 'light'] },
          ]}
        >
          {content}
        </Text>
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
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