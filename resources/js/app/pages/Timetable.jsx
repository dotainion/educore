import React, { useMemo, useState } from 'react';

export const Timetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const timeSlots = [
        { id: 1, start: '08:00', end: '08:40', label: '8:00 - 8:40 AM' },
        { id: 2, start: '08:40', end: '09:20', label: '8:40 - 9:20 AM' },
        { id: 3, start: '09:20', end: '10:00', label: '9:20 - 10:00 AM' },
        { id: 4, start: '10:00', end: '10:30', label: '10:00 - 10:30 AM', break: true },
        { id: 5, start: '10:30', end: '11:10', label: '10:30 - 11:10 AM' },
        { id: 6, start: '11:10', end: '11:50', label: '11:10 - 11:50 AM' },
        { id: 7, start: '11:50', end: '12:30', label: '11:50 AM - 12:30 PM' },
        { id: 8, start: '12:30', end: '13:10', label: '12:30 - 1:10 PM', break: true },
        { id: 9, start: '13:10', end: '13:50', label: '1:10 - 1:50 PM' },
        { id: 10, start: '13:50', end: '14:30', label: '1:50 - 2:30 PM' },
    ];

    const classes = ['Form 1A', 'Form 1B', 'Form 2A', 'Form 2B', 'Form 3A'];
    const teachers = [
        'All Teachers',
        'Mrs. James',
        'Mr. Charles',
        'Ms. Thomas',
        'Mr. Roberts',
        'Mrs. Williams',
    ];

    const subjects = [
        'Mathematics',
        'English Language',
        'Integrated Science',
        'Social Studies',
        'Information Technology',
        'Physical Education',
        'French',
        'Business Studies',
        'Visual Arts',
        'Agricultural Science',
    ];

    const subjectStyles = {
        Mathematics: 'primary',
        'English Language': 'success',
        'Integrated Science': 'info',
        'Social Studies': 'warning',
        'Information Technology': 'dark',
        'Physical Education': 'danger',
        French: 'secondary',
        'Business Studies': 'primary',
        'Visual Arts': 'success',
        'Agricultural Science': 'warning',
    };

    const initialLessons = [
        { id: 1, day: 'Monday', slot: 1, className: 'Form 1A', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 1' },
        { id: 2, day: 'Monday', slot: 2, className: 'Form 1A', subject: 'English Language', teacher: 'Mr. Charles', room: 'Room 1' },
        { id: 3, day: 'Monday', slot: 3, className: 'Form 1A', subject: 'Integrated Science', teacher: 'Ms. Thomas', room: 'Science Lab' },
        { id: 4, day: 'Monday', slot: 5, className: 'Form 1A', subject: 'French', teacher: 'Mrs. Williams', room: 'Room 1' },
        { id: 5, day: 'Monday', slot: 6, className: 'Form 1A', subject: 'Social Studies', teacher: 'Mr. Roberts', room: 'Room 1' },
        { id: 6, day: 'Monday', slot: 9, className: 'Form 1A', subject: 'Information Technology', teacher: 'Ms. Thomas', room: 'Computer Lab' },
        { id: 7, day: 'Tuesday', slot: 1, className: 'Form 1A', subject: 'English Language', teacher: 'Mr. Charles', room: 'Room 1' },
        { id: 8, day: 'Tuesday', slot: 2, className: 'Form 1A', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 1' },
        { id: 9, day: 'Tuesday', slot: 3, className: 'Form 1A', subject: 'Physical Education', teacher: 'Mr. Roberts', room: 'Playing Field' },
        { id: 10, day: 'Tuesday', slot: 5, className: 'Form 1A', subject: 'Business Studies', teacher: 'Mrs. Williams', room: 'Room 1' },
        { id: 11, day: 'Wednesday', slot: 1, className: 'Form 1A', subject: 'Integrated Science', teacher: 'Ms. Thomas', room: 'Science Lab' },
        { id: 12, day: 'Wednesday', slot: 2, className: 'Form 1A', subject: 'Social Studies', teacher: 'Mr. Roberts', room: 'Room 1' },
        { id: 13, day: 'Wednesday', slot: 5, className: 'Form 1A', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 1' },
        { id: 14, day: 'Thursday', slot: 1, className: 'Form 1A', subject: 'French', teacher: 'Mrs. Williams', room: 'Room 1' },
        { id: 15, day: 'Thursday', slot: 2, className: 'Form 1A', subject: 'English Language', teacher: 'Mr. Charles', room: 'Room 1' },
        { id: 16, day: 'Thursday', slot: 5, className: 'Form 1A', subject: 'Information Technology', teacher: 'Ms. Thomas', room: 'Computer Lab' },
        { id: 17, day: 'Friday', slot: 1, className: 'Form 1A', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 1' },
        { id: 18, day: 'Friday', slot: 2, className: 'Form 1A', subject: 'Business Studies', teacher: 'Mrs. Williams', room: 'Room 1' },

        { id: 19, day: 'Monday', slot: 1, className: 'Form 1B', subject: 'English Language', teacher: 'Mr. Charles', room: 'Room 2' },
        { id: 20, day: 'Monday', slot: 2, className: 'Form 1B', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 2' },
        { id: 21, day: 'Tuesday', slot: 1, className: 'Form 1B', subject: 'Integrated Science', teacher: 'Ms. Thomas', room: 'Science Lab' },
        { id: 22, day: 'Wednesday', slot: 1, className: 'Form 1B', subject: 'French', teacher: 'Mrs. Williams', room: 'Room 2' },
        { id: 23, day: 'Thursday', slot: 1, className: 'Form 1B', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 2' },
        { id: 24, day: 'Friday', slot: 1, className: 'Form 1B', subject: 'Social Studies', teacher: 'Mr. Roberts', room: 'Room 2' },

        { id: 25, day: 'Monday', slot: 1, className: 'Form 2A', subject: 'Social Studies', teacher: 'Mr. Roberts', room: 'Room 3' },
        { id: 26, day: 'Monday', slot: 2, className: 'Form 2A', subject: 'Information Technology', teacher: 'Ms. Thomas', room: 'Computer Lab' },
        { id: 27, day: 'Tuesday', slot: 2, className: 'Form 2A', subject: 'Business Studies', teacher: 'Mrs. Williams', room: 'Room 3' },
        { id: 28, day: 'Wednesday', slot: 2, className: 'Form 2A', subject: 'Mathematics', teacher: 'Mrs. James', room: 'Room 3' },
        { id: 29, day: 'Thursday', slot: 2, className: 'Form 2A', subject: 'Integrated Science', teacher: 'Ms. Thomas', room: 'Science Lab' },
        { id: 30, day: 'Friday', slot: 2, className: 'Form 2A', subject: 'English Language', teacher: 'Mr. Charles', room: 'Room 3' },
    ];

    const [lessons, setLessons] = useState(initialLessons);
    const [selectedClass, setSelectedClass] = useState('Form 1A');
    const [selectedTeacher, setSelectedTeacher] = useState('All Teachers');
    const [selectedDay, setSelectedDay] = useState('All Days');
    const [search, setSearch] = useState('');
    const [view, setView] = useState('week');
    const [showForm, setShowForm] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        day: 'Monday',
        slot: '1',
        className: 'Form 1A',
        subject: 'Mathematics',
        teacher: 'Mrs. James',
        room: 'Room 1',
    });

    const filteredLessons = useMemo(() => lessons.filter((lesson) => {
        const matchesClass = selectedClass === 'All Classes' || lesson.className === selectedClass;
        const matchesTeacher = selectedTeacher === 'All Teachers' || lesson.teacher === selectedTeacher;
        const matchesDay = selectedDay === 'All Days' || lesson.day === selectedDay;
        const searchText = `${lesson.subject} ${lesson.teacher} ${lesson.room} ${lesson.className}`.toLowerCase();
        return matchesClass && matchesTeacher && matchesDay && searchText.includes(search.toLowerCase());
    }), [lessons, selectedClass, selectedTeacher, selectedDay, search]);

    const openAddForm = () => {
        setEditingLesson(null);
        setFormData({
            day: selectedDay === 'All Days' ? 'Monday' : selectedDay,
            slot: '1',
            className: selectedClass === 'All Classes' ? classes[0] : selectedClass,
            subject: subjects[0],
            teacher: 'Mrs. James',
            room: 'Room 1',
        });
        setErrors({});
        setShowForm(true);
    };

    const openEditForm = (lesson) => {
        setEditingLesson(lesson);
        setFormData({
            day: lesson.day,
            slot: String(lesson.slot),
            className: lesson.className,
            subject: lesson.subject,
            teacher: lesson.teacher,
            room: lesson.room,
        });
        setErrors({});
        setShowForm(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const saveLesson = (e) => {
        e.preventDefault();
        const newErrors = {};

        ['day', 'slot', 'className', 'subject', 'teacher', 'room'].forEach((field) => {
            if (!String(formData[field] ?? '').trim()) newErrors[field] = 'This field is required.';
        });

        const slot = Number(formData.slot);
        const conflict = lessons.find((lesson) =>
            lesson.id !== editingLesson?.id &&
            lesson.day === formData.day &&
            lesson.slot === slot &&
            (lesson.className === formData.className || lesson.teacher === formData.teacher || lesson.room === formData.room)
        );

        if (conflict) {
            newErrors.conflict = 'This class, teacher, or room already has a lesson during that time.';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        const record = { ...formData, slot, id: editingLesson?.id ?? Date.now() };
        setLessons((prev) => editingLesson
            ? prev.map((lesson) => lesson.id === editingLesson.id ? record : lesson)
            : [...prev, record]
        );
        setShowForm(false);
        setEditingLesson(null);
    };

    const deleteLesson = (lesson) => {
        if (window.confirm(`Delete ${lesson.subject} for ${lesson.className} on ${lesson.day}?`)) {
            setLessons((prev) => prev.filter((item) => item.id !== lesson.id));
        }
    };

    const lessonAt = (day, slot) => filteredLessons.find((lesson) => lesson.day === day && lesson.slot === slot);

    const getSlotLabel = (slotId) => timeSlots.find((slot) => slot.id === slotId)?.label ?? '';

    const classLessonCount = filteredLessons.length;
    const uniqueSubjects = new Set(filteredLessons.map((lesson) => lesson.subject)).size;
    const uniqueTeachers = new Set(filteredLessons.map((lesson) => lesson.teacher)).size;

    const renderLesson = (lesson) => {
        if (!lesson) return null;

        const color = subjectStyles[lesson.subject] || 'secondary';

        return (
            <div className={`rounded-3 border border-${color}-subtle bg-${color}-subtle p-2 h-100`}>
                <div className="fw-bold small mb-1">{lesson.subject}</div>
                <div className="small text-body-secondary mb-1">
                    <i className="bi bi-person me-1"></i>{lesson.teacher}
                </div>
                <div className="small text-body-secondary">
                    <i className="bi bi-geo-alt me-1"></i>{lesson.room}
                </div>
                <div className="d-flex gap-1 mt-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary py-0 px-2"
                        title="Edit lesson"
                        onClick={() => openEditForm(lesson)}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger py-0 px-2"
                        title="Delete lesson"
                        onClick={() => deleteLesson(lesson)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container-fluid py-4 px-3 px-lg-4">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <div className="text-primary small fw-semibold mb-2">
                        <i className="bi bi-calendar-week me-2"></i>SCHOOL SCHEDULING
                    </div>
                    <h2 className="fw-bold mb-1">Timetable</h2>
                    <p className="text-body-secondary mb-0">
                        Manage class schedules, subjects, teachers, and rooms.
                    </p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}>
                        <i className="bi bi-printer me-2"></i>Print
                    </button>
                    <button type="button" className="btn btn-primary" onClick={openAddForm}>
                        <i className="bi bi-plus-lg me-2"></i>Add Lesson
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Scheduled Lessons', value: classLessonCount, icon: 'bi-calendar2-check', color: 'primary' },
                    { label: 'Subjects', value: uniqueSubjects, icon: 'bi-book', color: 'success' },
                    { label: 'Teachers Assigned', value: uniqueTeachers, icon: 'bi-people', color: 'info' },
                    { label: 'School Days', value: selectedDay === 'All Days' ? 5 : 1, icon: 'bi-calendar3', color: 'warning' },
                ].map((item) => (
                    <div className="col-6 col-xl-3" key={item.label}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className={`rounded-3 bg-${item.color}-subtle text-${item.color} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: '48px', height: '48px' }}>
                                    <i className={`bi ${item.icon} fs-4`}></i>
                                </div>
                                <div>
                                    <div className="small text-body-secondary">{item.label}</div>
                                    <div className="fs-4 fw-bold">{item.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-6 col-xl-3">
                            <label htmlFor="classFilter" className="form-label small fw-semibold">Class / Form</label>
                            <select id="classFilter" className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                <option>All Classes</option>
                                {classes.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <label htmlFor="teacherFilter" className="form-label small fw-semibold">Teacher</label>
                            <select id="teacherFilter" className="form-select" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                                {teachers.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <label htmlFor="dayFilter" className="form-label small fw-semibold">Day</label>
                            <select id="dayFilter" className="form-select" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                <option>All Days</option>
                                {days.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <label htmlFor="timetableSearch" className="form-label small fw-semibold">Search timetable</label>
                            <div className="input-group">
                                <span className="input-group-text bg-body"><i className="bi bi-search"></i></span>
                                <input id="timetableSearch" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Subject, teacher, room..." />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
                        <div className="small text-body-secondary">
                            Showing <strong>{filteredLessons.length}</strong> scheduled lessons
                        </div>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                                setSelectedClass('Form 1A');
                                setSelectedTeacher('All Teachers');
                                setSelectedDay('All Days');
                                setSearch('');
                            }}
                        >
                            <i className="bi bi-arrow-counterclockwise me-1"></i>Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* View Selector */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <div>
                    <h5 className="fw-bold mb-1">{selectedClass === 'All Classes' ? 'All Classes' : selectedClass}</h5>
                    <div className="small text-body-secondary">Weekly schedule · Demo academic timetable</div>
                </div>
                <div className="btn-group" role="group" aria-label="Timetable view">
                    <button type="button" className={`btn ${view === 'week' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setView('week')}>
                        <i className="bi bi-calendar-week me-2"></i>Week
                    </button>
                    <button type="button" className={`btn ${view === 'day' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setView('day')}>
                        <i className="bi bi-calendar-day me-2"></i>Day
                    </button>
                </div>
            </div>

            {/* Weekly Timetable */}
            {view === 'week' && (
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ minWidth: '145px' }}>Time</th>
                                        {days.map((day) => (
                                            <th key={day} className="text-center" style={{ minWidth: '190px' }}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((slot) => (
                                        <tr key={slot.id} className={slot.break ? 'table-light' : ''}>
                                            <th className="small fw-semibold">
                                                {slot.break ? (
                                                    <span className="text-secondary"><i className="bi bi-cup-hot me-2"></i>{slot.label}</span>
                                                ) : (
                                                    <>{slot.start} - {slot.end}</>
                                                )}
                                            </th>
                                            {days.map((day) => (
                                                <td key={`${day}-${slot.id}`} className="p-2" style={{ minWidth: '190px', height: slot.break ? '44px' : '105px' }}>
                                                    {slot.break ? (
                                                        <div className="text-center text-secondary small fw-semibold">
                                                            {slot.id === 4 ? 'Morning Break' : 'Lunch Break'}
                                                        </div>
                                                    ) : renderLesson(lessonAt(day, slot.id))}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredLessons.length === 0 && (
                            <div className="text-center py-5">
                                <i className="bi bi-calendar-x display-5 text-secondary"></i>
                                <h6 className="fw-bold mt-3">No lessons found</h6>
                                <p className="text-body-secondary small mb-0">Try changing your filters or add a lesson.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Daily View */}
            {view === 'day' && (
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        {selectedDay === 'All Days' && (
                            <div className="alert alert-info py-2 small">
                                Select a specific day using the Day filter to view one day's timetable.
                            </div>
                        )}
                        {selectedDay !== 'All Days' && (
                            <>
                                <h6 className="fw-bold mb-3">{selectedDay}'s Lessons</h6>
                                <div className="d-flex flex-column gap-3">
                                    {timeSlots.filter((slot) => !slot.break).map((slot) => {
                                        const lesson = lessonAt(selectedDay, slot.id);
                                        return (
                                            <div key={slot.id} className="row g-3 align-items-stretch">
                                                <div className="col-12 col-md-3 col-lg-2">
                                                    <div className="bg-body-tertiary rounded-3 p-3 h-100">
                                                        <div className="fw-semibold small">{slot.start} - {slot.end}</div>
                                                        <div className="text-body-secondary small">{slot.label}</div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-9 col-lg-10">
                                                    {lesson ? renderLesson(lesson) : (
                                                        <div className="border border-dashed rounded-3 p-3 h-100 text-body-secondary small">
                                                            <i className="bi bi-calendar-plus me-2"></i>Free period
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Subject Legend */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-3">
                    <h6 className="fw-bold mb-3">Subject Legend</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {subjects.map((subject) => {
                            const color = subjectStyles[subject] || 'secondary';
                            return (
                                <span key={subject} className={`badge bg-${color}-subtle text-${color}-emphasis border border-${color}-subtle px-3 py-2`}>
                                    {subject}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Add/Edit Lesson Modal */}
            {showForm && (
                <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow">
                            <form onSubmit={saveLesson}>
                                <div className="modal-header">
                                    <div>
                                        <h5 className="modal-title fw-bold">{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</h5>
                                        <div className="small text-body-secondary">Assign a subject, teacher, class, and time.</div>
                                    </div>
                                    <button type="button" className="btn-close" onClick={() => setShowForm(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errors.conflict && <div className="alert alert-danger py-2 small">{errors.conflict}</div>}
                                    <div className="row g-3">
                                        {[
                                            { name: 'day', label: 'Day', options: days },
                                            { name: 'slot', label: 'Time Slot', options: timeSlots.filter((slot) => !slot.break).map((slot) => ({ value: String(slot.id), label: slot.label })) },
                                            { name: 'className', label: 'Class', options: classes },
                                            { name: 'subject', label: 'Subject', options: subjects },
                                            { name: 'teacher', label: 'Teacher', options: teachers.filter((teacher) => teacher !== 'All Teachers') },
                                        ].map((field) => (
                                            <div className="col-12" key={field.name}>
                                                <label htmlFor={`lesson-${field.name}`} className="form-label fw-semibold">{field.label}</label>
                                                <select
                                                    id={`lesson-${field.name}`}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleFormChange}
                                                    className={`form-select ${errors[field.name] ? 'is-invalid' : ''}`}
                                                >
                                                    <option value="">Select {field.label.toLowerCase()}</option>
                                                    {field.options.map((option) => (
                                                        <option key={typeof option === 'string' ? option : option.value} value={typeof option === 'string' ? option : option.value}>
                                                            {typeof option === 'string' ? option : option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
                                            </div>
                                        ))}
                                        <div className="col-12">
                                            <label htmlFor="lesson-room" className="form-label fw-semibold">Room / Location</label>
                                            <input
                                                id="lesson-room"
                                                name="room"
                                                value={formData.room}
                                                onChange={handleFormChange}
                                                className={`form-control ${errors.room ? 'is-invalid' : ''}`}
                                                placeholder="e.g. Room 1 or Science Lab"
                                            />
                                            {errors.room && <div className="invalid-feedback">{errors.room}</div>}
                                        </div>
                                    </div>
                                    <div className="alert alert-light border small mt-3 mb-0">
                                        <i className="bi bi-info-circle me-2"></i>
                                        The demo checks for class, teacher, and room conflicts in the selected time slot.
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-lg me-2"></i>{editingLesson ? 'Save Changes' : 'Add Lesson'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
