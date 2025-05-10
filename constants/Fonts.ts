import { StyleSheet } from 'react-native';

const fontSizes = {
  small: 14,
  medium: 18,
  large: 20,
};

const fontFamilies = {
  openSans: 'Lato',
};

type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const fontWeights = {
  regular: '500' as FontWeight,
  bold: 'bold' as FontWeight,
};

const fonts = StyleSheet.create({
  text: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.openSans,
    fontWeight: fontWeights.regular,
  },
  heading: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.openSans,
    fontWeight: fontWeights.bold,
  },
  title: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.openSans,
    fontWeight: fontWeights.bold,
  },
  caption: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.openSans,
    fontWeight: fontWeights.regular,
  },
});

export default fonts;