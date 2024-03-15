"use client";

import React from "react";

export interface State {
  revision_id?: string | undefined | null;
  assessment_id?: string | undefined | null;
}

export interface StateContextType {
  sharedState?: State;
  setSharedState: (newState: State) => void;
}

const defaultState: StateContextType = {
  sharedState: undefined,
  setSharedState: () => {},
};

export const StateContext = React.createContext<StateContextType>(defaultState);

export const StateProvider = ({ children }: { children: any }) => {
  const [sharedState, setSharedState] = React.useState<State | undefined>();

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};
