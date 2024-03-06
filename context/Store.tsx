import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define initial states
interface AuthenticationState {
  isAuthenticated: boolean;
}

interface ThemeState {
  theme: string;
}

const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
};

const initialThemeState: ThemeState = {
  theme: "light",
};

// Define action types
type AuthenticationAction = { type: "LOGIN" } | { type: "LOGOUT" };
type ThemeAction = { type: "DARK" } | { type: "LIGHT" };

// Define reducer functions
const authenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "DARK":
      return { ...state, theme: "dark" };
    case "LIGHT":
      return { ...state, theme: "light" };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  theme: themeReducer,
});

// Create context
interface ContextType {
  state: {
    authentication: AuthenticationState;
    theme: ThemeState;
  };
  dispatch: React.Dispatch<any>;
}

const MyContext = createContext<ContextType | undefined>(undefined);

// Create context provider component
interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, {
    authentication: initialAuthenticationState,
    theme: initialThemeState,
  });

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to consume the context
export const useMyContext = (): ContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

// Helper function to combine reducers
function combineReducers(reducers: any) {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: reducers[key](acc[key], action),
      }),
      state
    );
  };
}
