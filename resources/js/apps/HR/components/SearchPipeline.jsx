import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { GlobalSearchFilter } from "../../../global/components/GlobalSearchFilter"
import { api } from "../../../global/services/Api"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { GrReturn } from "react-icons/gr";
import { useSearchCallback } from "../../../global/hooks/useSearchCallback";
import { Spinner } from "../../../global/components/Spinner";

export const SearchPipeline = ({ pipeline, defaultStatus, filterItems, renderHeader, renderStatus }) =>{
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const items = useMemo(()=>filterItems, []);

    const to = (applicant) =>{
        navigate(routes.hr[pipeline][applicant.attributes.status](applicant.id));
    }

    const search = useSearchCallback((filter) =>{
        setLoading(true);
        const data = {
            ...filter,
            firstName: filter.SAERCH_VALUE,
            lastName: filter.SAERCH_VALUE,
        }

        delete data.SAERCH_VALUE;
        if(data.firstName === undefined) delete data.firstName;
        if(data.lastName === undefined) delete data.lastName;

        setApplicants([]);

        api.applicant.search(data).then((response)=>{
            setApplicants(response.data.applicants);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    });

    useEffect(()=>{
        api.applicant.list({status: defaultStatus}).then((response)=>{
            setApplicants(response.data.applicants);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="container">
            {renderHeader}
            <GlobalSearchFilter
                className="py-4"
                onChange={search}
                mapSameNameToArray='STRING_ON_SINGLE_ITEM'
                name="SAERCH_VALUE"
                alwaysOpen
                items={items}
            />
            <div className="border rounded-3 p-1 overflow-hidden text-break">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && applicants.map((applicant)=>(
                            <tr className="pointer" onClick={()=>to(applicant)} key={applicant.id}>
                                <td>{applicant.attributes.fullName}</td>
                                <td>{applicant.attributes.email}</td>
                                <td>{applicant.attributes.contact}</td>
                                <td>{renderStatus(applicant)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && (
                    <div className="position-relative py-5">
                        <Spinner show absolute md bg="white" />
                    </div>
                )}
            </div>
        </div>
    )
}