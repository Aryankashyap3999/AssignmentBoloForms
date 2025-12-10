import { useEffect, useState } from 'react';
import { getResponsiveScale } from '../utils/coordinateUtils';

export const useResponsive = () => {
  const [scale, setScale] = useState(getResponsiveScale());

  useEffect(() => {
    const handleResize = () => {
      setScale(getResponsiveScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return scale;
};
