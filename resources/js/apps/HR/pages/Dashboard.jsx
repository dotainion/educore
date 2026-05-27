import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";
import { motion } from "framer-motion";

const pipelineData = [
    { stage: "Applicants", count: 240 },
    { stage: "Screening", count: 140 },
    { stage: "Interview", count: 80 },
    { stage: "Offer", count: 35 },
    { stage: "Hired", count: 20 },
];

const documentData = [
    { name: "Inbox", value: 40 },
    { name: "Verification", value: 25 },
    { name: "Compliance", value: 15 },
    { name: "Approved", value: 50 },
];

const hiringTrend = [
    { month: "Jan", hires: 5 },
    { month: "Feb", hires: 8 },
    { month: "Mar", hires: 6 },
    { month: "Apr", hires: 12 },
    { month: "May", hires: 9 },
];

const workloadData = [
    { name: "HR Team A", tasks: 12 },
    { name: "HR Team B", tasks: 8 },
    { name: "HR Team C", tasks: 15 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export const Dashboard = () => {
    return (
        <div className="container">

            {/* HEADER */}
            <div className="mb-3">
                <h4 className="fw-semibold">HR Dashboard</h4>
                <div className="text-muted small">
                    Recruitment, onboarding, documents, compliance & analytics
                </div>
            </div>

            {/* ALERT STRIP */}
            <div className="alert alert-warning py-2 small mb-3">
                ⚠ 3 documents overdue verification • 2 candidates stuck in screening • 1 compliance risk detected
            </div>

            {/* KPI CARDS */}
            <div className="row g-3 mb-3">

                {[
                    { label: "Total Applicants", value: 240 },
                    { label: "Active Hires", value: 32 },
                    { label: "Pending Documents", value: 55 },
                    { label: "Onboarding", value: 18 },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        className="col-6 col-sm-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="card border-0 shadow-sm p-3 text-center h-100">
                            <div className="text-muted small">{kpi.label}</div>
                            <div className="fs-4 fw-semibold">{kpi.value}</div>
                        </div>
                    </motion.div>
                ))}

            </div>

            {/* INSIGHTS ROW */}
            <div className="row g-3 mb-3">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 h-100">
                        <h6 className="fw-semibold">Hiring Efficiency</h6>
                        <div className="text-success fw-semibold">+18% faster hiring</div>
                        <div className="text-muted small">Compared to last month</div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 h-100">
                        <h6 className="fw-semibold">Drop-off Rate</h6>
                        <div className="text-danger fw-semibold">32%</div>
                        <div className="text-muted small">Candidates lost in screening</div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 h-100">
                        <h6 className="fw-semibold">Avg Time to Hire</h6>
                        <div className="fw-semibold">9.4 days</div>
                        <div className="text-muted small">Target: 7 days</div>
                    </div>
                </div>

            </div>

            {/* CHARTS */}
            <div className="row g-3">

                {/* PIPELINE */}
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold mb-3">Recruitment Pipeline</h6>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={pipelineData}>
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366f1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* DOCUMENTS */}
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold mb-3">Document Workflow</h6>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={documentData} dataKey="value" outerRadius={90}>
                                {documentData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* HIRING TREND */}
                <div className="col-md-12">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold mb-3">Hiring Trend</h6>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={hiringTrend}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line dataKey="hires" stroke="#22c55e" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* WORKLOAD + ACTIONS */}
            <div className="row g-3 mt-3">

                {/* WORKLOAD */}
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold">HR Team Workload</h6>

                        {workloadData.map((w, i) => (
                            <div key={i} className="d-flex justify-content-between small py-1">
                                <span>{w.name}</span>
                                <span className="fw-semibold">{w.tasks} tasks</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold">Quick Actions</h6>

                        <button className="btn btn-primary btn-sm w-100 mb-2">
                            + Add Candidate
                        </button>

                        <button className="btn btn-outline-dark btn-sm w-100 mb-2">
                            Review Pending Documents
                        </button>

                        <button className="btn btn-outline-success btn-sm w-100 mb-2">
                            Move Stuck Candidates
                        </button>

                        <button className="btn btn-outline-warning btn-sm w-100">
                            Run Compliance Check
                        </button>
                    </div>
                </div>

            </div>

            {/* ACTIVITY FEED */}
            <div className="row g-3 mt-3">

                <div className="col-md-12">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="fw-semibold">Live Activity</h6>

                        {[
                            "Sarah moved to Interview stage",
                            "Passport document flagged for verification",
                            "Michael completed onboarding",
                            "Compliance check completed for 3 employees",
                            "New applicant batch imported",
                        ].map((a, i) => (
                            <div key={i} className="small text-muted py-1">
                                • {a}
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </div>
    );
};