import "../../../css/errors.css";

export const NotFound = () =>{
    return(
        <div className="errors">
            <div className="parent-container">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <img
                            className="robot"
                            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                            alt="Broken Robot"
                        />
                    </div>

                    <h1>404</h1>
                    <p>Oops... this page is lost in space 🤖</p>
                    <a href="/">Go Home</a>
                </div>
            </div>
        </div>
    )
}