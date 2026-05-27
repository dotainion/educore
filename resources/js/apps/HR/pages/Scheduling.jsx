import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Scheduling = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const [schedules] = useState([
        { id: 1, date: "2026-04-05", title: "Interview - John Doe", time: "10:00 AM" },
        { id: 2, date: "2026-04-12", title: "Technical Interview - Jane", time: "02:00 PM" },
        { id: 3, date: "2026-04-12", title: "HR Screening - Mark", time: "04:00 PM" },
        { id: 4, date: "2026-04-18", title: "Final Interview - Sarah", time: "11:00 AM" },
    ]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const monthName = currentDate.toLocaleString("default", { month: "long" });

    const changeMonth = (offset) => {
        setCurrentDate(new Date(year, month + offset, 1));
        setSelectedDay(null);
    };

    const getDateString = (day) => {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    // FIXED: string-based filtering (no Date bugs)
    const schedulesForMonth = useMemo(() => {
        const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
        return schedules.filter(s => s.date.startsWith(prefix));
    }, [month, year, schedules]);

    const schedulesForDay = (day) => {
        const date = getDateString(day);
        return schedules.filter(s => s.date === date);
    };

    const hasSchedule = (day) => {
        return schedules.some(s => s.date === getDateString(day));
    };

    return (
        <div className="container-fluid scheduling-panel">

            {/* HEADER */}
            <h4 className="fw-semibold mb-0">Scheduling</h4>
            <div className="text-muted small mb-3">
                Manage interviews and recruitment schedules
            </div>

            {/* MONTH HEADER */}
            <div className="card shadow-sm mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => changeMonth(-1)}
                    >
                        ← Prev
                    </button>

                    <h6 className="mb-0 fw-bold">
                        {monthName} {year}
                    </h6>

                    <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => changeMonth(1)}
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* CALENDAR */}
            <div className="card mb-3">
                <div className="card-body">

                    {/* WEEK DAYS */}
                    <div className="calendar-grid week-header mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                            <div key={d} className="text-center small fw-semibold text-muted">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* DAYS GRID */}
                    <div className="calendar-grid">
                        {/* EMPTY CELLS */}
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                            <div key={"empty-" + i}></div>
                        ))}

                        {/* DAYS */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isSelected = selectedDay === day;
                            const hasEvent = hasSchedule(day);

                            return (
                                <motion.div
                                    key={day}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedDay(day)}
                                    className={`calendar-day p-2 text-center rounded position-relative
                                        ${isSelected ? "bg-primary text-white" : "bg-light"}
                                        ${hasEvent ? "border border-warning" : ""}
                                    `}
                                    style={{ cursor: "pointer", minHeight: "45px" }}
                                >
                                    {day}

                                    {hasEvent && (
                                        <span className="dot-indicator"></span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* SELECTED DAY */}
            {selectedDay && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card mb-3"
                >
                    <div className="card-header bg-white fw-semibold">
                        {monthName} {selectedDay} Schedule
                    </div>

                    <div className="card-body">
                        {schedulesForDay(selectedDay).length > 0 ? (
                            schedulesForDay(selectedDay).map(s => (
                                <div key={s.id} className="border-bottom py-2">
                                    <div className="fw-semibold">{s.title}</div>
                                    <small className="text-muted">{s.time}</small>
                                </div>
                            ))
                        ) : (
                            <div className="text-muted small">
                                No schedules for this day
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* MONTH LIST */}
            <div className="card mb-5">
                <div className="card-header bg-white fw-semibold">
                    Monthly Schedules
                </div>

                <div className="card-body">
                    <AnimatePresence>
                        {schedulesForMonth.length > 0 ? (
                            schedulesForMonth.map((s, index) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="border-bottom py-2"
                                >
                                    <div className="fw-semibold">{s.title}</div>
                                    <small className="text-muted">
                                        {s.date} • {s.time}
                                    </small>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-muted small">
                                No schedules for this month
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};