import react from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";
import { GrReturn } from "react-icons/gr";
import { SearchPipeline } from "../../components/SearchPipeline";

export const SearchRecruitmentPipeline = () =>{

    const navigate = useNavigate();

    const items = [
        {
            list: [
                { title: 'Applied', name: 'status', value: 'applied' },
                { title: 'Screening', name: 'status', value: 'screening' },
                { title: 'Interview', name: 'status', value: 'interview' },
                { title: 'Offer', name: 'status', value: 'offer' },
                { title: 'Hired', name: 'status', value: 'hired' },
                { title: 'Rejected', name: 'status', value: 'rejected' }
            ]
        }
    ];

    return(
        <SearchPipeline
            pipeline="recruitment"
            defaultStatus="applied"
            filterItems={items}
            renderHeader={
                <button onClick={()=>navigate(routes.hr.recruitment.recruite)} className="btn btn-sm btn-link">
                    <GrReturn size={20} />
                </button>
            }
            renderStatus={(applicant)=>(
                <span
                    className={`badge bg-${
                        applicant.attributes.status === 'applied' ? 'secondary' : ''
                    }${
                        applicant.attributes.status === 'screening' ? 'dark' : ''
                    }${
                        applicant.attributes.status === 'interview' ? 'primary' : ''
                    }${
                        applicant.attributes.status === 'offer' ? 'warning' : ''
                    }${
                        applicant.attributes.status === 'hired' ? 'success' : ''
                    }${
                        applicant.attributes.status === 'rejected' ? 'danger' : ''
                    }`}
                >{applicant.attributes.status}</span>
            )}
        />
    )
}