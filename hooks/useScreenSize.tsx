import { Dimensions, ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [dimensions, setDimensions] = useState({
    isSmall: Dimensions.get('window').height < 650,
    isLarge: Dimensions.get('window').height >= 800,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions({
        isSmall: window.height < 650,   // e.g., iPhone SE
        isLarge: window.height >= 800,  // e.g., iPad
        width: window.width,
        height: window.height
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return dimensions;
};