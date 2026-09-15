import react from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";
import { GrReturn } from "react-icons/gr";
import { SearchPipeline } from "../../components/SearchPipeline";

export const SearchOnboardingPipeline = () =>{

    const navigate = useNavigate();

    const items = [
        {
            list: [
                { title: 'Activation', name: 'status', value: 'activation' },
                { title: 'HR Setup', name: 'status', value: 'HRSetup' },
                { title: 'IT Setup', name: 'status', value: 'ITSetup' },
                { title: 'Documents', name: 'status', value: 'documents' },
                { title: 'Training', name: 'status', value: 'training' },
                { title: 'First Day', name: 'status', value: 'firstDay' },
                { title: 'Completed', name: 'status', value: 'completed' }
            ]
        }
    ];

    return(
        <SearchPipeline
            pipeline="onboarding"
            defaultStatus="activation"
            filterItems={items}
            renderHeader={
                <button onClick={()=>navigate(routes.hr.onboarding.board)} className="btn btn-sm btn-link">
                    <GrReturn size={20} />
                </button>
            }
            renderStatus={(applicant)=>(
                <span
                    className={`badge bg-${
                        applicant.attributes.status === 'activation' ? 'secondary' : ''
                    }${
                        applicant.attributes.status === 'HRSetup' ? 'dark' : ''
                    }${
                        applicant.attributes.status === 'ITSetup' ? 'primary' : ''
                    }${
                        applicant.attributes.status === 'documents' ? 'warning' : ''
                    }${
                        applicant.attributes.status === 'training' ? 'success' : ''
                    }${
                        applicant.attributes.status === 'firstDay' ? 'danger' : ''
                    }${
                        applicant.attributes.status === 'completed' ? 'danger' : ''
                    }`}
                >{applicant.attributes.status}</span>
            )}
        />
    )
}