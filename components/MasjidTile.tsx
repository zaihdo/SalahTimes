import React from 'react';
import { StyleSheet, ImageBackground, Pressable, View } from 'react-native';
import { Text } from '../components/Themed';
import { Link } from 'expo-router';
import { ImageSourcePropType } from 'react-native';
import fonts from '../constants/Fonts';

interface MasjidTileProps {
  name: string;
  image?: ImageSourcePropType;
  masjidId?: string; // value to pass to Iqamah query param; falls back to `name`
  style?: any;
}

export default function MasjidTile({ name, image, masjidId, style }: MasjidTileProps) {

  const safeId = encodeURIComponent((masjidId ?? name).toString());

  return (
    <Link href={{ pathname: '/Iqamah', params: { query: safeId } }} asChild>
      <Pressable style={[styles.tile, style]} accessibilityLabel={`Open ${name}`}>
          <ImageBackground source={image} imageStyle={styles.imageStyle} resizeMode="cover">
            <View style={styles.overlay}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[fonts.text, styles.nameText, { color: '#fff' }]}
              >
                {name}
              </Text>
            </View>
          </ImageBackground>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  // tile is responsive; parent controls width. aspectRatio set for approx 165x227.
  tile: {
    borderRadius: 16,
    overflow: 'scroll',
  },
  imageStyle: {
    borderRadius: 16,
    
  },
  overlay: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
});