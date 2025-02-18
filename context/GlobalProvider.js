import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(true); //set to false once db implemented to check login
    //const [user, setuser] = useState(null); //uncomment when user db is added
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
    /* uncomment once user validation is entered
        getCurrentUser()
            .then((res) => {
                if (res) {
                  setIsLogged(true);
                  setUser(res);
                } else {
                 setIsLogged(false);
                 setUser(null);
                }
            })
           .catch((error) => {
             console.log(error);
            })
            .finally(() => {
                setLoading(false);
             });
             */
    setIsLogged(true);
    setLoading(false);
    }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        //user,
        //setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
