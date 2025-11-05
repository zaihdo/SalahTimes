import { StyleSheet } from 'react-native';

const fontFamilies = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',      // Add these
  bold: 'PlusJakartaSans-Bold',          // Add these
  italic: 'PlusJakartaSans-Italic',
  // Add other variants if you have them
};

const fontSizes = {
  small: 14,
  medium: 18,
  large: 20,
  xlarge: 24,
  xxlarge: 28,
};

const fonts = StyleSheet.create({
  // Regular styles
  text: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.regular,
  },
  textSmall: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.regular,
  },
  textLarge: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.regular,
  },

  // Medium weight
  textMedium: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.medium,
  },
  textSmallMedium: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.medium,
  },

  // Bold styles - use actual bold font family
  textBold: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.bold,
  },
  textSmallBold: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.bold,
  },
  textLargeBold: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.bold,
  },

  // Italic styles
  textItalic: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.italic,
  },
  textSmallItalic: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.italic,
  },

  // Heading styles
  heading: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.bold,
  },
  headingLarge: {
    fontSize: fontSizes.xlarge,
    fontFamily: fontFamilies.medium,
  },
  headingXLarge: {
    fontSize: fontSizes.xxlarge,
    fontFamily: fontFamilies.bold,
  },

  // Remove fontWeight from everywhere - it's not needed!
});

export default fonts;