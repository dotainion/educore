import { useState } from "react"
import { routes } from "../../../global/routes/Routes";
import { ButtonWrapper } from "../widgets/ButtonWrapper";

export const LogInButton = ({className, outline, children}) =>{
    const to = () =>{
        routes.navigate.to.account().withPath('login');
    }
    return(
        <ButtonWrapper onClick={to} className={className} outline={outline}>
            {children}
        </ButtonWrapper>
    )
}