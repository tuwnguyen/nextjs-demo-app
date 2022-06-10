import React, { useState } from "react";

export interface AppContextDataProps {
  user: {
    username: string;
    email: string;
  } | null;
  theme: string;
}

export interface AppContextProps {
  dataAppContext: AppContextDataProps;
  setDataAppContext: (
    initialState:
      | AppContextDataProps
      | ((initialState: AppContextDataProps) => AppContextDataProps)
  ) => void;
}

const initialState: AppContextProps = {
  setDataAppContext: () => {
    return;
  },
  dataAppContext: {
    user: null,
    theme: "light",
  },
};

export const AppContext = React.createContext<AppContextProps>(initialState);
export const AppContextProvider = (props: any) => {
  const [dataAppContext, setDataAppContext] = useState<AppContextDataProps>({
    user: null,
    theme: "light",
  });
  return (
    <AppContext.Provider
      value={{
        dataAppContext: dataAppContext,
        setDataAppContext: setDataAppContext,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
