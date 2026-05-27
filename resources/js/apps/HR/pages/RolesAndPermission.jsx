import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../global/services/Api";
import { Spinner } from "../../../global/components/Spinner";
import { useParams } from "react-router-dom";

export const RolesAndPermission = () => {
    const [roles, setRoles] = useState([]);
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [allPermissions, setAllPermissions] = useState({});
    const [selectedModule, setSelectedModule] = useState();
    const [employee, setEmployee] = useState(null);
    const [isSupperAdmin, setIsSupperAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const onSelectModule = (module) =>{
        setSelectedModule(module.name);
        setPermissions(Object.values(allPermissions[module.name]));
    }

    const mapRes = (res, attr) =>{
        return Object.keys(res.data[attr]).map((key)=>({
            name: key,
            permissions: res.data[attr][key]
        }));
    }

    useEffect(() => {
        Promise.allSettled([
            api.employee.find({ userId: params.employeeId }).then((res) => {
                setEmployee(res.data.user);
                setIsSupperAdmin(res.data.user.attributes.roles.find(
                    (role)=>role.attributes.name === 'super_admin'
                ));
            }),
            api.role.rolesAndPermissionsByModules().then((res) => {
                console.log(res.data);
                return;
                setRoles(mapRes(res, 'roles'));
                setModules(mapRes(res, 'modules'));

                const moduleName = Object.keys(res.data.modules)[0];
                setAllPermissions(res.data.permissions);
                setSelectedModule(moduleName);
                setPermissions(Object.values(res.data.permissions[moduleName]));
            })
        ]).finally(()=>setLoading(false));
    }, []);

    if (loading) return <Spinner show bg="white" />;

    return (
        <div className="bg-light min-vh-100">
            {/* HEADER */}
            <div className="px-3 py-2 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="fw-bold small">
                            {employee?.attributes?.fullName || 'User'}
                        </div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>
                            Role Management
                        </div>
                    </div>
                    {isSupperAdmin && (
                        <span className="badge bg-danger">
                            SUPER ADMIN
                        </span>
                    )}
                </div>
            </div>

            <div className="container px-3 py-3">
                {/* MODULES */}
                <div className="d-flex overflow-auto gap-2 mb-3 pb-1">
                    {modules.map((module) => (
                        <button
                            onClick={()=>onSelectModule(module)}
                            className={`btn btn-sm rounded-3 px-3 text-uppercase btn-${
                                selectedModule === module.name ? 'primary' : 'outline-secondary'
                            }`}
                            key={module.name}
                        >
                            {module.name}
                        </button>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* ROLES */}
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                            <h6 className="text-uppercase text-muted mb-3">Roles</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {roles.map((role)=>(
                                    <RoleCard
                                        role={role.name}
                                        key={role.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PERMISSIONS */}
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="mb-3 text-uppercase small text-muted">
                                <strong className="text-dark">{selectedModule}:</strong> permissions
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                                {permissions.map((perm)=>(
                                    <PermissionCard
                                        perm={perm}
                                        key={perm}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


const RoleCard = ({ role }) =>{
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const toggle = () =>{
        setLoading(true);

        const data = {
            userId: params.employeeId,
            roles: [role]
        }

        api.role.syncUserRoles(data).then((res)=>{
            setChecked(!checked);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }

    return (
        <label
            className={`border pointer rounded-3 px-3 py-1 small d-flex align-items-center gap-2 position-relative ${
                checked ? 'bg-opacity-10 bg-primary' : ''
            }`}
        >
            <input type="checkbox" checked={checked} onChange={toggle} />
            <span className="text-uppercase">{role.replaceAll('_', ' ')}</span>
            <Spinner show={loading} absolute />
        </label>
    )
}

const PermissionCard = ({ perm }) =>{
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const toggle = () =>{
        setLoading(true);

        const data = {
            userId: params.employeeId,
            roles: [perm]
        }

        api.role.syncUserPermissions(data).then((res)=>{
            setChecked(!checked);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }
    
    return (
        <label
            className={`border pointer rounded-3 px-2 py-1 small d-flex align-items-center gap-1 position-relative ${
                checked ? 'bg-opacity-10 bg-primary' : ''
            }`}
        >
            <input type="checkbox" checked={checked} onChange={toggle} />
            <span className="text-uppercase">{perm.replaceAll('_', ' ')}</span>
            <Spinner show={loading} absolute />
        </label>
    )
}
