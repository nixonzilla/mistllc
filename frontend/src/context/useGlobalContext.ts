/* src/context/useGlobalContext.ts */
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import type { GlobalContextType } from "../lib/types";

/**
 * Safe hook to consume GlobalContext.
 * Throws a clear runtime error when used outside provider.
 */
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

export default useGlobalContext;
