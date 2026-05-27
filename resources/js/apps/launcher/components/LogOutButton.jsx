import { useState } from "react"
import { routes } from "../../../global/routes/Routes";
import { ButtonWrapper } from "../widgets/ButtonWrapper";

export const LogOutButton = ({className, outline, children}) =>{
    const to = () =>{
        routes.navigate.to.account().withPath('logout');
    }
    return(
        <ButtonWrapper onClick={to} className={className} outline={outline}>
            {children}
        </ButtonWrapper>
    )
}