import { React, useState } from "react";
import UserContext from "./UserContext";

const UserContextState = (props) => {
  const [state, setState] = useState();
  const saveData = (data) => setState({ ...state, data });
  const clearData = () => setState();
  const setProject = (project) => setState({ ...state, project });
  return (
    <UserContext.Provider value={{ state, saveData, clearData, setProject }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextState;
