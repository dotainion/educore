import { useEffect, useState } from "react"
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect"
import { api } from "../../../global/services/Api";

export const ManagerSelect = (props) =>{
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);

    const change = (e) =>{
        if(!props?.onChange) return;
        const supId = e.target.value;
        const sup = departments.find((d)=>d.id === supId);
        props.onChange(e, sup);
    }

    useEffect(()=>{
        api.employee.list().then((response)=>{
            setManagers(response.data.users);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <GlobalApiSelect {...{...props, onChange: change, loading: loading ? 'loading' : ''}}>
            <option value="" hidden>Select a manager</option>
            {managers.map((dept)=>(
                <option
                    className="d-flex justify-content-between"
                    value={dept.id}
                    key={dept.id}
                >{dept.attributes.fullName}</option>
            ))}
        </GlobalApiSelect>
    )
}