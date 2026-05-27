import { motion } from "framer-motion"
import { GrApps } from "react-icons/gr"

export const InformationSection = () =>{
    return(
        <motion.div
            className="container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center">
                    <GrApps className="text-primary display-1" />
                </div>
            </div>

            {/* TITLE */}
            <div className="text-center mb-4">
                <h4 className="fw-semibold mb-2">
                    About This Enterprise System
                </h4>
                <p className="text-muted small mb-0">
                    A unified digital workspace for modern organizations
                </p>
            </div>

            {/* CONTENT */}
            <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                    <div className="bg-white rounded-4 p-4">
                        <p className="text-muted small lh-lg mb-3">
                            This platform is an enterprise-grade application launcher that centralizes all core business systems into a single interface.
                            It eliminates the need for switching between multiple tools by combining HR, payroll, CRM, projects, invoicing, and support into one unified ecosystem.
                        </p>
                        <p className="text-muted small lh-lg mb-3">
                            The system is designed to improve productivity by ensuring seamless navigation between modules and consistent data flow across departments.
                            Each module is interconnected, reducing duplication of work and improving operational efficiency across the organization.
                        </p>
                        <p className="text-muted small lh-lg mb-0">
                            Built with scalability and security in mind, it supports role-based access control and modular expansion,
                            making it suitable for both small teams and large enterprise environments.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}