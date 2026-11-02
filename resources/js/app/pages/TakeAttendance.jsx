import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/Routes';
import { api } from '../service/Api';

export const TakeAttendance = () => {

    const today = new Date().toISOString().split('T')[0];

    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('1');
    const [attendanceDate, setAttendanceDate] = useState(today);
    const [attendance, setAttendance] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [notes, setNotes] = useState({});
    const [classNotes, setClassNotes] = useState({});
    const [showNotes, setShowNotes] = useState(false);
    const [message, setMessage] = useState('');
    const [students, setStudents] = useState([]);

    const selectedClassName = classes.find((schoolClass) => schoolClass.id === selectedClassId)?.attributes?.name || '';

    const getKey = (studentId) => `${attendanceDate}-${selectedClassId}-${studentId}`;

    const getStatus = (studentId) => attendance[getKey(studentId)] || '';

    const setStudentStatus = (studentId, status) => {
        setAttendance((previous) => ({
            ...previous,
            [getKey(studentId)]: status,
        }));
        setMessage('');
    };

    const setAllStudents = (status) => {
        setAttendance((previous) => {
            const updated = { ...previous };
            students.forEach((student) => updated[getKey(student.id)] = status);
            return updated;
        });

        setMessage('');
    };

    const filteredStudents = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return students.filter((student) => {
            const matchesSearch = student.attributes.fullName.toLowerCase().includes(search) || student.includes(search);
            const status = attendance[getKey(student.id)] || '';

            const matchesStatus =
                filterStatus === 'All' ||
                (filterStatus === 'Unmarked' && !status) ||
                status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [students, searchTerm, filterStatus, attendance, attendanceDate, selectedClassId]);

    const summary = students.reduce((result, student) => {
            const status = getStatus(student.id);

            if (status) {
                result.marked += 1;
                result[status] += 1;
            } else {
                result.unmarked += 1;
            }
            return result;
        },
        {
            Present: 0,
            Absent: 0,
            Late: 0,
            Excused: 0,
            marked: 0,
            unmarked: 0,
        }
    );

    const currentClassNotes = classNotes[`${attendanceDate}-${selectedClassId}`] || '';

    const handleSave = () => {
        if (summary.unmarked > 0) {
            setMessage(`Please mark attendance for all students. ${summary.unmarked} student(s) remain unmarked.`);
            return;
        }

        const records = students.map((student) => ({
            student_id: student.id,
            student_name: student.attributes.name,
            class_id:selectedClassId,
            date: attendanceDate,
            status: getStatus(student.id),
            notes: notes[getKey(student.id)] || '',
        }));

        const attendanceData = {
            class_id: selectedClassId,
            class_name: selectedClassName,
            date: attendanceDate,
            class_notes: currentClassNotes,
            records,
        };

        // Demo only: replace this with your Laravel API request.
        console.log('Attendance data:', attendanceData);

        setMessage(
            'Attendance is complete in this demo. Connect the save handler to your backend to store it permanently.'
        );
    };

    const statusOptions = [
        {
            value: 'Present',
            label: 'Present',
            icon: 'bi-check-circle-fill',
            color: 'success',
        },{
            value: 'Absent',
            label: 'Absent',
            icon: 'bi-x-circle-fill',
            color: 'danger',
        },{
            value: 'Late',
            label: 'Late',
            icon: 'bi-clock-fill',
            color: 'warning',
        },{
            value: 'Excused',
            label: 'Excused',
            icon: 'bi-file-earmark-check-fill',
            color: 'info',
        },
    ];

    const summaryItems = [
        {
            label: 'Present',
            count: summary.Present,
            icon: 'bi-check-circle-fill',
            color: 'success',
        },
        {
            label: 'Absent',
            count: summary.Absent,
            icon: 'bi-x-circle-fill',
            color: 'danger',
        },
        {
            label: 'Late',
            count: summary.Late,
            icon: 'bi-clock-fill',
            color: 'warning',
        },
        {
            label: 'Excused',
            count: summary.Excused,
            icon: 'bi-file-earmark-check-fill',
            color: 'info',
        },
        {
            label: 'Unmarked',
            count: summary.unmarked,
            icon: 'bi-circle',
            color: 'secondary',
        },
    ];

    useEffect(()=>{
        api.get('/class/list').then((response)=>{
            setClasses(response.data.classForms);
        }).catch((error)=>{
            console.log(error)
        });
    }, []);

    useEffect(()=>{
        api.get('/student/list').then((response)=>{
            console.log(response.data.students);
            setStudents(response.data.students);
        }).catch((error)=>{
            console.log(error)
        });
    }, []);

    return (
        <div className="container-fluid py-3 py-md-4">
            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
                        <i className="bi bi-calendar2-check"></i>
                        <span>Attendance</span>
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-primary fw-semibold">Take Attendance</span>
                    </div>

                    <h2 className="fw-bold mb-2">Class Attendance</h2>

                    <p className="text-secondary mb-0">
                        Record attendance, review student status, and add class notes.
                    </p>
                </div>

                <Link to={routes.attendanceHistory} className="btn btn-outline-secondary rounded-3">
                    Attendance History
                </Link>
            </div>

            {message && (
                <div
                    className={`alert ${
                        message.startsWith('Please')
                            ? 'alert-warning'
                            : 'alert-info'
                    } alert-dismissible fade show rounded-3`}
                    role="alert"
                >
                    <i
                        className={`bi ${
                            message.startsWith('Please')
                                ? 'bi-exclamation-triangle'
                                : 'bi-info-circle'
                        } me-2`}
                    ></i>
                    {message}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage('')}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            {/* Class Details */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-3 p-md-4">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '42px', height: '42px' }}>
                            <i className="bi bi-sliders fs-5"></i>
                        </div>

                        <div>
                            <h5 className="fw-bold mb-1">Attendance Details</h5>
                            <p className="text-secondary small mb-0">
                                Choose the class and date for this register.
                            </p>
                        </div>
                    </div>

                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-6 col-xl-4">
                            <label htmlFor="classSelect" className="form-label fw-semibold">
                                Class <span className="text-danger">*</span>
                            </label>

                            <select
                                id="classSelect"
                                className="form-select form-select-lg rounded-3"
                                value={selectedClassId || ''}
                                onChange={(e) => {
                                    setSelectedClassId(e.target.value);
                                    setSearchTerm('');
                                    setFilterStatus('All');
                                    setMessage('');
                                }}
                            >
                                {classes.map((schoolClass) => (
                                    <option value={String(schoolClass.id)} key={schoolClass.id}>
                                        {schoolClass.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-md-6 col-xl-4">
                            <label htmlFor="attendanceDate" className="form-label fw-semibold">
                                Attendance Date <span className="text-danger">*</span>
                            </label>

                            <input
                                id="attendanceDate"
                                type="date"
                                className="form-control form-control-lg rounded-3"
                                value={attendanceDate}
                                max={today}
                                onChange={(e) => {
                                    setAttendanceDate(e.target.value);
                                    setMessage('');
                                }}
                            />
                        </div>

                        <div className="col-12 col-xl-4">
                            <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between gap-3 h-100">
                                <div>
                                    <div className="text-secondary small mb-1">
                                        Students in class
                                    </div>
                                    <div className="fw-bold fs-4">{students.length}</div>
                                </div>

                                <div className="rounded-3 bg-white text-primary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                    <i className="bi bi-people fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Overview */}
            <div className="row g-3 mb-4">
                {summaryItems.map((item) => (
                    <div className="col-6 col-md-4 col-xl" key={item.label}>
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-3">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                    <span className="text-secondary small fw-medium">
                                        {item.label}
                                    </span>

                                    <div className={`rounded-3 bg-${item.color} bg-opacity-10 text-${item.color} d-flex align-items-center justify-content-center`} style={{ width: '36px', height: '36px' }}>
                                        <i className={`bi ${item.icon}`}></i>
                                    </div>
                                </div>

                                <div className="d-flex align-items-baseline gap-2">
                                    <span className="fs-3 fw-bold">{item.count}</span>
                                    <span className="text-secondary small">
                                        / {students.length}
                                    </span>
                                </div>

                                <div className="progress mt-3" style={{ height: '4px' }}>
                                    <div
                                        className={`progress-bar bg-${item.color}`}
                                        role="progressbar"
                                        style={{
                                            width: `${
                                                students.length
                                                    ? (item.count / students.length) * 100
                                                    : 0
                                            }%`,
                                        }}
                                        aria-valuenow={item.count}
                                        aria-valuemin="0"
                                        aria-valuemax={students.length}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Student Register */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-3 p-md-4">
                    <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
                        <div>
                            <h5 className="fw-bold mb-1">Student Register</h5>
                            <p className="text-secondary small mb-0">
                                Select an attendance status for each student.
                            </p>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-success rounded-3"
                                onClick={() => setAllStudents('Present')}
                            >
                                <i className="bi bi-check2-all me-2"></i>
                                <span className="d-none d-sm-inline">Mark All </span>
                                Present
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-3"
                                onClick={() => setAllStudents('')}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>
                                <span className="d-none d-sm-inline">Clear Marks</span>
                                <span className="d-sm-none">Clear</span>
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="row g-2 mb-4">
                        <div className="col-12 col-lg-7">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                                    <i className="bi bi-search text-secondary"></i>
                                </span>

                                <input
                                    type="search"
                                    className="form-control bg-light border-start-0 rounded-end-3"
                                    placeholder="Search by student name or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    aria-label="Search students"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <select
                                className="form-select rounded-3"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                aria-label="Filter students by attendance status"
                            >
                                <option value="All">All Students</option>
                                <option value="Unmarked">Unmarked</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Late">Late</option>
                                <option value="Excused">Excused</option>
                            </select>
                        </div>
                    </div>

                    {/* Student Cards */}
                    <div className="row g-3">
                        {filteredStudents.map((student) => {
                            const status = getStatus(student.id);
                            const selectedOption = statusOptions.find(
                                (option) => option.value === status
                            );

                            return (
                                <div className="col-12 col-md-6 col-xxl-4" key={student.id}>
                                    <div className={`card h-100 rounded-4 ${
                                        status
                                            ? 'border'
                                            : 'border border-warning border-opacity-50'
                                    }`}>
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div
                                                        className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                                        style={{ width: '46px', height: '46px' }}
                                                    >
                                                        {student.attributs.fullName
                                                            .split(' ')
                                                            .map((part) => part[0])
                                                            .slice(0, 2)
                                                            .join('')}
                                                    </div>

                                                    <div>
                                                        <div className="fw-semibold">
                                                            {student.attributs.fullName}
                                                        </div>
                                                        <div className="text-secondary small">
                                                            {student.id}
                                                        </div>
                                                    </div>
                                                </div>

                                                {selectedOption ? (
                                                    <span className={`badge text-bg-${selectedOption.color} rounded-pill`}>
                                                        {selectedOption.label}
                                                    </span>
                                                ) : (
                                                    <span className="badge text-bg-light text-secondary border rounded-pill">
                                                        Unmarked
                                                    </span>
                                                )}
                                            </div>

                                            <div className="small text-secondary mb-2">
                                                Attendance status
                                            </div>

                                            <div className="d-grid grid-template-columns gap-2" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                                                {statusOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        className={`btn btn-sm rounded-3 py-2 ${
                                                            status === option.value
                                                                ? `btn-${option.color}`
                                                                : `btn-outline-${option.color}`
                                                        }`}
                                                        onClick={() =>
                                                            setStudentStatus(student.id, option.value)
                                                        }
                                                        aria-pressed={status === option.value}
                                                    >
                                                        <i className={`bi ${option.icon} me-1`}></i>
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="mt-3">
                                                <label
                                                    htmlFor={`student-note-${student.id}`}
                                                    className="form-label small text-secondary mb-1"
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                    Student note <span className="text-muted">(optional)</span>
                                                </label>

                                                <input
                                                    id={`student-note-${student.id}`}
                                                    type="text"
                                                    className="form-control form-control-sm rounded-3"
                                                    placeholder="Add a note for this student..."
                                                    value={notes[getKey(student.id)] || ''}
                                                    onChange={(e) =>
                                                        setNotes((previous) => ({
                                                            ...previous,
                                                            [getKey(student.id)]: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-5">
                            <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                                <i className="bi bi-search fs-3 text-secondary"></i>
                            </div>

                            <h6 className="fw-bold">No students found</h6>
                            <p className="text-secondary mb-0">
                                Try changing your search or attendance filter.
                            </p>
                        </div>
                    )}
                </div>

                {/* Register Footer */}
                <div className="card-footer bg-light border-0 rounded-bottom-4 p-3 p-md-4">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div>
                            <div className="fw-semibold">
                                {summary.marked} of {students.length} students marked
                            </div>

                            <div className="text-secondary small">
                                {summary.unmarked === 0
                                    ? 'All students have an attendance status.'
                                    : `${summary.unmarked} student(s) still need to be marked.`}
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-3"
                                onClick={() => window.print()}
                            >
                                <i className="bi bi-printer me-2"></i>
                                Print
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary rounded-3"
                                onClick={handleSave}
                            >
                                <i className="bi bi-check2-circle me-2"></i>
                                Save Attendance
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Notes Toggle */}
            <div className="d-flex justify-content-center mt-4 mb-5">
                <button
                    type="button"
                    className={`btn rounded-pill px-4 py-2 shadow-sm ${
                        showNotes
                            ? 'btn-primary'
                            : 'btn-white border bg-white text-secondary'
                    }`}
                    onClick={() => setShowNotes((previous) => !previous)}
                    aria-expanded={showNotes}
                    aria-controls="class-notes-panel"
                >
                    <i className={`bi ${showNotes ? 'bi-journal-x' : 'bi-journal-text'} me-2`}></i>
                    {showNotes ? 'Close Class Notes' : 'Add Class Notes'}
                    {currentClassNotes.trim() && (
                        <i className="bi bi-check-circle-fill ms-2"></i>
                    )}
                </button>
            </div>

            {/* Hidden Bottom Notes Panel */}
            {showNotes && (
                <div
                    id="class-notes-panel"
                    className="position-fixed bottom-0 start-0 end-0 bg-white border-top shadow-lg"
                    style={{ zIndex: 1030, maxHeight: '55vh', overflowY: 'auto' }}
                >
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-xl-10 col-xxl-8">
                                <div className="py-3 py-md-4">
                                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '44px', height: '44px' }}>
                                                <i className="bi bi-journal-text fs-5"></i>
                                            </div>

                                            <div>
                                                <h5 className="fw-bold mb-1">Class Notes</h5>
                                                <p className="text-secondary small mb-0">
                                                    {selectedClassName} · {attendanceDate}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-light rounded-circle"
                                            onClick={() => setShowNotes(false)}
                                            aria-label="Close class notes"
                                            style={{ width: '38px', height: '38px' }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>

                                    <label htmlFor="classNotes" className="form-label fw-semibold">
                                        Notes for this class and date
                                    </label>

                                    <textarea
                                        id="classNotes"
                                        className="form-control rounded-3"
                                        rows="4"
                                        placeholder="Record lesson notes, general attendance observations, follow-up actions, or other relevant information..."
                                        value={currentClassNotes}
                                        onChange={(e) => {
                                            const key = `${attendanceDate}-${selectedClassId}`;

                                            setClassNotes((previous) => ({
                                                ...previous,
                                                [key]: e.target.value,
                                            }));
                                        }}
                                    ></textarea>

                                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
                                        <small className="text-secondary">
                                            <i className="bi bi-info-circle me-1"></i>
                                            Notes are kept separately for each class and date.
                                        </small>

                                        <button
                                            type="button"
                                            className="btn btn-primary rounded-3 px-4"
                                            onClick={() => setShowNotes(false)}
                                        >
                                            <i className="bi bi-check2 me-2"></i>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
