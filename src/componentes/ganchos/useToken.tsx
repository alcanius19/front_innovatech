import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { makeVar } from "@apollo/client";

interface ProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export interface IToken {
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}

export const tokenVar = makeVar<string | null>(null);

export const PersonalTokenContext = React.createContext<IToken>({} as IToken);

export const useToken = () => useContext(PersonalTokenContext);

export const PersonalTokenProvider: React.FC<ProviderProps> = (
  props: ProviderProps
) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    tokenVar(token);
  }, [token]);

  const { children } = props;

  return (
    <PersonalTokenContext.Provider value={{ token, setToken }}>
      {children}
    </PersonalTokenContext.Provider>
  );
};
