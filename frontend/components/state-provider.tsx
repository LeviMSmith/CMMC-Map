"use client";

import { useState, useEffect, createContext } from "react";

export interface SectionProgress {
  "3.1": number;
  "3.2": number;
  "3.3": number;
  "3.4": number;
  "3.5": number;
  "3.6": number;
  "3.7": number;
  "3.8": number;
  "3.9": number;
  "3.10": number;
  "3.11": number;
  "3.12": number;
  "3.13": number;
  "3.14": number;
}

export interface State {
  revision_id?: string | undefined | null;
  assessment_id?: string | undefined | null;
  sectionProgress?: SectionProgress | undefined | null;
}

export interface StateContextType {
  sharedState?: State;
  setSharedState: (newState: State) => void;
}

const mockProgress: SectionProgress = {
  "3.1": 50,
  "3.2": 25,
  "3.3": 75,
  "3.4": 33,
  "3.5": 66,
  "3.6": 99,
  "3.7": 100,
  "3.8": 0,
  "3.9": 10,
  "3.10": 20,
  "3.11": 30,
  "3.12": 40,
  "3.13": 50,
  "3.14": 60,
};

const defaultState: StateContextType = {
  sharedState: {},
  setSharedState: () => {},
};

export const StateContext = createContext<StateContextType>(defaultState);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedState, setSharedState] = useState<State>({});

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // If you're fetching data from an API, you would use fetch() or another method here.
      // For demonstration, we'll use the mockProgress directly.
      // const data = await fetchYourData();

      // Simulate an async operation, e.g., fetching from an API
      const data = mockProgress; // Replace with actual fetch call if needed

      updateSharedState({ sectionProgress: data });
    };

    fetchData();
  }, [sharedState.revision_id]);

  const updateSharedState = (newState: Partial<State>) => {
    setSharedState((prevState = {}) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <StateContext.Provider
      value={{ sharedState, setSharedState: updateSharedState }}
    >
      {children}
    </StateContext.Provider>
  );
};
