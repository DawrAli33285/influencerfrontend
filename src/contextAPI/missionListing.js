import { createContext, useState } from "react";

const MissionListContext = createContext();


const MissionListProvider = ({ children }) => {
  const [missionStateContext,setMissionStateContext] = useState([]); 

  return (
    <MissionListContext.Provider value={{missionStateContext,setMissionStateContext }}>
      {children}
    </MissionListContext.Provider>
  );
};

export { MissionListContext,MissionListProvider };
