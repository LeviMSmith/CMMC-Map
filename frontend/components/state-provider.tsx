"use client";

import { useState, useEffect, createContext } from "react";

import { backendFetch } from "@/lib/session";

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

export function isKeyOfSectionProgress(key: any): key is keyof SectionProgress {
  return (
    key in
    {
      "3.1": true,
      "3.2": true,
      "3.3": true,
      "3.4": true,
      "3.5": true,
      "3.6": true,
      "3.7": true,
      "3.8": true,
      "3.9": true,
      "3.10": true,
      "3.11": true,
      "3.12": true,
      "3.13": true,
      "3.14": true,
    }
  );
}

export interface ControlProgress {
  id: number;
  policy_description?: string;
  plan_description?: string;
  na_description?: string;
  implementation_status: number;
  control: number;
}

export interface State {
  revision_id?: string | undefined | null;
  assessment_id?: string | undefined | null;
  sectionProgress?: SectionProgress | undefined | null;
  controlProgress?: ControlProgress[] | undefined | null;
  refreshControlProgress: boolean;
  refreshRevisions: boolean;
}

export interface StateContextType {
  sharedState: State;
  setSharedState: (newState: State) => void;
}

const defaultState: StateContextType = {
  sharedState: { refreshControlProgress: false, refreshRevisions: false },
  setSharedState: () => {},
};

export const StateContext = createContext<StateContextType>(defaultState);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedState, setSharedState] = useState<State>(
    defaultState.sharedState,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (sharedState.revision_id) {
        try {
          const res = await backendFetch(
            `/api/revisions/${sharedState.revision_id}/policy/`,
            {
              method: "GET",
            },
          );

          const data = await res.json();
          let istat: Partial<SectionProgress> = {};
          let cstat: ControlProgress[] = [];
          data.forEach(
            (section: { id: number; policies: ControlProgress[] }) => {
              var implementTotal = 0;
              var implementStatus = 0;
              section.policies.forEach((policy) => {
                implementTotal += 1;
                if (policy.implementation_status !== 0) {
                  implementStatus += 1;
                }

                cstat.push(policy as ControlProgress);
              });

              istat[`3.${section.id}` as keyof SectionProgress] =
                (implementStatus / implementTotal) * 100;
            },
          );

          updateSharedState({
            sectionProgress: istat as SectionProgress,
            controlProgress: cstat as ControlProgress[],
          });
        } catch (error) {
          console.error("Failed to fetch implementation status", error);
        }
      }
    };

    fetchData();
  }, [sharedState.revision_id, sharedState.refreshControlProgress]);

  const updateSharedState = (newState: Partial<State>) => {
    setSharedState((prevState = defaultState.sharedState) => ({
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
