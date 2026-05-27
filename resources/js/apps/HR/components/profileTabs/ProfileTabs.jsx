import { useMemo, useState } from "react"
import { Attendance } from "./Attendance"
import { Documents } from "./Documents"
import { Leave } from "./Leave"
import { Overview } from "./Overview"
import { Payroll } from "./Payroll"

export const ProfileTabs = ({ employee }) =>{
    const [tab, setTab] = useState('overview');

    const tabs = useMemo(()=>[
        'overview',
        'documents',
        'attendance',
        'leave',
        'payroll',
    ], []);

    if(!employee) return null;

    return(
        <div className="card border-0">
            <div className="d-flex flex-wrap gap-2 border-bottom p-3">
                {tabs.map((t) => (
                    <button
                        onClick={()=>setTab(t)}
                        className={`btn btn-sm btn-${tab === t ? 'primary' : 'light'}`}
                        key={t}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}

            </div>

            <div className="py-4">
                {tab === 'overview' && <Overview employee={employee} />}
                {tab === 'documents' && <Documents />}
                {tab === 'attendance' && <Attendance />}
                {tab === 'leave' && <Leave />}
                {tab === 'payroll' && <Payroll />}
            </div>
        </div>
    )
}