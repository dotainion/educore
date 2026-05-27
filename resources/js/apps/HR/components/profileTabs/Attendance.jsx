import { motion } from "framer-motion"

export const Attendance = () =>{
    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h6>Attendance</h6>
            <p className="text-muted small">
                Attendance records for this employee (check-ins, hours, shifts).
            </p>
        </motion.div>
    )
}