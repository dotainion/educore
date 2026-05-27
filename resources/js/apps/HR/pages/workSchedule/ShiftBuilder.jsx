import React, { useMemo, useState } from "react";

export const ShiftBuilder = () => {

    const [mode, setMode] = useState('week');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [schedule, setSchedule] = useState({});

    const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const rules = useMemo(() => ([
        {
            id: 'r1',
            name: 'Morning Shift',
            start: '08:00',
            end: '16:00',
            color: '#3b82f6',
            expiresOn: '',
        },{
            id: 'r2',
            name: 'Evening Shift',
            start: '14:00',
            end: '22:00',
            color: '#f59e0b',
            expiresOn: '',
        },{
            id: 'r3',
            name: 'Night Shift',
            start: '22:00',
            end: '06:00',
            color: '#8b5cf6',
            expiresOn: '2026-06-30',
        },
    ]), []);

    const getDates = () => {
        const start = new Date(startDate);
        const count = mode === 'week'
                ? 7
                : mode === 'biweekly'
                    ? 14
                    : 30;

        return Array.from({ length: count }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    const getMonthGrid = () => {
        const start = new Date(startDate);
        const year = start.getFullYear();
        const month = start.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startWeekDay = firstDay.getDay();

        const days = [];

        // padding before month start
        for (let i = 0; i < startWeekDay; i++) {
            days.push(null);
        }
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push(new Date(year, month, d));
        }
        return days;
    };

    const onDragStart = (e, rule) => {
        e.dataTransfer.setData('rule', JSON.stringify(rule));
    };

    const onDrop = (e, date) => {
        const rule = JSON.parse(e.dataTransfer.getData('rule'));
        const dateStr = date.toISOString().split('T')[0];

        setSchedule((prev) => ({
            ...prev,
            [dateStr]: [
                ...(prev[dateStr] || []),
                {
                    id: crypto.randomUUID(),
                    ruleId: rule.id,
                    name: rule.name,
                    start: rule.start,
                    end: rule.end,
                    color: rule.color,
                },
            ],
        }));
    };

    const removeShift = (date, id) => {
        setSchedule((prev) => ({
            ...prev,
            [date]: prev[date].filter((s) => s.id !== id),
        }));
    };

    const renderWeekOrBiweek = () => (
        <div className="row g-2">
            {getDates().map((date) => {
                const key = date.toISOString().split('T')[0];

                return (
                    <div
                        key={key}
                        className="col-md-3"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, date)}
                    >
                        <div className="border rounded p-2 h-100">
                            <strong>{weekDays[date.getDay()]} {key}</strong>
                            {(schedule[key] || []).map((s) => (
                                <div
                                    className="p-2 mb-2 rounded text-white"
                                    style={{ background: s.color }}
                                    key={s.id}
                                >
                                    {s.name}
                                    <br />
                                    <small>{s.start} - {s.end}</small>
                                    <button
                                        onClick={() => removeShift(key, s.id)}
                                        className="btn btn-sm btn-light mt-2"
                                    >
                                        remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderMonth = () => (
        <div className="row g-2">
            {getMonthGrid().map((date, i) => {
                if (!date) {
                    return <div key={i} className="col-md-2 border" />;
                }
                const key = date.toISOString().split('T')[0];
                return (
                    <div
                        key={key}
                        className="col-md-2 border rounded p-2"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, date)}
                    >
                        <strong>{date.getDate()}</strong>
                        {(schedule[key] || []).map((s) => (
                            <div
                                className="small p-1 mt-1 rounded text-white"
                                style={{ background: s.color }}
                                key={s.id}
                            >
                                {s.name}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="container-fluid py-3">
            {/* HEADER */}
            <div className="d-flex gap-2 mb-3">
                <select
                    onChange={(e) => setMode(e.target.value)}
                    className="form-select"
                    value={mode}
                >
                    <option value="week">Week</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="month">Month</option>
                </select>
                <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            {/* RULES */}
            <div className="mb-3 d-flex gap-2 flex-wrap">
                {rules.map((rule) => (
                    <div
                        draggable
                        onDragStart={(e) => onDragStart(e, rule)}
                        className="p-2 border rounded"
                        style={{
                            borderLeft: `5px solid ${rule.color}`,
                            cursor: "grab",
                        }}
                        key={rule.id}
                    >
                        {rule.name}
                    </div>
                ))}
            </div>

            {/* VIEW SWITCH */}
            {mode === 'month' ? renderMonth() : renderWeekOrBiweek()}
        </div>
    );
};