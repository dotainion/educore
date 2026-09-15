import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../global/components/Spinner";
import { api } from "../../../global/services/Api";
import { routes } from "../../../global/routes/Routes";
import { GlobalNavbarPortal } from "../../../global/components/Navbar";
import img from "../../../global/assets/logo.png";
import { GlobalDropdownSelect } from "../../../global/widgets/GlobalDropdownSelect";
import { GlobalSearch } from "../../../global/widgets/GlobalSearch";
import { GlobalEllipsisMenu } from "../../../global/widgets/GlobalEllipsisMenu";
import { GlobalSearchFilter } from "../../../global/components/GlobalSearchFilter";
import { title } from "framer-motion/client";

export const Employees = () => {
    const [hideFilter, setHideFilter] = useState(false);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        api.user.list().then((response)=>{
            setEmployees(response.data.users);
        }).catch((error)=>{
            console.log(error)
        });
    }, []);

    return (
        <div className="container">
            <GlobalNavbarPortal
                title="Employees"
                reserveActions={[{ type: 'create', to: routes.employee.create }]}
            />

            <GlobalSearchFilter
                items={[
                    {
                        title: 'Department',
                        list: [
                            {title: 'All department', name: 'departmentId', value: ''},
                        ]
                    },{
                        title: 'Location',
                        list: [
                            {title: 'All location', name: 'location', value: ''},
                        ]
                    },{
                        title: 'Status',
                        list: [
                            {title: 'Active', name: 'active', value: ''},
                            {title: 'Inactive', name: 'inactive', value: ''},
                        ]
                    }
                ]}
            />

            <div className="row gap-0 m-0 mt-3">
                {employees.map((employee, key)=>(
                    <motion.div
                        className="col-12 col-sm-4 col-lg-3 p-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: key * 0.1 }}
                        viewport={{ once: true }}
                        key={key}
                    >
                        <div className="card border pointer h-100">
                            <div className="card-body text-center">
                                <div className="border rounded-circle p-2 mb-2">
                                    <img className="w-100" src={img} alt="" />
                                </div>
                                <h6 className="mb-1">{employee.attributes.fullName}</h6>
                                <small>Manager</small>
                                <div className="small text-muted lh-1">
                                    <small>Department</small>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
