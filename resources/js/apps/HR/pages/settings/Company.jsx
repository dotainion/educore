export const Company = () =>{
    return(
        <div>
            <h6>Company</h6>
            <p className="text-muted small">
                Basic company identity and defaults
            </p>
            <input
                className="form-control mb-2"
                placeholder="Company name"
            />
            <select
                className="form-select"
            >
                <option>GMT-4</option>
                <option>GMT+0</option>
                <option>GMT+1</option>
            </select>
        </div>
    )
}