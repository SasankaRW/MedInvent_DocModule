import { useContext } from "react";
import NavigationContex from "../../context/navigation";

function Rout({path,children})
{
  const { currentPath } = useContext(NavigationContex);

  if(currentPath==path)
  {
    return children;
  }
  return null;

}
export default Rout;