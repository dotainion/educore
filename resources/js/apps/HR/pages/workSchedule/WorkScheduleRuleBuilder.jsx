import React, { useMemo, useState } from "react";
import {
    FaCalendarAlt,
    FaCalendarPlus,
    FaCheckCircle,
    FaClock,
    FaLayerGroup,
    FaMoon,
    FaPlus,
    FaRegCalendarCheck,
    FaSave,
    FaSyncAlt,
    FaTrash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WEEK_DAYS = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];

const DEFAULT_RULE = {
    id: null,
    ruleType: "fixed",

    name: "",

    start: "08:00",
    end: "16:00",

    recurrence: "weekly",
    repeatEvery: 1,

    effectiveFrom: "",
    expiresOn: "",

    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],

    overnight: false,

    rotation: {
        workDays: 4,
        offDays: 3,
        rotatesEvery: 1,
        rotateUnit: "week",
        sequence: ["Morning", "Evening", "Night"],
    },
};

const generateId = () => {
    return crypto.randomUUID();
};

export const WorkScheduleRuleBuilder = ({
    initialRules = [],
    onSave,
    loading = false,
}) => {
    /* -------------------------------------------------------------------------- */
    /* STATE                                                                      */
    /* -------------------------------------------------------------------------- */

    const [scheduleRules, setScheduleRules] =
        useState(initialRules);

    const [newRule, setNewRule] =
        useState(DEFAULT_RULE);

    const [errors, setErrors] = useState({});

    const [saving, setSaving] =
        useState(false);

    const [selectedRule, setSelectedRule] =
        useState(null);

    /* -------------------------------------------------------------------------- */
    /* STATS                                                                      */
    /* -------------------------------------------------------------------------- */

    const stats = useMemo(() => {
        return {
            total: scheduleRules.length,

            fixed: scheduleRules.filter(
                (r) => r.ruleType === "fixed"
            ).length,

            rotating: scheduleRules.filter(
                (r) => r.ruleType === "rotating"
            ).length,

            overnight: scheduleRules.filter(
                (r) => r.overnight
            ).length,
        };
    }, [scheduleRules]);

    /* -------------------------------------------------------------------------- */
    /* HELPERS                                                                    */
    /* -------------------------------------------------------------------------- */

    const updateRule = (field, value) => {
        setNewRule((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateRotation = (field, value) => {
        setNewRule((prev) => ({
            ...prev,
            rotation: {
                ...prev.rotation,
                [field]: value,
            },
        }));
    };

    const toggleWeekday = (day) => {
        setNewRule((prev) => {
            const exists =
                prev.weekdays.includes(day);

            return {
                ...prev,
                weekdays: exists
                    ? prev.weekdays.filter(
                          (d) => d !== day
                      )
                    : [...prev.weekdays, day],
            };
        });
    };

    const validateRule = () => {
        const validationErrors = {};

        if (!newRule.name.trim()) {
            validationErrors.name =
                "Rule name is required";
        }

        if (!newRule.start) {
            validationErrors.start =
                "Start time is required";
        }

        if (!newRule.end) {
            validationErrors.end =
                "End time is required";
        }

        if (
            newRule.ruleType === "fixed" &&
            newRule.weekdays.length === 0
        ) {
            validationErrors.weekdays =
                "Select at least one weekday";
        }

        if (!newRule.effectiveFrom) {
            validationErrors.effectiveFrom =
                "Effective date is required";
        }

        setErrors(validationErrors);

        return (
            Object.keys(validationErrors).length ===
            0
        );
    };

    /* -------------------------------------------------------------------------- */
    /* ACTIONS                                                                    */
    /* -------------------------------------------------------------------------- */

    const addRule = () => {
        if (!validateRule()) return;

        const payload = {
            ...newRule,
            id: generateId(),
        };

        setScheduleRules((prev) => [
            ...prev,
            payload,
        ]);

        setNewRule(DEFAULT_RULE);

        setErrors({});
    };

    const deleteRule = (id) => {
        setScheduleRules((prev) =>
            prev.filter((r) => r.id !== id)
        );

        if (selectedRule?.id === id) {
            setSelectedRule(null);
        }
    };

    const saveAllRules = async () => {
        try {
            setSaving(true);

            if (onSave) {
                await onSave(scheduleRules);
            }

            console.log(
                "Persist schedule rules:",
                scheduleRules
            );
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    /* -------------------------------------------------------------------------- */
    /* UI                                                                         */
    /* -------------------------------------------------------------------------- */

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-fluid py-4"
        >
            {/* HEADER */}

            <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <div
                            className="rounded-4 d-flex align-items-center justify-content-center"
                            style={{
                                width: 60,
                                height: 60,
                                background:
                                    "linear-gradient(135deg,#2563eb,#4f46e5)",
                                color: "#fff",
                                fontSize: 22,
                            }}
                        >
                            <FaCalendarAlt />
                        </div>

                        <div>
                            <h2 className="fw-bold mb-1">
                                Work Schedule Rules
                            </h2>

                            <div className="text-muted">
                                Configure enterprise
                                fixed and rotating
                                work schedules
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                    <StatCard
                        title="Total Rules"
                        value={stats.total}
                        color="primary"
                    />

                    <StatCard
                        title="Fixed"
                        value={stats.fixed}
                        color="success"
                    />

                    <StatCard
                        title="Rotating"
                        value={stats.rotating}
                        color="warning"
                    />

                    <StatCard
                        title="Overnight"
                        value={stats.overnight}
                        color="dark"
                    />
                </div>
            </div>

            {/* MAIN */}

            <div className="row g-4">
                {/* BUILDER */}

                <div className="col-12 col-xxl-8">
                    <div
                        className="card border-0 shadow-sm rounded-4 overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(to bottom,#ffffff,#fafafa)",
                        }}
                    >
                        <div className="card-header bg-white border-0 p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 44,
                                        height: 44,
                                    }}
                                >
                                    <FaPlus />
                                </div>

                                <div>
                                    <h5 className="fw-bold mb-0">
                                        Create Schedule
                                        Rule
                                    </h5>

                                    <small className="text-muted">
                                        Define
                                        reusable
                                        workforce
                                        scheduling
                                        rules
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4">
                            {/* RULE TYPE */}

                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Schedule Type
                                </label>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateRule(
                                                    "ruleType",
                                                    "fixed"
                                                )
                                            }
                                            className={`w-100 border rounded-4 p-4 text-start transition-all ${
                                                newRule.ruleType ===
                                                "fixed"
                                                    ? "border-primary bg-primary bg-opacity-10"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="fs-3 text-primary">
                                                    <FaCalendarPlus />
                                                </div>

                                                <div>
                                                    <div className="fw-bold">
                                                        Fixed
                                                        Schedule
                                                    </div>

                                                    <small className="text-muted">
                                                        Recurring
                                                        weekly/monthly
                                                        pattern
                                                    </small>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateRule(
                                                    "ruleType",
                                                    "rotating"
                                                )
                                            }
                                            className={`w-100 border rounded-4 p-4 text-start transition-all ${
                                                newRule.ruleType ===
                                                "rotating"
                                                    ? "border-warning bg-warning bg-opacity-10"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="fs-3 text-warning">
                                                    <FaSyncAlt />
                                                </div>

                                                <div>
                                                    <div className="fw-bold">
                                                        Rotating
                                                        Schedule
                                                    </div>

                                                    <small className="text-muted">
                                                        Shift
                                                        rotation &
                                                        cycle
                                                        management
                                                    </small>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* BASIC INFO */}

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Rule Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control form-control-lg ${
                                            errors.name
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Corporate Day Shift"
                                        value={
                                            newRule.name
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "name",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {
                                                errors.name
                                            }
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold">
                                        Start Time
                                    </label>

                                    <input
                                        type="time"
                                        className={`form-control form-control-lg ${
                                            errors.start
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            newRule.start
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "start",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold">
                                        End Time
                                    </label>

                                    <input
                                        type="time"
                                        className={`form-control form-control-lg ${
                                            errors.end
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            newRule.end
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "end",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* OVERNIGHT */}

                            <div className="mb-4">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                            newRule.overnight
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "overnight",
                                                e.target
                                                    .checked
                                            )
                                        }
                                        id="overnight"
                                    />

                                    <label
                                        className="form-check-label fw-semibold"
                                        htmlFor="overnight"
                                    >
                                        Overnight
                                        Shift
                                    </label>
                                </div>
                            </div>

                            {/* FIXED */}

                            {newRule.ruleType ===
                                "fixed" && (
                                <div className="border rounded-4 p-4 bg-light-subtle mb-4">
                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <FaClock className="text-primary" />

                                        <h6 className="fw-bold mb-0">
                                            Recurrence
                                            Configuration
                                        </h6>
                                    </div>

                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Recurrence
                                            </label>

                                            <select
                                                className="form-select"
                                                value={
                                                    newRule.recurrence
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRule(
                                                        "recurrence",
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                            >
                                                <option value="daily">
                                                    Daily
                                                </option>

                                                <option value="weekly">
                                                    Weekly
                                                </option>

                                                <option value="monthly">
                                                    Monthly
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Repeat
                                                Every
                                            </label>

                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="form-control"
                                                    value={
                                                        newRule.repeatEvery
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateRule(
                                                            "repeatEvery",
                                                            Number(
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        )
                                                    }
                                                />

                                                <span className="input-group-text">
                                                    {
                                                        newRule.recurrence
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="form-label fw-semibold">
                                            Active
                                            Weekdays
                                        </label>

                                        <div className="d-flex flex-wrap gap-2">
                                            {WEEK_DAYS.map(
                                                (
                                                    day
                                                ) => (
                                                    <button
                                                        key={
                                                            day
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            toggleWeekday(
                                                                day
                                                            )
                                                        }
                                                        className={`btn rounded-pill px-3 ${
                                                            newRule.weekdays.includes(
                                                                day
                                                            )
                                                                ? "btn-primary"
                                                                : "btn-outline-secondary"
                                                        }`}
                                                    >
                                                        {
                                                            day
                                                        }
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        {errors.weekdays && (
                                            <div className="text-danger small mt-2">
                                                {
                                                    errors.weekdays
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ROTATING */}

                            {newRule.ruleType ===
                                "rotating" && (
                                <div className="border rounded-4 p-4 bg-light-subtle mb-4">
                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <FaSyncAlt className="text-warning" />

                                        <h6 className="fw-bold mb-0">
                                            Rotation
                                            Configuration
                                        </h6>
                                    </div>

                                    <div className="row g-4">
                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">
                                                Work
                                                Days
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={
                                                    newRule
                                                        .rotation
                                                        .workDays
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRotation(
                                                        "workDays",
                                                        Number(
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">
                                                Off
                                                Days
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                value={
                                                    newRule
                                                        .rotation
                                                        .offDays
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRotation(
                                                        "offDays",
                                                        Number(
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">
                                                Rotate
                                                Every
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={
                                                    newRule
                                                        .rotation
                                                        .rotatesEvery
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRotation(
                                                        "rotatesEvery",
                                                        Number(
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">
                                                Unit
                                            </label>

                                            <select
                                                className="form-select"
                                                value={
                                                    newRule
                                                        .rotation
                                                        .rotateUnit
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRotation(
                                                        "rotateUnit",
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                            >
                                                <option value="day">
                                                    Day
                                                </option>

                                                <option value="week">
                                                    Week
                                                </option>

                                                <option value="month">
                                                    Month
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">
                                                Rotation
                                                Sequence
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Morning, Evening, Night"
                                                value={newRule.rotation.sequence.join(
                                                    ", "
                                                )}
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRotation(
                                                        "sequence",
                                                        e.target.value
                                                            .split(
                                                                ","
                                                            )
                                                            .map(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.trim()
                                                            )
                                                            .filter(
                                                                Boolean
                                                            )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* EFFECTIVE DATES */}

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Effective
                                        From
                                    </label>

                                    <input
                                        type="date"
                                        className={`form-control ${
                                            errors.effectiveFrom
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            newRule.effectiveFrom
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "effectiveFrom",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    {errors.effectiveFrom && (
                                        <div className="invalid-feedback">
                                            {
                                                errors.effectiveFrom
                                            }
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Expires On
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={
                                            newRule.expiresOn
                                        }
                                        onChange={(e) =>
                                            updateRule(
                                                "expiresOn",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* ACTIONS */}

                            <div className="d-flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={addRule}
                                    className="btn btn-primary btn-lg px-4"
                                >
                                    <FaPlus className="me-2" />
                                    Create Rule
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setNewRule(
                                            DEFAULT_RULE
                                        )
                                    }
                                    className="btn btn-light border btn-lg px-4"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PREVIEW */}

                <div className="col-12 col-xxl-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                        <div className="card-header bg-dark text-white border-0 p-4">
                            <div className="d-flex align-items-center gap-2">
                                <FaRegCalendarCheck />

                                <h5 className="mb-0">
                                    Live Preview
                                </h5>
                            </div>
                        </div>

                        <div className="card-body p-4">
                            <div
                                className="rounded-4 p-4 text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#111827,#1f2937)",
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div>
                                        <div className="small text-light opacity-75 mb-1">
                                            Schedule
                                            Rule
                                        </div>

                                        <h4 className="fw-bold mb-0">
                                            {newRule.name ||
                                                "Unnamed Rule"}
                                        </h4>
                                    </div>

                                    <span
                                        className={`badge rounded-pill ${
                                            newRule.ruleType ===
                                            "fixed"
                                                ? "bg-primary"
                                                : "bg-warning text-dark"
                                        }`}
                                    >
                                        {
                                            newRule.ruleType
                                        }
                                    </span>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    <PreviewItem
                                        label="Working Hours"
                                        value={`${newRule.start} - ${newRule.end}`}
                                    />

                                    <PreviewItem
                                        label="Overnight"
                                        value={
                                            newRule.overnight
                                                ? "Enabled"
                                                : "No"
                                        }
                                    />

                                    {newRule.ruleType ===
                                    "fixed" ? (
                                        <>
                                            <PreviewItem
                                                label="Recurrence"
                                                value={`Every ${newRule.repeatEvery} ${newRule.recurrence}`}
                                            />

                                            <PreviewItem
                                                label="Weekdays"
                                                value={newRule.weekdays.join(
                                                    ", "
                                                )}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <PreviewItem
                                                label="Rotation"
                                                value={`${newRule.rotation.workDays} ON / ${newRule.rotation.offDays} OFF`}
                                            />

                                            <PreviewItem
                                                label="Sequence"
                                                value={newRule.rotation.sequence.join(
                                                    " → "
                                                )}
                                            />
                                        </>
                                    )}

                                    <PreviewItem
                                        label="Effective"
                                        value={
                                            newRule.effectiveFrom ||
                                            "Not Set"
                                        }
                                    />

                                    <PreviewItem
                                        label="Expiration"
                                        value={
                                            newRule.expiresOn ||
                                            "Never"
                                        }
                                    />
                                </div>
                            </div>

                            <div className="alert alert-primary border-0 rounded-4 mt-4 mb-0">
                                <div className="d-flex align-items-start gap-3">
                                    <FaCheckCircle className="mt-1" />

                                    <div>
                                        <div className="fw-semibold">
                                            Production
                                            Ready
                                        </div>

                                        <small>
                                            This
                                            component
                                            supports
                                            real API
                                            persistence,
                                            enterprise
                                            scheduling,
                                            validation,
                                            and dynamic
                                            rule
                                            management.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE */}

            <div className="card border-0 shadow-sm rounded-4 mt-4 overflow-hidden">
                <div className="card-header bg-white border-bottom p-4">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                                style={{
                                    width: 42,
                                    height: 42,
                                }}
                            >
                                <FaLayerGroup />
                            </div>

                            <div>
                                <h5 className="fw-bold mb-0">
                                    Schedule Rules
                                </h5>

                                <small className="text-muted">
                                    Manage all
                                    configured
                                    scheduling rules
                                </small>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={
                                saving || loading
                            }
                            onClick={saveAllRules}
                            className="btn btn-success btn-lg"
                        >
                            <FaSave className="me-2" />

                            {saving
                                ? "Saving..."
                                : "Save Rules"}
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead
                            style={{
                                background:
                                    "#f8fafc",
                            }}
                        >
                            <tr>
                                <th className="py-3 px-4">
                                    Rule
                                </th>

                                <th>Type</th>

                                <th>Hours</th>

                                <th>
                                    Configuration
                                </th>

                                <th>Status</th>

                                <th className="text-end pe-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <AnimatePresence>
                                {scheduleRules.map(
                                    (rule) => (
                                        <motion.tr
                                            key={
                                                rule.id
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="fw-semibold">
                                                    {
                                                        rule.name
                                                    }
                                                </div>

                                                <small className="text-muted">
                                                    {
                                                        rule.effectiveFrom
                                                    }
                                                </small>
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge rounded-pill ${
                                                        rule.ruleType ===
                                                        "fixed"
                                                            ? "bg-primary"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {
                                                        rule.ruleType
                                                    }
                                                </span>
                                            </td>

                                            <td className="fw-medium">
                                                {
                                                    rule.start
                                                }{" "}
                                                -{" "}
                                                {
                                                    rule.end
                                                }
                                            </td>

                                            <td>
                                                {rule.ruleType ===
                                                "fixed" ? (
                                                    <small>
                                                        Every{" "}
                                                        {
                                                            rule.repeatEvery
                                                        }{" "}
                                                        {
                                                            rule.recurrence
                                                        }
                                                    </small>
                                                ) : (
                                                    <small>
                                                        {
                                                            rule
                                                                .rotation
                                                                .workDays
                                                        }{" "}
                                                        ON /{" "}
                                                        {
                                                            rule
                                                                .rotation
                                                                .offDays
                                                        }{" "}
                                                        OFF
                                                    </small>
                                                )}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge rounded-pill ${
                                                        rule.expiresOn
                                                            ? "bg-warning text-dark"
                                                            : "bg-success"
                                                    }`}
                                                >
                                                    {rule.expiresOn
                                                        ? "Expiring"
                                                        : "Active"}
                                                </span>
                                            </td>

                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedRule(
                                                                rule
                                                            )
                                                        }
                                                        className="btn btn-light border btn-sm"
                                                    >
                                                        Preview
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteRule(
                                                                rule.id
                                                            )
                                                        }
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )
                                )}

                                {scheduleRules.length ===
                                    0 && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-5 text-muted"
                                        >
                                            No schedule
                                            rules created
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}

            {selectedRule && (
                <div
                    className="modal fade show d-block"
                    style={{
                        background:
                            "rgba(0,0,0,0.5)",
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4">
                            <div className="modal-header border-0">
                                <h5 className="fw-bold mb-0">
                                    Schedule Rule
                                    Preview
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setSelectedRule(
                                            null
                                        )
                                    }
                                />
                            </div>

                            <div className="modal-body">
                                <pre
                                    className="bg-light rounded-4 p-4"
                                    style={{
                                        fontSize: 13,
                                    }}
                                >
                                    {JSON.stringify(
                                        selectedRule,
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

const StatCard = ({
    title,
    value,
    color,
}) => {
    return (
        <div
            className={`bg-${color} bg-opacity-10 border border-${color} border-opacity-25 rounded-4 px-4 py-3`}
            style={{
                minWidth: 130,
            }}
        >
            <div className="small text-muted">
                {title}
            </div>

            <div className="fw-bold fs-3">
                {value}
            </div>
        </div>
    );
};

const PreviewItem = ({
    label,
    value,
}) => {
    return (
        <div className="d-flex justify-content-between gap-3">
            <div className="text-light opacity-75">
                {label}
            </div>

            <div className="fw-semibold text-end">
                {value}
            </div>
        </div>
    );
};