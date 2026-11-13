import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../widgets/Dropdown";

export const AcademicYear = ({ onChange, value, disabled }) => {
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(false);

    const hasRunRef = useRef(null);

    const appendSixMonths = (year) => {
        setYears((prevs) => [
            ...prevs, 
            ...Array.from({ length: 6 }, (_, i) => Number(year) - (i + 1)
        )]);
    };

    const appendMore = (e) => {
        e.stopPropagation();
        setLoading(true);
        setTimeout(() => {
            appendSixMonths(years[years.length -1]);
            setLoading(false)
        }, 1000);
    };

    useEffect(() => {
        if(!hasRunRef.current) {
            hasRunRef.current = true;
            setYears([new Date().getFullYear()]);
            appendSixMonths(new Date().getFullYear());
        }
    }, []);

    return(
        <Dropdown
            className="form-control border w-100"
            as="select"
            placeholder="Choose academic year"
            value={value}
            disabled={disabled}
            options={[
                ...years.map(year => ({ value: year })),
                {
                    className: "text-primary",
                    label: <span className="w-100 d-flex align-items-center justify-content-between">
                        +Year
                        {loading && (
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </span>,
                    disabled: true,
                    onClick: appendMore
                }
            ]}
            onChange={onChange}
        />
    )
}