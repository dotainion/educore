export const Notifications = () =>{
    return(
        <div>
            <h6>Notifications</h6>

            {[1, 2].map((key) => (
                <div
                    key={key}
                    className="form-check form-switch mb-2"
                >
                    <input
                        type="checkbox"
                        className="form-check-input"
                    />
                    <label className="form-check-label text-capitalize">
                        {key}
                    </label>
                </div>
            ))}
        </div>
    )
}