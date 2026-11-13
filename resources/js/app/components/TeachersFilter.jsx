
import React, { useState } from 'react';
import { Dropdown } from '../widgets/Dropdown';
import { AcademicYear } from './AcademicYear';

export const TeachersFilter = ({
    forms = [],
    teachers = [],
    onSearch
}) => {
    const [searchType, setSearchType] = useState('name');
    const [name, setName] = useState('');
    const [academicYearId, setAcademicYearId] = useState('');
    const [classId, setClassId] = useState('');

    // Forms belonging to the selected academic year
    const filteredForms = forms.filter(
        form => !academicYearId ||
            String(form.academicYearId) === String(academicYearId)
    );

    const handleTypeChange = (type) => {
        setSearchType(type);
        setName('');
        setAcademicYearId('');
        setClassId('');
    };

    const handleYearChange = (value) => {
        setAcademicYearId(value);
        setClassId('');
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const filters = {
            type: searchType,
            name: searchType === 'name' ? name.trim() : '',
            academicYearId: searchType === 'academicYear'
                ? academicYearId : '',
            classId: searchType === 'name' ? '' : classId
        };

        onSearch?.(filters);
    };

    return (
        <div>
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3">
                    <i className="bi bi-search text-primary fs-5"></i>
                </div>

                <div>
                    <h5 className="fw-semibold mb-1">
                        Find Teacher Records
                    </h5>
                    <p className="text-secondary small mb-0">
                        Select a search method to find teacher records.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSearch}>

                {/* Search Type */}
                <div className="mb-4">
                    <label className="form-label fw-semibold small">
                        Search by
                    </label>

                    <div className="d-flex flex-wrap gap-2">
                        {[
                            {
                                value: 'name',
                                label: 'Teacher Name',
                                icon: 'bi-person'
                            },{
                                value: 'form',
                                label: 'Class',
                                icon: 'bi-people'
                            },{
                                value: 'academicYear',
                                label: 'Academic Year',
                                icon: 'bi-calendar3'
                            }
                        ].map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleTypeChange(option.value)}
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

                {/* Dynamic Search Fields */}
                <div className="row g-3 align-items-end">

                    {/* Search by Teacher Name */}
                    {searchType === 'name' && (
                        <div className="col-12">
                            <label className="form-label fw-medium">
                                Teacher Name
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-body-tertiary">
                                    <i className="bi bi-person text-secondary"></i>
                                </span>

                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Enter teacher name..."
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Search by Class */}
                    {searchType === 'form' && (
                        <div className="col-12">
                            <label className="form-label fw-medium">
                                Select Class
                            </label>
                            <Dropdown
                                className="form-control"
                                placeholder="Choose a class"
                                as="select"
                                value={classId}
                                onChange={e => setClassId(e.target.value)}
                                options={forms.map((a)=>({label: a.attributes.name, value: a.id}))}
                            />
                        </div>
                    )}

                    {/* Search by Academic Year */}
                    {searchType === 'academicYear' && (
                        <>
                            <div className="col-md-6">
                                <label className="form-label fw-medium">
                                    Academic Year
                                </label>
                                <AcademicYear
                                    value={academicYearId}
                                    onChange={(option) => yearChange(option.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-medium">
                                    Class
                                </label>
                                <Dropdown
                                    className="form-control"
                                    placeholder="All classes"
                                    as="select"
                                    value={classId}
                                    disabled={!academicYearId}
                                    onChange={e => setClassId(e.target.value)}
                                    options={filteredForms.map((a)=>({label: a.attributes.name, value: a.id}))}
                                />
                            </div>
                        </>
                    )}

                </div>
            </form>
        </div>
    );
};
