import React, { createContext, useState } from "react";
export const PlanContext = createContext();
const PlanProvider = ({ children }) => {
  const [planContext, setPlanContext] = useState([]);
  return (
    <PlanContext.Provider
      value={{
        planContext,
        setPlanContext,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
