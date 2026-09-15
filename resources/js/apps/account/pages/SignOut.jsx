import { useEffect, useState } from "react";
import { useApi } from "../../../global/context/ApiProvider";
import { LuLogOut } from "react-icons/lu";
import { api } from "../../../global/services/Api";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { token } from "../../../global/utils/Token";

export const SignOut = () => {
    const { loading: apiLoading } = useApi();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        api.account.signOut().then(() => {
            setStatus('success');
            token.unset();
            setTimeout(()=>navigate(routes.account.signIn), 1500);
        }).catch((error) => {
            console.error("Sign out failed:", error);
            setStatus('error');
        });
    }, []);

    let title, message;
    if (status === 'loading') {
        title = 'Signing you out...';
        message = 'Please wait while we log you out of your account.';
    } else if (status === 'success') {
        title = 'You have been signed out';
        message = 'You have successfully logged out. Redirecting to the sign-in page...';
    } else if (status === 'error') {
        title = 'Sign out failed';
        message = 'There was an error logging you out. Please try again or refresh the page.';
    }

    return (
        <div className="row align-items-center justify-content-center m-0 h-100">
            <div className="col-12" style={{ maxWidth: '500px' }}>
                <div className="card border-0">
                    <div className="card-body text-center">
                        <LuLogOut className={`display-4 d-inline-block m-auto mb-3 text-${status === 'error' ? 'danger' : 'primary'}`} />
                        <h4 className="mt-2">{title}</h4>
                        <p className="text-muted">{message}</p>

                        {(status === 'loading' || apiLoading) && (
                            <div className="spinner-border spinner-border-md text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};