"use client";

import React, { useState, useEffect, createContext } from "react";

const StateContext = createContext();

// Assuming the interface definition remains the same
interface State {
  revision_id: number;
  assessment_id: number;
}

const StateProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState<State | undefined>();

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Replace this URL with the actual endpoint from which you're fetching data
        const response = await fetch("https://example.com/api/data");
        const data: State = await response.json();
        setSharedState(data);
      } catch (error) {
        console.error("Failed to fetch initial state", error);
        // Optionally, set some default state or handle the error as needed
      }
    };

    fetchData();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
