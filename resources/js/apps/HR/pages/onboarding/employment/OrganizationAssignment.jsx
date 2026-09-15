import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaLayerGroup, FaSitemap, FaUserTie, FaMapMarkerAlt, FaSave, FaArrowRight, FaUsers, FaSearch } from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { useApi } from "../../../../../global/context/ApiProvider";
import { api } from "../../../../../global/services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Tags } from "../../../../../global/components/Tags";
import { AlertCircle, Building, Group, Workflow } from "lucide-react";
import { EmptyDisplay } from "../../../components/EmptyDisplay";
import { routes } from "../../../../../global/routes/Routes";
import { PendingDisplay } from "../../../components/PendingDisplay";

export const OrganizationAssignment = () => {
    const { listener, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError, hasError, flushErrors } = useApi();

    const [pending, setPending] = useState(true);
    const [employment, setEmployment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [assignment, setAssignment] = useState({
        departmentIds: [],
        teams: [],
        location: 'office',
    });

    const params = useParams();
    const navigate = useNavigate();

    const update = (key, value) => {
        setAssignment((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const validate = () =>{
        flushErrors();
        if(!employment?.id){
            throwApiError('There was an error: employment not found.', 'location');
        }
        if(!assignment.location){
            throwApiError('Work location is required.', 'location');
        }
        if(!assignment.departmentIds.length){
            throwApiError('At least one department is required.', 'departmentIds');
        }
        /*if(!assignment.teams.length){
            throwApiError('There must be at least one team.', 'teams');
        }*/
       return !hasError();
    }

    const save = async () => {
        if(!validate()) return;
        setLoading(true);
        const data = {
            ...assignment,
            userId: params.userId,
            employmentId: employment.id
        }
        api.onboarding.orgAssignment.update(data).then((response)=>{
            navigate(routes.hr.viewEmployee(params.userId));
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setLoading(false));
    };

    useEffect(()=>{
        Promise.allSettled([
            api.department.list().then((response)=>{
                setDepartments(response.data.departments);
            }).catch((error)=>{

            }),
            api.employment.find({userId: params.userId}).then((response)=>{
                setEmployment(response.data.employment);
            }).catch((error)=>{
                
            })
        ]).finally(()=>setPending(false));
    }, []);
    
    useEffect(()=>{
        const unsubscribe = listener('COMPLETE', ({on, off}) =>{
            off();
            save();
        });
        return () =>unsubscribe();
    }, [assignment, employment]);
    
    if(pending) return(
        <PendingDisplay message="Loading organization requirements" />
    )

    return (
        <div className="container-fluid p-1 p-sm-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* HEADER */}
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 60 }}>
                            <FaSitemap size={24} />
                        </div>
                        <div>
                            <h3 className="mb-1">Organization Assignment</h3>
                            <small className="text-muted">
                                Define reporting structure, department placement, and workforce grouping
                            </small>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-3 p-4">
                    {/* DEPARTMENT */}
                    <Tags
                        className="mb-4"
                        title="Department"
                        name="departmentIds"
                        onChange={(values)=>update('departmentIds', values)}
                        value={assignment.departmentIds}
                        icon={Building}
                        tags={departments.map((dep)=>({
                            title: dep.attributes.name,
                            value: dep.id
                        }))}
                    />

                    {/* TEAMS */}
                    <Tags
                        className="mb-4"
                        title="Teams"
                        name="teams"
                        onChange={(values)=>null}
                        icon={Group}
                        tags={[]}
                        renderNoTags={()=>(
                            <EmptyDisplay
                                icon={FaUsers}
                                title="No Teams Created Yet"
                                subtitle="Teams help organize employees into
                                operational groups for workforce
                                scheduling, approvals, collaboration,
                                and reporting. Create your first team
                                to begin structuring your workforce."
                                render={(opt)=>(
                                    <button className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3 rounded-pill">
                                        <opt.icon.plus />
                                        Create
                                    </button>
                                )}
                            />
                        )}
                    />

                    {/* LOCATION */}
                    <Tags
                        className="mb-4"
                        title="Work Location"
                        name="location"
                        onChange={(value)=>update('location', value)}
                        value={[assignment.location]}
                        icon={Workflow}
                        tags={[
                            {title: 'Remote', value: 'remote'},
                            {title: 'Office', value: 'office'},
                            {title: 'Hybrid', value: 'hybrid'},
                        ]}
                        singleSelect
                    />
                </div>
            </motion.div>
        </div>
    );
};

