import { GrVmMaintenance } from "react-icons/gr";
import { routes } from "../routes/Routes";

export const Placeholder = () => {
    return (
        <div className="w-100 d-flex align-items-center justify-content-center" style={{height: '80vh'}}>
            <div className="text-center">
                <GrVmMaintenance className="display-4 mb-3 m-auto" />
                <h4>Under maintainance.</h4>
                <p>This application will soon be up and running.</p>
                <button onClick={()=>routes.navigate.to.apps()} className="btn btn-sm btn-primary">View Apps</button>
            </div>
        </div>
    );
};