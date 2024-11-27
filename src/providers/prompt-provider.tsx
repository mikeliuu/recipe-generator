'use client';

import { Recipe } from '@/types/recipe';
import { createContext, useContext, useReducer } from 'react';

interface PromptContextState {
  loading: boolean;
  result: Recipe[] | null;
}

export enum PromptActionType {
  SET_LOADING = 'SET_LOADING',
  SET_RESULT = 'SET_RESULT',
}

type PromptAction =
  | { type: PromptActionType.SET_LOADING; payload: boolean }
  | { type: PromptActionType.SET_RESULT; payload: Recipe[] | null };

const promptReducer = (state: PromptContextState, action: PromptAction) => {
  switch (action.type) {
    case PromptActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PromptActionType.SET_RESULT:
      return {
        ...state,
        result: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  result: null,
};

export const PromptContext = createContext<{
  state: PromptContextState;
  dispatch: React.Dispatch<PromptAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function PromptContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  return (
    <PromptContext.Provider value={{ state, dispatch }}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePromptContext() {
  const { state, dispatch } = useContext(PromptContext);
  return {
    state,
    setPromptLoading: function (bool: boolean) {
      dispatch({ type: PromptActionType.SET_LOADING, payload: bool });
    },
    setPromptResult: function (recipes: Recipe[]) {
      dispatch({
        type: PromptActionType.SET_RESULT,
        payload: recipes,
      });
    },
  };
}
