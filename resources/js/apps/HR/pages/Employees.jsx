import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { GlobalSearch } from "../../../global/widgets/GlobalSearch";
import { FiFilter } from "react-icons/fi";
import { api } from "../../../global/services/Api";
import { DepartmentSelect } from "../components/DepartmentSelect";
import { GlobalSearchFilter } from "../../../global/components/GlobalSearchFilter";
import { title } from "framer-motion/client";
import { Spinner } from "../../../global/components/Spinner";

export const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("All");
    const [status, setStatus] = useState("All");
    const [type, setType] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // -------------------------
    // STATS
    // -------------------------
    const stats = {
        total: employees.length,
        active: employees.filter(e => e.status === "Active").length,
        inactive: employees.filter(e => e.status === "Inactive").length,
    };

    useEffect(()=>{
        api.employee.list().then((response)=>{
            setEmployees(response.data.users);
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setLoading(false));
    }, []);

    return (
        <div className="container">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3"
            >
                <h4 className="fw-semibold">HR Employees</h4>
                <div className="text-muted small">
                    Search, filter and manage employees
                </div>
            </motion.div>

            {/* ================= STATS ================= */}
            <div className="row g-2 mb-2 m-auto">
                {[
                    { label: "Total", value: stats.total },
                    { label: "Active", value: stats.active },
                    { label: "Inactive", value: stats.inactive },
                ].map((s, i) => (
                    <div className="col-4" key={i}>
                        <div className="card border p-2 text-center">
                            <div className="fw-bold">{s.value}</div>
                            <div className="small text-muted">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* ================= SEARCH + FILTER BUTTON ================= */}
            <div className="my-4 m-auto" style={{maxWidth: '800px'}}>
                <GlobalSearchFilter 
                    onChange={(e) => setSearch(e)}
                    placeholder="Search employee, email, contact..."
                    items={[
                        {
                            title: 'Status',
                            list: [
                                {title: 'Active', name: 'active', value: true},
                                {title: 'Inactive', name: 'inactive', value: true},
                            ]
                        },{
                            title: 'Employment',
                            list: [
                                {title: 'All', name: 'all', value: true},
                                {title: 'Full-time', name: 'fulltime', value: true},
                                {title: 'Part-time', name: 'parttime', value: true},
                                {title: 'Contract', name: 'contract', value: true},
                            ]
                        }
                    ]}
                />
            </div>

            {/* ================= MAIN TABLE ================= */}
            <ul className="list-group">
                <li className="list-group-item fw-semibold">Employees</li>
                {loading ? (
                    <li className="list-group-item py-5">
                        <Spinner show absolute md bg="white" />
                    </li>
                ):(
                    employees.map((e, i) => (
                        <motion.li
                            onClick={()=>navigate(routes.hr.viewEmployee(e.id))}
                            className="list-group-item list-group-item-action"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                            key={e.id}
                        >
                            <div className="d-flex flex-wrap justify-content-between gap-3">
                                <div className="small text-muted">
                                    <div className="fw-semibold">{e.attributes.fullName}</div>
                                    <div className="small text-muted">{e.attributes.email}</div>
                                </div>
                                <div className="d-flex flex-column gap-1 small">
                                    <span className={`badge bg-${e.attributes.hide ? 'secondary' : 'success'}`}>
                                        {e.attributes.hide ? 'Inactive' : 'Active'}
                                    </span>
                                    <div className="small text-muted">{e.attributes.updatedAt.split('T')[0]}</div>
                                </div>
                            </div>
                        </motion.li>
                    ))
                )}
            </ul>
        </div>
    );
};