import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaUserShield,
    FaLock,
    FaUnlock,
    FaKey,
    FaUsers,
    FaCogs,
    FaCheckCircle,
    FaSave,
    FaArrowRight,
} from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { useApi } from "../../../../../global/context/ApiProvider";
import { api } from "../../../../../global/services/Api";
import { useParams } from "react-router-dom";

export const SystemAccessPermissions = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError, hasError } = useApi();

    const [access, setAccess] = useState({
        accountActive: true,
        loginEnabled: true,
        roles: ["employee"],
        permissions: {
            viewSchedule: true,
            editSchedule: false,
            approveSchedule: false,
            viewPayroll: false,
            editProfile: true,
        },
        dataScope: "department", // global | department | self
    });

    const params = useParams();

    const roles = [
        "employee",
        "supervisor",
        "manager",
        "scheduler",
        "hr",
        "admin",
    ];

    const toggleRole = (role) => {
        setAccess((prev) => ({
            ...prev,
            roles: prev.roles.includes(role)
                ? prev.roles.filter(r => r !== role)
                : [...prev.roles, role],
        }));
    };

    const togglePermission = (key) => {
        setAccess((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key],
            },
        }));
    };

    const update = (key, value) => {
        setAccess((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const save = async () => {
        setLoading(true);
        const data = {
            userId: params.userId
        }
        api.onboarding.permissions.update(data).then((response)=>{

        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    };

    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* HEADER */}
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-dark bg-opacity-10 text-dark rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 60 }}>
                            <FaUserShield size={22} />
                        </div>
                        <div>
                            <h3 className="mb-1">System Access & Permissions</h3>
                            <small className="text-muted">
                                Control login access, roles, and system permissions
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* RIGHT FORM */}
                    <div className="col-12 col-xl-8">
                        <div className="bg-white border rounded-3 p-4">
                            {/* TOGGLES */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={access.accountActive}
                                            onChange={(e) => update("accountActive", e.target.checked)}
                                        />
                                        <label className="form-check-label">
                                            Account Active
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={access.loginEnabled}
                                            onChange={(e) => update("loginEnabled", e.target.checked)}
                                        />
                                        <label className="form-check-label">
                                            Login Enabled
                                        </label>
                                    </div>
                                </div>

                            </div>

                            {/* ROLES */}
                            <div className="mb-4">
                                <label className="form-label">Roles</label>

                                <div className="d-flex flex-wrap gap-2">
                                    {roles.map(role => (
                                        <button
                                            key={role}
                                            type="button"
                                            className={`btn btn-sm ${
                                                access.roles.includes(role)
                                                    ? "btn-primary"
                                                    : "btn-outline-secondary"
                                            }`}
                                            onClick={() => toggleRole(role)}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DATA SCOPE */}
                            <div className="mb-4">
                                <label className="form-label">Data Scope</label>

                                <select
                                    className="form-select"
                                    value={access.dataScope}
                                    onChange={(e) => update("dataScope", e.target.value)}
                                >
                                    <option value="self">Self Only</option>
                                    <option value="department">Department</option>
                                    <option value="global">Global</option>
                                </select>
                            </div>

                            {/* PERMISSIONS */}
                            <div>
                                <label className="form-label">Permissions</label>

                                <div className="row g-2">

                                    {Object.keys(access.permissions).map((key) => (
                                        <div key={key} className="col-md-6">

                                            <div
                                                className={`border rounded p-2 d-flex justify-content-between align-items-center ${
                                                    access.permissions[key]
                                                        ? "border-success bg-success bg-opacity-10"
                                                        : ""
                                                }`}
                                                onClick={() => togglePermission(key)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span className="text-capitalize">
                                                    {key.replace(/([A-Z])/g, " $1")}
                                                </span>

                                                {access.permissions[key] ? (
                                                    <FaCheckCircle className="text-success" />
                                                ) : (
                                                    <FaLock className="text-muted" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};