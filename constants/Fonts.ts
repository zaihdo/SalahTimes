import { StyleSheet } from 'react-native';

const fontFamilies = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',      // Add these
  bold: 'PlusJakartaSans-Bold',          // Add these
  italic: 'PlusJakartaSans-Italic',
  poppinsBlack: 'Poppins-Black',
  poppinsBlackItalic: 'Poppins-BlackItalic',
  poppinsBold: 'Poppins-Bold',
  poppinsBoldItalic: 'Poppins-BoldItalic',
  poppinsExtraBold: 'Poppins-ExtraBold',
  poppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  poppinsExtraLight: 'Poppins-ExtraLight',
  poppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
  poppinsItalic: 'Poppins-Italic',
  poppinsLight: 'Poppins-Light',
  poppinsLightItalic: 'Poppins-LightItalic',
  poppinsMedium: 'Poppins-Medium',
  poppinsMediumItalic: 'Poppins-MediumItalic',
  poppinsRegular: 'Poppins-Regular',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
  poppinsThin: 'Poppins-Thin',
  poppinsThinItalic: 'Poppins-ThinItalic'
};

const fontSizes = {
  small: 14,
  medium: 16,
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
    fontFamily: fontFamilies.bold,
  },
  headingXLarge: {
    fontSize: fontSizes.xxlarge,
    fontFamily: fontFamilies.bold,
  },

  // Poppins styles
  poppinsRegular: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.poppinsRegular,
  },
  poppinsBold: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.poppinsBold,
  },
  // Remove fontWeight from everywhere - it's not needed!
});

export default fonts;