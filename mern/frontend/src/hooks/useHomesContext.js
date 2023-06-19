import { HomesContext } from "../context/HomeContext";
import { useContext } from "react";

export const useHomesContext = () => {
    const context = useContext(HomesContext)

    if (!context) {
        throw Error('useHomesContext must be used inside an HomesContextProvider')
    }
    
    return context
}