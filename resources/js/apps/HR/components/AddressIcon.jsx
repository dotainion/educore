import { House, Locate, Mail, Type, Workflow } from "lucide-react";
import { useMemo } from "react";
import { FaHome, FaPeopleCarry } from "react-icons/fa";

export const AddressIcon = ({ className, type, size }) =>{

    const icons = useMemo(()=>({
        home: FaHome,
        work: Workflow,
        parents: FaPeopleCarry,
        residential: House,
        mailing: Mail,
        address: Locate,
        other: Type,
    }), []);

    const Icon = icons[type] || FaHome;

    return(
        <Icon className={className} size={size} />
    )
}