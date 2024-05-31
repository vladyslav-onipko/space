import { ReactNode, createContext, useState, useCallback } from 'react';

interface UrlParamsFieldValue {
  [key: string]: any;
}

interface UrlParamsState {
  urlParams: UrlParamsFieldValue;
}

interface UrlParamsActions {
  setUrlParams: (params: UrlParamsFieldValue) => void;
}

interface UrlParamsContextProviderProps {
  children: ReactNode;
}

type UrlParamsContextValue = UrlParamsState & UrlParamsActions;

export const UrlParamsContext = createContext<UrlParamsContextValue>({
  urlParams: {},
  setUrlParams: () => {},
});

export const UrlParamsContextProvider = ({ children }: UrlParamsContextProviderProps) => {
  const [params, setParams] = useState<UrlParamsFieldValue>({});

  const handleSetUrlParams = useCallback((urlParams: UrlParamsFieldValue) => {
    setParams((prevState) => {
      const newParams: UrlParamsFieldValue = {};

      for (const [key, value] of Object.entries(urlParams)) {
        newParams[key] = value;
      }

      return { ...prevState, ...newParams };
    });
  }, []);

  const ctx: UrlParamsContextValue = {
    urlParams: params,
    setUrlParams: handleSetUrlParams,
  };
  return <UrlParamsContext.Provider value={ctx}>{children}</UrlParamsContext.Provider>;
};
