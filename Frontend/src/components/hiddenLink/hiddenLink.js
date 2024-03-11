import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowAdminOnly=({children})=>{
  const { user } = useSelector((state) => state.auth);
  if(user.role==='admin'){
    return children;
  }
  return null;
};

export const ShowCustomerOnly=({children})=>{
  const { user } = useSelector((state) => state.auth);
  if(user.role==='customer'){
    return children;
  }
  return null;
};

