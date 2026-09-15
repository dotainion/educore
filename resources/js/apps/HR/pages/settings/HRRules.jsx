export const HRRules = () =>{
    return(
        <div>
            <h6>HR Rules</h6>
            <p className="text-muted small">
                Simple HR constraints (no policy engine)
            </p>

            <label className="small">Probation (months)</label>
            <input
                type="number"
                className="form-control mb-2"
            />

            <label className="small">Notice (days)</label>
            <input
                type="number"
                className="form-control mb-2"
            />

            <div className="form-check form-switch mt-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                />
                <label className="form-check-label">
                    Require documents on hire
                </label>
            </div>
        </div>
    )
}