import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

const useAddUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addUrlParam = useCallback(
    (key: string, value: string | null | undefined) => {
      const newParams = new URLSearchParams(searchParams);

      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const clearUrlParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return { searchParams, addUrlParam, clearUrlParams };
};

export default useAddUrlParams;
