import { useEffect, useState } from "react"
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect"
import { api } from "../../../global/services/Api";
import { Spinner } from "../../../global/components/Spinner";

export const DepartmentSelect = (tempProps) =>{
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const valueAsName = tempProps?.valueAsName;
    let props = {...JSON.parse(JSON.stringify(tempProps)), onChange: tempProps?.onChange};
    delete props['valueAsName'];

    const change = (e) =>{
        if(!props?.onChange) return;
        const deptId = e.target.value;
        const dept = departments.find((d)=>d.id === deptId);
        props.onChange(e, dept);
    }

    useEffect(()=>{
        api.department.list().then((response)=>{
            setDepartments(response.data.departments);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <GlobalApiSelect {...{...props, onChange: change, loading: loading ? 'loading' : ''}}>
            <option value="" hidden>Select a department</option>
            {departments.map((dept)=>(
                <option
                    value={valueAsName ? dept.attributes.name : dept.id}
                    key={dept.id}
                >{dept.attributes.name}</option>
            ))}
        </GlobalApiSelect>
    )
}