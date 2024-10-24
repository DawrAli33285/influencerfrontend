import { createContext, useState } from "react";


const BondListContext = createContext();

const BondListProvider = ({ children }) => {
  const [state, setState] = useState([]); 

  return (
    <BondListContext.Provider value={{ state, setState }}>
      {children}
    </BondListContext.Provider>
  );
};

export { BondListContext, BondListProvider };
