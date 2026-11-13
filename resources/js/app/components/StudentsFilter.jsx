
import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../widgets/Dropdown';
import { AcademicYear } from './AcademicYear';
import { api } from '../service/Api';

export const StudentsFilter = ({ onChange }) => {
    const [forms, setForms] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchType, setSearchType] = useState('name');
    const [name, setName] = useState('');
    const [academicYearId, setAcademicYearId] = useState('');
    const [classId, setClassId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [classLoading, setClassLoading] = useState(false);
    const [studentLoading, setStudentLoading] = useState(false);

    const timeoutRef = useRef();

    const typeChange = (type) => {
        setSearchType(type);
        setName('');
        setAcademicYearId('');
        setClassId('');
        setStudentId('');
    };

    const yearChange = (value) => {
        fetchClass({academicYear: value})
        setAcademicYearId(value);
        setClassId('');
        setStudentId('');
    };

    const formChange = (value) => {
        fetchStudents({form: value});
        setClassId(value);
        setStudentId('');
    };

    const search = (value) => {
        setName(value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            fetchStudents({firstName: value});
        }, 500);
    };

    const fetchClass = (data=null) =>{
        setClassLoading(true);
        api.get('/class/list', {params: data}).then((response)=>{
            setForms(response.data.classForms);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setClassLoading(false));
    }

    const fetchStudents = (data=null) =>{
        setStudentLoading(true);
        api.get('/student/list', {params: data}).then((response)=>{
            setStudents(response.data.students);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>setStudentLoading(false));
    }

    useEffect(()=>{
        fetchClass();
    }, []);

    return (
        <div className="">

            <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3">
                    <i className="bi bi-search text-primary fs-5"></i>
                </div>
                <div>
                    <h5 className="fw-semibold mb-1">Find Student Records</h5>
                    <p className="text-secondary small mb-0">Select a search method to find student records.</p>
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label fw-semibold small">Search by</label>
                <div className="d-flex flex-wrap gap-2">
                    {[
                        { value: 'name', label: 'Student Name', icon: 'bi-person' },
                        { value: 'form', label: 'Form', icon: 'bi-people' },
                        { value: 'academicYear', label: 'Academic Year', icon: 'bi-calendar3' }
                    ].map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => typeChange(option.value)}
                            className={`btn btn-sm rounded-3 px-3 ${
                                searchType === option.value
                                    ? 'btn-primary'
                                    : 'btn-outline-secondary'
                            }`}
                        >
                            <i className={`bi ${option.icon} me-2`}></i>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic search fields */}
            <div className="row g-3 align-items-end">

                {searchType === 'name' && (
                    <div className="col-12">
                        <label className="form-label fw-medium">
                            Student Name
                        </label>

                        <div className="input-group">
                            <span className="input-group-text bg-body-tertiary">
                                <i className="bi bi-person text-secondary"></i>
                            </span>

                            <input
                                type="search"
                                className="form-control"
                                placeholder="Enter student name..."
                                value={name}
                                onChange={e => search(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {searchType === 'form' && (
                    <>
                        <div className="col-md-6">
                            <label className="form-label fw-medium">
                                Select Form
                            </label>
                            <Dropdown
                                className="form-control"
                                placeholder="Choose a class"
                                as="select"
                                value={classId}
                                loading={classLoading}
                                onChange={e => formChange(e.value)}
                                options={forms.map((a)=>({label: a.attributes.name, value: a.id}))}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-medium">
                                Student
                            </label>
                            <Dropdown
                                className="form-control"
                                placeholder="Choose a student"
                                as="select"
                                value={studentId}
                                disabled={!classId}
                                loading={studentLoading}
                                onChange={e => setStudentId(e.value)}
                                options={students.map((a)=>({label: a.attributes.fullName, value: a.id}))}
                            />
                        </div>
                    </>
                )}

                {searchType === 'academicYear' && (
                    <>
                        <div className="col-md-4">
                            <label className="form-label fw-medium">
                                Academic Year
                            </label>
                            <AcademicYear
                                value={academicYearId}
                                onChange={(option) => yearChange(option.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-medium">
                                Form
                            </label>
                            <Dropdown
                                className="form-control"
                                placeholder="Choose a class"
                                as="select"
                                value={classId}
                                disabled={!academicYearId}
                                loading={classLoading}
                                onChange={e => formChange(e.value)}
                                options={forms.map((a)=>({label: a.attributes.name, value: a.id}))}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-medium">
                                Student
                            </label>
                            <Dropdown
                                className="form-control"
                                placeholder="Choose a student"
                                as="select"
                                value={studentId}
                                disabled={!classId}
                                loading={studentLoading}
                                onChange={e => setStudentId(e.value)}
                                options={students.map((a)=>({label: a.attributes.fullName, value: a.id}))}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
