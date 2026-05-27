import { motion } from "framer-motion"

export const Payroll = () =>{
    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h6>Payroll</h6>
            <p className="text-muted small">
                Salary, deductions, bonuses, and payment history.
            </p>
        </motion.div>
    )
}