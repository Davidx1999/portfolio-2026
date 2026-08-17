import React, { createContext, useContext, useState } from 'react';

const AppReadyContext = createContext({
  isAppReady: false,
  setIsAppReady: () => {},
});

export function AppReadyProvider({ children }) {
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <AppReadyContext.Provider value={{ isAppReady, setIsAppReady }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  return useContext(AppReadyContext);
}
