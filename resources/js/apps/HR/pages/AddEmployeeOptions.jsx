import { FiUserPlus, FiUpload, FiClipboard, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";

export const AddEmployeeOptions = () => {

    const navigate = useNavigate();

    const options = [
        {
            title: 'Quick Add',
            description: 'Create an employee instantly with minimal required details.',
            icon: FiUserPlus,
            color: 'bg-primary bg-opacity-10',
            border: '',
            route: routes.hr.addEmployee
        },{
            title: 'Full Onboarding',
            description: 'Step-by-step guided onboarding with full employee setup.',
            icon: FiClipboard,
            color: 'bg-info bg-opacity-10',
            border: '',
            route: routes.hr.onboarding.employee.newEmployeeProfile()
        },{
            title: 'Import CSV / Excel',
            description: 'Upload a file to create multiple employees in bulk.',
            icon: FiUpload,
            color: 'bg-success bg-opacity-10',
            border: '',
            route: routes.hr.csvImport
        }
    ];

    return (
        <div className="container">
            <div className="w-full max-w-4xl">
                <div className="mb-8 text-center">
                    <h4 className="text-2xl font-semibold text-gray-900">Add Employee</h4>
                    <p className="mt-1 small text-muted">
                        Choose how you want to create employee records
                    </p>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3">
                    {options.map((opt, key) => (
                        <div
                            onClick={()=>navigate(opt.route)}
                            className={`card action d-flex flex-column cursor-pointer bg-white border rounded-xl py-5 px-3 hover:shadow-md transition-all duration-200 group`}
                            key={key}
                        >
                            <div className={`w-12 h-12 flex items-center justify-center justify-center rounded-lg m-auto ${opt.color}`}>
                                <opt.icon  size={22} />
                            </div>
                            <h4 className="mt-4 text-lg font-semibold text-gray-900 text-center">{opt.title}</h4>
                            <p className="mt-1 text-sm text-gray-500 leading-relaxed text-center mb-auto">{opt.description}</p>
                            <div className="mt-5 flex items-center justify-center text-sm font-medium text-gray-700 group-hover:text-black">
                                Continue
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Footer hint */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    You can change employee creation method anytime in settings
                </div>
            </div>
        </div>
    );
};