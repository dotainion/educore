import { IoEllipsisVertical } from "react-icons/io5"

export const GlobalEllipsisMenu = ({children}) =>{
    return(
        <div className="dropdown">
            <button className="btn border-0 p-0" data-bs-toggle="dropdown">
                <IoEllipsisVertical />
            </button>
            <div className="dropdown-menu">
                {children}
            </div>
        </div>
    )
}