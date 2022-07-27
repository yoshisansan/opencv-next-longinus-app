// 参考：https://zenn.dev/jamband/scraps/3749203f91875c
import { useEffect, useState } from 'react';
import { hasTouchScreen } from './screen';

export const useHasTouchScreen = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(hasTouchScreen());
  }, []);

  return {
    hasTouchScreen: state
  } as const;
};
