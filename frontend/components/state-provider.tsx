"use client";

import React from "react";

export const StateContext = React.createContext();

export interface State {
  revision_id?: string;
  assessment_id?: string;
}

export const StateProvider = ({ children }) => {
  const [sharedState, setSharedState] = React.useState<State | undefined>();

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};
