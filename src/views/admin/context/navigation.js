import { createContext, useEffect, useState } from "react";

const NavigationContex = createContext();

function NavigationProvider({ children }){
    const[currentPath,setCurrentpath] = useState("");
    
    //when user click -> or <- below popstate function works and get path and update setcurrentpath
    useEffect(()=>{
        const handler =()=> {
            setCurrentpath(window.location.pathname);
        };
        window.addEventListener('popstate',handler);

        return ()=>{
            window.removeEventListener('popstate',handler);
        };
    },
    []);
   
    // when receive path we update setcurrentpath from from here
    const navigate=(to)=>{
        window.history.pushState({},'',to);
        setCurrentpath(to);
    };

   return(
      <NavigationContex.Provider value={{currentPath,navigate}}>
        {children}
      </NavigationContex.Provider>
   );
}

export {NavigationProvider};
export default NavigationContex;