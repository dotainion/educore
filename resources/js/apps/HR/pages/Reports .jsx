import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export const Reports = () => {
    const [range, setRange] = useState("monthly");

    // ================= MOCK DATA =================
    const employeeTrend = [
        { month: "Jan", hires: 5, exits: 2 },
        { month: "Feb", hires: 8, exits: 3 },
        { month: "Mar", hires: 12, exits: 4 },
        { month: "Apr", hires: 10, exits: 1 },
        { month: "May", hires: 15, exits: 2 },
    ];

    const deptData = [
        { name: "Eng", value: 45 },
        { name: "HR", value: 10 },
        { name: "Sales", value: 30 },
        { name: "Support", value: 20 },
    ];

    const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

    const kpis = [
        { label: "Employees", value: 128 },
        { label: "New Hires", value: 18 },
        { label: "Exits", value: 4 },
        { label: "Attendance", value: "94%" },
        { label: "Leave Usage", value: "68%" },
        { label: "Payroll", value: "$84,200" },
    ];

    return (
        <div className="container">

            {/* ================= HEADER ================= */}
            <motion.div
                className="d-flex justify-content-between align-items-center mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >

                {/* LEFT */}
                <div>
                    <h4 className="fw-semibold mb-0">HR Reports</h4>
                    <div className="text-muted small">
                        Workforce analytics & performance insights
                    </div>
                </div>

                {/* RIGHT CONTROLS */}
                <div className="d-flex align-items-center gap-2">

                    <select
                        className="form-select form-select-sm"
                        style={{ width: "140px" }}
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>

                    <button className="btn btn-primary btn-sm">
                        Export
                    </button>

                </div>

            </motion.div>

            {/* ================= KPI CARDS ================= */}
            <div className="row g-3 mb-3">

                {kpis.map((k, i) => (
                    <motion.div
                        key={k.label}
                        className="col-6 col-md-4 col-lg-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="card border text-center p-3 h-100">

                            <div className="text-muted small">{k.label}</div>
                            <div className="fs-5 fw-semibold">{k.value}</div>

                        </div>
                    </motion.div>
                ))}

            </div>

            {/* ================= CHARTS ================= */}
            <div className="row g-3">

                {/* LINE CHART */}
                <div className="col-lg-8">
                  <motion.div
                    className="card border p-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                        <h6 className="mb-3">Hiring vs Exits Trend</h6>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={employeeTrend}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="hires"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="exits"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>

                    </motion.div>
                </div>

                {/* PIE CHART */}
                <div className="col-lg-4">
                    <motion.div
                        className="card border p-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h6 className="mb-3">Department Distribution</h6>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >
                                    {deptData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                    </motion.div>
                </div>

                {/* BAR CHART */}
                <div className="col-12">
                    <motion.div
                        className="card border p-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                      <h6 className="mb-3">Department Performance</h6>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={deptData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>

                    </motion.div>
                </div>

            </div>

        </div>
    );
};