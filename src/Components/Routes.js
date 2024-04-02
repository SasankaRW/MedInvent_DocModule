import { useContext } from "react";
import NavigationContex from "../views/admin/context/navigation";

function Route({ path, children }) {
  const { currentPath } = useContext(NavigationContex);

  if (currentPath === path) {
    return children;
  }
  return null;
}
export default Route;
