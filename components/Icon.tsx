import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import type { SvgProps } from 'react-native-svg';

type SvgComponent = React.ComponentType<SvgProps>;
type ImageSource = number | { uri: string } | string;
type IconSource = SvgComponent | ImageSource | React.ReactElement | null | undefined;

export type IconProps = {
  source?: IconSource;
  width?: number;
  height?: number;
  color?: string; // used for SVG fill/stroke or Image tintColor
  fill?: string;
  stroke?: string;
  style?: StyleProp<ImageStyle>;
} & SvgProps;

/**
 * Icon
 * - Accepts an SVG component (SVGR/react-native-svg), a require(...) asset (number),
 *   an object with { uri }, a string uri, or a React element.
 * - Passes color/fill/stroke to SVG components.
 * - Applies tintColor for raster images when `color` is provided.
 */
export default function Icon({
  source,
  width = 24,
  height = 24,
  color,
  fill,
  stroke,
  style,
  ...svgProps
}: IconProps) {
  if (!source) return null;

  // If already a React element, return it (allow consumers to fully control props)
  if (React.isValidElement(source)) {
    return source;
  }

  // If source is an SVG component module (may be default export)
  const Comp = (source as any)?.default ?? source;
  if (typeof Comp === 'function') {
    return (
      // SVG components accept SvgProps — pass color/fill/stroke along with sizing
      // `color` is commonly supported by svgr output; stroke/fill included for compatibility
      <Comp
        width={width}
        height={height}
        fill={fill ?? color}
        stroke={stroke ?? color}
        color={color}
        {...(svgProps as SvgProps)}
      />
    );
  }

  // If source is a number (require(...)) or uri string/object, render Image
  if (typeof source === 'number' || typeof source === 'string' || (typeof source === 'object' && (source as any).uri)) {
    const imageSource = typeof source === 'string' ? { uri: source } : (source as any);
    // For raster assets you can apply tintColor via style to recolor monochrome icons
    const imgStyle: StyleProp<ImageStyle> = [
      { width, height, resizeMode: 'contain' },
      style,
      color ? { tintColor: color } : null,
    ];
    return <Image source={imageSource as any} style={imgStyle} />;
  }

  // Unknown type
  return null;
}