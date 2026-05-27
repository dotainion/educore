import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useEmployeeOnboardingLayout } from "../../../layouts/EmployeeOnboardingLayout";
import { useApi } from "../../../../../global/context/ApiProvider";
import { api } from "../../../../../global/services/Api";
import { useParams } from "react-router-dom";
import { GlobalApiInput } from "../../../../../global/widgets/GlobalApiInput";
import { GlobalApiToggle } from "../../../../../global/widgets/GlobalApiToggle";
import { Tags } from "../../../../../global/components/Tags";
import { CalendarDaysIcon, Check } from "lucide-react";
import { PendingDisplay } from "../../../components/PendingDisplay";

export const ScheduleWorkforceSettings = () => {
    const { listener, to, setLoading } = useEmployeeOnboardingLayout();
    const { throwApiError } = useApi();

    const [pending, setPending] = useState(true);
    
    const params = useParams();

    const [settings, setSettings] = useState({
        eligibleForScheduling: true,
        allowWeekends: false,
        allowNightShifts: true,
        allowOvertime: true,
        maxHoursPerWeek: 40,
        minRestHours: 11,
        maxConsecutiveDays: 5,
        priorityWeight: 5,
        weeklyAvailability: [],
    });

    const update = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const save = async () => {
        setLoading(true);
        const data = {
            ...settings,
            userId: params.userId,
        };

        api.onboarding.scheduleSettings.primarykey('settingsId').set(data).then(()=>{
            to.next(params.userId);
        }).catch((err)=>{
            throwApiError(err);
        }).finally(() => setLoading(false));
    };

    useEffect(()=>{
        api.onboarding.scheduleSettings.find({userId: params.userId}).then((response)=>{
            const settings = response.data.scheduleSettings;
            setSettings({
                settingsId: settings.id,
                eligibleForScheduling: settings.attributes.eligibleForScheduling,
                allowWeekends: settings.attributes.allowWeekends,
                allowNightShifts: settings.attributes.allowNightShifts,
                allowOvertime: settings.attributes.allowOvertime,
                maxHoursPerWeek: settings.attributes.maxHoursPerWeek,
                minRestHours: settings.attributes.minRestHours,
                maxConsecutiveDays: settings.attributes.maxConsecutiveDays,
                priorityWeight: settings.attributes.priorityWeight,
                weeklyAvailability: settings.attributes.weeklyAvailability,
            })
        }).catch((error)=>{
            
        }).finally(() => setPending(false));
    }, []);

    useEffect(() => {
        const unsubscribe = listener("NEXT", ({ off }) => {
            off();
            save();
        });

        return () => unsubscribe();
    }, [settings]);
    
    if(pending) return(
        <PendingDisplay message="Loading shedule settings" />
    )

    return (
        <div className="container-fluid p-1 p-sm-4 min-vh-100">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* HEADER */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <FaClock size={24} className="text-primary" />
                    <div>
                        <h4 className="mb-0">
                            Schedule Settings
                        </h4>
                        <small className="text-muted">
                            Employee scheduling constraints
                        </small>
                    </div>
                </div>

                <div className="row g-4">
                    {/* LEFT */}
                    <div className="col-xl-8">
                        {/* RULES */}
                        <div className="bg-white border rounded-3 p-4 mb-4">
                            <h6 className="mb-3">Scheduling Rules</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <GlobalApiToggle
                                        name="eligibleForScheduling"
                                        checked={settings.eligibleForScheduling}
                                        trailing="Eligible for scheduling"
                                        onChange={(e)=>update('eligibleForScheduling', e.target.checked)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiToggle
                                        name="allowWeekends"
                                        checked={settings.allowWeekends}
                                        trailing="Allow weekends"
                                        onChange={(e)=>update('allowWeekends', e.target.checked)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiToggle
                                        name="allowNightShifts"
                                        checked={settings.allowNightShifts}
                                        trailing="Allow night shifts"
                                        onChange={(e)=>update('allowNightShifts', e.target.checked)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <GlobalApiToggle
                                        name="allowOvertime"
                                        checked={settings.allowOvertime}
                                        trailing="Allow overtime"
                                        onChange={(e)=>update('allowOvertime', e.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LIMITS */}
                        <div className="bg-white border rounded-3 p-4 mb-4">
                            <h6 className="mb-3">Work Limits</h6>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        className="form-control"
                                        type="number"
                                        label="Max Hours / Week"
                                        name="maxHoursPerWeek"
                                        value={settings.maxHoursPerWeek}
                                        onChange={(e)=>update('maxHoursPerWeek', Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        className="form-control"
                                        type="number"
                                        label="Min Rest Hours"
                                        name="minRestHours"
                                        value={settings.minRestHours}
                                        onChange={(e)=>update('minRestHours', Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <GlobalApiInput
                                        type="number"
                                        className="form-control"
                                        label="Max Consecutive Days"
                                        name="maxConsecutiveDays"
                                        value={settings.maxConsecutiveDays}
                                        onChange={(e)=>update('maxConsecutiveDays', Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* WEEKLY AVAILABILITY (FINAL FIX) */}
                        <WeeklyAvailability
                            value={settings.weeklyAvailability}
                            onChange={(val)=>update('weeklyAvailability', val)}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const WeeklyAvailability = ({ value, onChange }) => {
    const [availabilities, setAvailabilities] = useState([]);

    const days = useMemo(()=>[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ], []);

    const update = (copy) =>{
        const copies = [];
        days.forEach((day)=>copy.forEach((avl)=>(avl.day === day) && copies.push(avl)));
        setAvailabilities(copies);
        onChange(copies);
    }

    const updateDay = (day, patch) => {
        update(availabilities.map((v)=>v.day === day ? {...v, ...patch} : v));
    };

    const change = (days) =>{
        update(days.map((day)=>{
            if(availabilities.map((d)=>d.day).includes(day)){
                return availabilities.find((d)=>d.day === day);
            }
            return ({day, type: '', start: '', end: ''});
        }));
    }

    const toggleAll = () =>{
        if(availabilities.length === days.length){
            return change([]);
        }
        change(days);
    }

    useEffect(()=>{
        if(!value) return;
        setAvailabilities(value.map((copy)=>({
            ...copy,
            type: copy.type || '',
            start: copy.start || '',
            end: copy.end || ''
        })));
    }, [value]);

    return (
        <div className="bg-white border rounded-3 p-1 p-sm-4">
            <Tags
                className="mb-4"
                name="weeklyAvailability"
                title={(
                    <div className="d-flex align-items-center">
                        Weekly Availability
                        <button onClick={toggleAll} className="btn btn-sm btn-light ms-3 d-flex align-items-center gap-2">
                            All
                            {availabilities.length === days.length && (
                                <Check className="text-success" size={18} />
                            )}
                        </button>
                    </div>
                )}
                icon={CalendarDaysIcon}
                onChange={change}
                value={value.map((v)=>v.day)}
                tags={days.map((day)=>({
                    title: day,
                    value: day
                }))}
            />

            {/* CONFIGURED DAYS */}
            <div className="d-flex flex-column gap-3">
                {availabilities.map((item) => (
                    <div className="bg-light rounded-3 p-3" key={item.day}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>{item.day}</strong>
                            <select
                                className="form-select form-select-sm w-auto"
                                value={item.type}
                                onChange={(e)=>updateDay(item.day, {type: e.target.value})}
                            >
                                <option value="ALL_DAY">All Day</option>
                                <option value="TIME_RANGE">Time Range</option>
                                <option value="UNAVAILABLE">Unavailable</option>
                            </select>
                        </div>
                        {item.type === 'TIME_RANGE' && (
                            <div className="d-flex gap-2">
                                <div>
                                    <label className="form-label text-muted small mb-1">Start</label>
                                    <input
                                        type="time"
                                        className="form-control form-control-sm"
                                        value={item.start}
                                        onChange={(e)=>updateDay(item.day, {start: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="form-label text-muted small mb-1">End</label>
                                    <input
                                        type="time"
                                        className="form-control form-control-sm"
                                        value={item.end}
                                        onChange={(e)=>updateDay(item.day, {end: e.target.value})}
                                    />
                                </div>
                            </div>
                        )}

                        {item.type === "ALL_DAY" && (
                            <small className="text-muted">
                                Available all day
                            </small>
                        )}
                        {item.type === "UNAVAILABLE" && (
                            <small className="text-danger">
                                Not available
                            </small>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
