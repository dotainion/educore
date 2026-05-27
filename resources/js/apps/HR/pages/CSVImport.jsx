import React, { useMemo, useRef, useState } from "react";
import { FaCheckCircle, FaDownload, FaExclamationTriangle, FaEye, FaFileCsv, FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { DropZone } from "../components/Dropzone";

const REQUIRED_COLUMNS = [
    'firstName',
    'lastName',
    'email',
];

const ALL_COLUMNS = [
    'firstName',
    'lastName',
    'email',
    'gender',
    'contact',
    'department',
    'role',
    'dob',
    'status',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseCSVLine = (line) => {
    return line.split(',').map((v) => v.trim());
};

const downloadCSVTemplate = () => {
    const sample = [
        ALL_COLUMNS.join(','),
        [
            'John',
            'Doe',
            'john@example.com',
            'Male',
            '555-2222',
            '555-9999',
            'Engineering',
            'Developer',
            '1998-02-12',
            'active',
        ].join(','),
    ].join("\n");

    const blob = new Blob([sample], {type: 'text/csv;charset=utf-8;'});

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute(
        'download',
        'employee_import_template.csv'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const CSVImport = () => {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importComplete, setImportComplete] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const fileInputRef = useRef();

    const validateRows = (parsedRows) => {
        const errors = [];
        const emailTracker = new Set();

        parsedRows.forEach((row, index) => {
            const rowErrors = [];

            REQUIRED_COLUMNS.forEach((field) => {
                if (!row[field]) {
                    rowErrors.push(`${field} is required`);
                }
            });

            if (row.email && !EMAIL_REGEX.test(row.email)) {
                rowErrors.push('Invalid email format');
            }
            if (row.email && emailTracker.has(row.email)) {
                rowErrors.push('Duplicate email');
            }

            emailTracker.add(row.email);
            if (rowErrors.length) {
                errors.push({
                    row: index + 2,
                    errors: rowErrors,
                });
            }
        });

        return errors;
    };

    const processCSV = async (uploadedFile) => {
        try {
            setUploadError(null);
            const text = await uploadedFile.text();
            const lines = text.split('\n').filter(Boolean);

            if (!lines.length) {
                setUploadError('CSV file is empty');
                return;
            }

            const headers = parseCSVLine(lines[0]);
            const missingColumns = REQUIRED_COLUMNS.filter((required) => !headers.includes(required));

            if (missingColumns.length) {
                setUploadError(`Missing required columns: ${missingColumns.join(', ')}`);
                return;
            }

            const parsedRows = [];

            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                const row = {};

                headers.forEach((header, idx) => {
                    row[header] = values[idx] || '';
                });
                parsedRows.push(row);
            }

            const errors = validateRows(parsedRows);
            setRows(parsedRows);
            setValidationErrors(errors);
            setFile(uploadedFile);
            setImportComplete(false);
        } catch {
            setUploadError('Unable to parse CSV file');
        }
    };

    const removeFile = () => {
        setFile(null);
        setRows([]);
        setValidationErrors([]);
        setUploadError(null);
        setImportComplete(false);
    };

    const handleImport = async () => {
        if (validationErrors.length || !rows.length) {
            return;
        }
        setImporting(true);

        const payload = rows.map((employee) => ({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            gender: employee.gender,
            contact: employee.contact,
            dob: employee.dob,
            status: employee.status,
            department: employee.department,
            role: employee.role,
        }));

        console.log('IMPORT PAYLOAD:', payload);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setImporting(false);
        setImportComplete(true);
    };

    const stats = useMemo(() => ({
        total: rows.length,
        invalid: validationErrors.length,
        valid: rows.length - validationErrors.length,
    }), [rows, validationErrors]);

    return (
        <div className="container-fluid p-4 min-vh-100">
            {/* HEADER */}
            <div className="bg-white rounded-3 mb-5">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: 52,
                                height: 52,
                            }}
                        >
                            <FaFileCsv size={24} />
                        </div>
                        <div>
                            <h3 className="mb-0">Employee CSV Import</h3>
                            <small className="text-muted">Bulk employee onboarding</small>
                        </div>
                    </div>
                    <button
                        onClick={downloadCSVTemplate}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                    >
                        <FaDownload />
                        Download Template
                    </button>
                </div>
            </div>

            {/* DROPZONE */}
            <div className="mb-4">
                <DropZone
                    label="Drop Employee CSV"
                    file={file}
                    onChange={processCSV}
                />
            </div>

            {/* STATUS BAR */}
            {file && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border rounded-4 shadow-sm p-3 mb-4"
                >
                    <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <div className="badge bg-dark p-2">{file.name}</div>
                            <div className="badge bg-primary p-2">Rows: {stats.total}</div>
                            <div className="badge bg-success p-2">Valid: {stats.valid}</div>
                            <div className="badge bg-danger p-2">Invalid: {stats.invalid}</div>
                        </div>

                        <div className="d-flex gap-2">
                            <button
                                onClick={() => setPreviewOpen(true)}
                                disabled={!rows.length}
                                className="btn btn-outline-primary"
                            >
                                <FaEye className="me-2" />
                                Preview
                            </button>
                            <button
                                onClick={removeFile}
                                className="btn btn-outline-danger"
                            >
                                <FaTrash className="me-2" />
                                Remove
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={importing || validationErrors.length > 0 || !rows.length}
                                className="btn btn-success"
                            >
                                {importing ? 'Importing...' : (
                                    <>
                                        <FaUpload className="me-2" />
                                        Import Employees
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* VALIDATION */}
            {(uploadError || validationErrors.length > 0) && (
                <div className="bg-white border rounded-4 shadow-sm p-4 mb-4">
                    <div className="d-flex align-items-center gap-2 text-danger mb-3">
                        <FaExclamationTriangle />
                        <strong>Validation Issues</strong>
                    </div>

                    {uploadError && (
                        <div className="alert alert-danger">
                            {uploadError}
                        </div>
                    )}

                    <div
                        style={{
                            maxHeight: 300,
                            overflowY: "auto",
                        }}
                    >
                        {validationErrors.map((item, idx) => (
                            <div
                                key={idx}
                                className="border rounded p-3 mb-2 bg-light"
                            >
                                <div className="fw-semibold text-danger mb-1">
                                    Row {item.row}
                                </div>
                                <ul className="small mb-0">
                                    {item.errors.map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUCCESS */}
            {importComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-success d-flex align-items-center gap-2"
                >
                    <FaCheckCircle />
                    Employees imported successfully
                </motion.div>
            )}

            {/* PREVIEW OVERLAY */}
            <AnimatePresence>
                {previewOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                            style={{ zIndex: 1050 }}
                            onClick={() => setPreviewOpen(false)}
                        />

                        {/* MODAL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{  opacity: 0, y: 20 }}
                            className="position-fixed top-0 start-0 w-100 h-100 bg-white"
                            style={{ zIndex: 1060 }}
                        >
                            {/* HEADER */}
                            <div className="border-bottom p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-1">Import Preview</h4>
                                    <div className="small text-muted">
                                        Review employee records before import
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPreviewOpen(false)}
                                    className="btn btn-outline-secondary"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* TABLE */}
                            <div
                                className="p-4"
                                style={{
                                    height: "calc(100vh - 90px)",
                                    overflowY: "auto",
                                }}
                            >
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead
                                            className="table-light position-sticky top-0"
                                            style={{
                                                zIndex: 1,
                                            }}
                                        >
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Department</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, idx) => {
                                                const rowError = validationErrors.find((e) => e.row === idx +2);
                                                return (
                                                    <tr
                                                        className={rowError ? 'table-danger' : ''}
                                                        key={idx}
                                                    >
                                                        <td>{row.firstName}</td>
                                                        <td>{row.lastName}</td>
                                                        <td>{row.email}</td>
                                                        <td>{row.department}</td>
                                                        <td>{row.role}</td>
                                                        <td>
                                                            <span
                                                                className={`badge bg-${
                                                                    row.status === 'active'
                                                                        ? 'success'
                                                                        : 'secondary'
                                                                }`}
                                                            >
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};