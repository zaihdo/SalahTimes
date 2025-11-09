import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Suspense from '../../components/Suspense';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import MenuListItem from '../../components/MenuIconListItem';
import ListItem from '../../components/ListItem';

const MENU_ITEMS = [
  { key: 'about', title: 'About Us', icon: require('../../assets/icons/about-us.svg'), route: '../about-us/AboutUs' },
  { key: 'contact', title: 'Contact Us', icon: require('../../assets/icons/contact-us.svg'), route: '../contact-us/ContactUs' },
  { key: 'privacy', title: 'Privacy & Security', icon: require('../../assets/icons/privacy-security.svg'), route: '../privacy-security/PrivacySecurity' },
  { key: 'settings', title: 'Settings', icon: require('../../assets/icons/settings.svg'), route: '../settings/Settings' },
];

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const renderItem = ({ item }: { item: typeof MENU_ITEMS[0] }) => {
    return (
      <View style={styles.rowWrapper}>
        <MenuListItem title={item.title} route={item.route} suffix='chevron'/>
      </View>
    );
  };

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={[styles.container, { backgroundColor: Colors[theme].primary?.[theme === 'dark' ? 'dark' : 'light'] }]}>
        <FlatList
          data={MENU_ITEMS}
          keyExtractor={(i) => i.key}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: Colors[theme].complement?.[theme === 'dark' ? 'dark' : 'light'] ?? '#E6E6E6' }]} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    opacity: 0.3,
  },
});