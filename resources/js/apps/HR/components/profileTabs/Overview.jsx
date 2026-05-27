import { motion } from "framer-motion"

export const Overview = ({ employee }) =>{
    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="card border p-3 h-100">
                        <h6 className="mb-3">Employee Details</h6>
                        <div className="small text-muted">
                            <div><strong>Name:</strong> {employee.attributes.fullName}</div>
                            <div>
                                <strong>Roles:</strong>
                                {employee.attributes.roles.map((role)=>(
                                    <span
                                        className="badge bg-secondary"
                                        key={role.attributes.name}
                                    >{role.attributes.name}</span>
                                ))}
                            </div>
                            <div><strong>Gendar:</strong> {employee.attributes.gender}</div>
                            <div><strong>DOB:</strong> {employee.attributes.dob}</div>
                            <div><strong>Department:</strong> {employee.attributes.department}</div>
                            <div><strong>Status:</strong> {employee.status}</div>
                            <div><strong>Manager:</strong> {employee.manager}</div>
                            <div><strong>Employment Type:</strong> {employee.employmentType}</div>
                            <div><strong>Start Date:</strong> {employee.attributes.createdAt}</div>
                        </div>
                    </div>
                </div>

                {/* HR METRICS */}
                <div className="col-md-6">
                    <div className="card border p-3 h-100">
                        <h6 className="mb-3">HR Metrics</h6>
                        <div className="small text-muted">
                            <div><strong>Attendance Rate:</strong> 96%</div>
                            <div><strong>Leave Balance:</strong> 12 Days</div>
                            <div><strong>Documents:</strong> 2 Verified / 1 Missing</div>
                            <div><strong>Payroll Status:</strong> Active</div>
                            <div><strong>Last Login:</strong> Today 09:14 AM</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ALERTS */}
            <div className="card border p-3 mt-3">
                <h6 className="mb-3">Alerts</h6>
                <div className="alert alert-warning py-2 small mb-2">
                    Tax form missing
                </div>
                <div className="alert alert-info py-2 small mb-2">
                    Passport expires in 2028
                </div>
                <div className="alert alert-success py-2 small">
                    No compliance issues detected
                </div>
            </div>
        </motion.div>
    )
}