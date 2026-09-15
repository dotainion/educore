import React, { useMemo, useState } from "react";
import { FaCalendarAlt, FaUsers, FaLayerGroup, FaCheckCircle, FaExclamationTriangle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import scrollGridPlugin from "@fullcalendar/scrollgrid";

export const WorkforceCalendarView = () => {
    /* ---------------------------------------------------------------- */
    /* RESOURCES                                                        */
    /* ---------------------------------------------------------------- */

    const [employees] = useState([
        {
            id: "EMP-001",
            title: "Olivia Martin",
            department: "Operations",
        },

        {
            id: "EMP-002",
            title: "Daniel James",
            department: "Engineering",
        },

        {
            id: "EMP-003",
            title: "Sophia Brown",
            department: "Support",
        },

        {
            id: "EMP-004",
            title: "Michael Lee",
            department: "Operations",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* EVENTS                                                           */
    /* ---------------------------------------------------------------- */

    const [events, setEvents] = useState([
        {
            id: "EV-001",

            resourceId: "EMP-001",

            title: "Morning Shift",

            start: "2026-05-11T08:00:00",

            end: "2026-05-11T16:00:00",

            backgroundColor: "#0d6efd",

            borderColor: "#0d6efd",
        },

        {
            id: "EV-002",

            resourceId: "EMP-002",

            title: "Night Rotation",

            start: "2026-05-11T22:00:00",

            end: "2026-05-12T06:00:00",

            backgroundColor: "#212529",

            borderColor: "#212529",
        },

        {
            id: "EV-003",

            resourceId: "EMP-004",

            title: "Support Coverage",

            start: "2026-05-13T09:00:00",

            end: "2026-05-13T17:00:00",

            backgroundColor: "#198754",

            borderColor: "#198754",
        },
    ]);

    /* ---------------------------------------------------------------- */
    /* STATE                                                            */
    /* ---------------------------------------------------------------- */

    const [selectedEvent, setSelectedEvent] =
        useState(null);

    /* ---------------------------------------------------------------- */
    /* STATS                                                            */
    /* ---------------------------------------------------------------- */

    const stats = useMemo(() => {
        return {
            employees: employees.length,

            assignments: events.length,

            uncovered:
                employees.length - 3 > 0
                    ? employees.length - 3
                    : 0,
        };
    }, [employees, events]);

    /* ---------------------------------------------------------------- */
    /* HANDLERS                                                         */
    /* ---------------------------------------------------------------- */

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    const handleEventDrop = (info) => {
        const updatedEvents = events.map((e) =>
            e.id === info.event.id
                ? {
                      ...e,

                      start: info.event.start,

                      end: info.event.end,
                  }
                : e
        );

        setEvents(updatedEvents);
    };

    const handleDateSelect = (selectionInfo) => {
        const title = prompt(
            "Enter schedule name"
        );

        if (!title) return;

        const newEvent = {
            id: `EV-${Date.now()}`,

            resourceId:
                selectionInfo.resource?.id,

            title,

            start: selectionInfo.startStr,

            end: selectionInfo.endStr,

            backgroundColor: "#0d6efd",

            borderColor: "#0d6efd",
        };

        setEvents((prev) => [
            ...prev,
            newEvent,
        ]);
    };

    /* ---------------------------------------------------------------- */
    /* UI                                                               */
    /* ---------------------------------------------------------------- */

    return (
        <motion.div
            className="container-fluid p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* HEADER */}
            <div className="mb-4">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                    <div>
                        <h4 className="mb-1 d-flex align-items-center gap-2">
                            <FaCalendarAlt className="text-primary" />

                            Workforce Calendar
                        </h4>

                        <small className="text-muted">
                            Operational workforce
                            scheduling and resource
                            planning calendar
                        </small>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <span className="badge bg-dark">Employees:{' '}{stats.employees}</span>
                        <span className="badge bg-primary">Assignments:{' '}{stats.assignments}</span>
                        <span className="badge bg-warning text-dark">Uncovered:{' '}{stats.uncovered}</span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* CALENDAR */}
                <div className="col-12 col-xl-9">
                    <div className="bg-white border rounded shadow-sm p-3">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                resourceTimelinePlugin,
                                scrollGridPlugin,
                            ]}
                            initialView="resourceTimelineWeek"
                            height="auto"
                            editable={true}
                            selectable={true}
                            resourceAreaWidth="220px"
                            resources={employees}
                            events={events}
                            eventClick={handleEventClick}
                            eventDrop={handleEventDrop}
                            select={handleDateSelect}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'resourceTimelineDay,resourceTimelineWeek,dayGridMonth',
                            }}
                            slotMinTime="00:00:00"
                            slotMaxTime="24:00:00"
                            nowIndicator={true}
                            weekends={true}
                            resourceAreaHeaderContent="Employees"
                        />
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-12 col-xl-3">
                    {/* DETAILS */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaLayerGroup />
                            <h5 className="mb-0">Schedule Details</h5>
                        </div>
                        {!selectedEvent ? (
                            <div className="text-muted small">
                                Select a schedule
                                assignment to view
                                details
                            </div>
                        ) : (
                            <div>
                                <div className="fw-semibold fs-5 mb-2">{selectedEvent.title}</div>
                                <div className="small mb-2">
                                    <FaUsers className="me-2" />
                                    Employee:{' '}
                                    {employees.find((e) => e.id === selectedEvent.extendedProps.resourceId)?.title}
                                </div>
                                <div className="small mb-2">
                                    <FaClock className="me-2" />
                                    {selectedEvent.start?.toLocaleString()}
                                </div>
                                <div className="small mb-3">
                                    <FaClock className="me-2" />
                                    {selectedEvent.end?.toLocaleString()}
                                </div>
                                <div className="alert alert-success small mb-0">
                                    <FaCheckCircle className="me-2" />
                                    Schedule assignment active
                                </div>
                            </div>
                        )}
                    </div>

                    {/* COVERAGE */}
                    <div className="bg-white border rounded shadow-sm p-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaExclamationTriangle />
                            <h5 className="mb-0">Coverage Alerts</h5>
                        </div>
                        <div className="border rounded p-2 mb-2">
                            <div className="fw-semibold small">Night Shift Coverage</div>
                            <div className="small text-muted">2 employees missing on Friday</div>
                        </div>
                        <div className="border rounded p-2">
                            <div className="fw-semibold small">Weekend Staffing</div>
                            <div className="small text-muted">Low staffing detected on Sunday</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};