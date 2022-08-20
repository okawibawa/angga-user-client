import React, { createContext } from 'react';

interface AppContextInterface {
  url: string;
}

interface HostProps {
  children: React.ReactNode;
}

export const HostContext = createContext<AppContextInterface | undefined>(undefined);

const HostContextProvider = ({ children }: HostProps) => {
  const hostContext: AppContextInterface = {
    url: process.env.NEXT_PUBLIC_HOST!,
  };

  return <HostContext.Provider value={hostContext}>{children}</HostContext.Provider>;
};

export default HostContextProvider;
