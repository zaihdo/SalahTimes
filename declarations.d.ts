declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  const content: FunctionComponent<SVGProps<SVGSVGElement> & { width?: number | string; height?: number | string }>;
  export default content;
}