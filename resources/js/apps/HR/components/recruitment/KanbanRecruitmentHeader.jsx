import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiFilter, FiPlus, FiList, FiBriefcase, FiUsers, FiChevronDown } from "react-icons/fi";
import { api } from "../../../../global/services/Api";
import { routes } from "../../../../global/routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GlobalSearchFilter } from "../../../../global/components/GlobalSearchFilter";

export const KanbanRecruitmentBoardHeader = ({ columns, onChange }) => {
    const [jobs, setJobs] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const items = useMemo(()=>[
        {
            list: [
                {title: 'Applied', name: 'status', value: 'applied'},
                {title: 'Screening', name: 'status', value: 'screening'},
                {title: 'Interview', name: 'status', value: 'interview'},
                {title: 'Offer', name: 'status', value: 'offer'},
                {title: 'Hired', name: 'status', value: 'hired'},
                {title: 'Rejected', name: 'status', value: 'rejected'},
            ]
        },
    ], []);

    const change = (filter) =>{
        let copy = {...filter};
        if(filter.name){
            copy.firstName = filter.name;
            copy.lastName = filter.name;
            delete copy.name;
        }
        onChange?.(copy);
    }

    useEffect(()=>{
        api.job.list().then((response)=>{
            setJobs(response.data.jobs);
        }).catch((error)=>{

        });
    }, []);

    return (
        <div className="container py-3">
            <GlobalSearchFilter
                className="mb-2"
                onChange={change}
                placeholder="Search candidates, email, phone, skills..."
                mapSameNameToArray="STRING_ON_SINGLE_ITEM"
                name="name"
                items={items}
                buttons={[
                    {
                        className: 'text-muted',
                        title: 'List View',
                        icon: FiList,
                        onClick: ()=>navigate(routes.hr.recruitment.search(params.jobId))
                    },{
                        className: 'btn-primary',
                        title: 'Add Candidate',
                        icon: FiPlus,
                        onClick: ()=>navigate(routes.hr.createApplicant(params.jobId))
                    },
                ]}
            />
            <div className="d-none d-sm-flex flex-wrap gap-2 pt-1">
                {Object.values(columns).map((column, key)=>(
                    <div className="badge bg-light text-muted d-flex gap-1" key={`${column.name}-${key}`}>
                        <div>{column.name}</div>
                        <div className="text-dark">({column.items.length})</div>
                    </div>
                ))}
            </div>
        </div>
    );
};