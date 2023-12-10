import React, { createContext, useState } from "react";
export const PlanContext = createContext();
const PlanProvider = ({ children }) => {
  const [tableHeaderContext, setTableHeaderContext] = useState([]);
  return (
    <PlanContext.Provider
      value={{
        tableHeaderContext,
        setTableHeaderContext,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
