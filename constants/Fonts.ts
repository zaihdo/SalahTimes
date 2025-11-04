import { StyleSheet } from 'react-native';

const fontSizes = {
  small: 14,
  medium: 18,
  large: 20,
  xlarge: 24,
  xxlarge: 28,
};

const fontFamilies = {
  regular: 'PlusJakartaSans-Regular',
  italic: 'PlusJakartaSans-Italic',
};

type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const fontWeights = {
  regular: '400' as FontWeight,
  medium: '500' as FontWeight,
  bold: 'bold' as FontWeight,
};

const fonts = StyleSheet.create({
  // Regular styles
  text: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
  },
  textSmall: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
  },
  textLarge: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
  },

  // Bold styles (using font-weight since we don't have bold font file)
  textBold: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  textSmallBold: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  textLargeBold: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },

  // Italic styles
  textItalic: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
  },
  textSmallItalic: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
  },
  textLargeItalic: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
  },

  // Heading styles
  heading: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  headingLarge: {
    fontSize: fontSizes.xlarge,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  headingXLarge: {
    fontSize: fontSizes.xxlarge,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  headingItalic: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
    fontWeight: fontWeights.bold,
  },

  // Title styles
  title: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  titleItalic: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
    fontWeight: fontWeights.bold,
  },

  // Caption styles
  caption: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.regular,
  },
  captionItalic: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
  },
  captionBold: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },

  // Button styles
  button: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.regular,
    fontWeight: fontWeights.bold,
  },
  buttonItalic: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.italic,
    fontStyle: 'italic',
    fontWeight: fontWeights.bold,
  },
});

export default fonts;