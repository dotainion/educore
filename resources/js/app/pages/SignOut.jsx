import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { api } from "../service/Api";
import { routes } from "../routes/Routes";
import { useAuth } from "../providers/AuthProvider";

export const SignOut = () => {
    const { requireSignOut } = useAuth();

    const [loading, setLoading] = useState();
    const [status, setStatus] = useState('loading');

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.post("/logout").then(() => {
            setStatus('success');
            requireSignOut();
            setTimeout(()=>{
                navigate(routes.signIn);
            }, 1500);
        }).catch((error) => {
            console.error("Sign out failed:", error);
            setStatus('error');
        });
    }, []);

    let title = 'Signing you out...';
    let message = 'Please wait while we log you out of your account.';
    
    if (status === 'success') {
        title = 'You have been signed out';
        message = 'You have successfully logged out. Redirecting to the sign-in page...';
    } else if (status === 'error') {
        title = 'Sign out failed';
        message = 'There was an error logging you out. Please try again or refresh the page.';
    }

    return (
        <div className="row align-items-center justify-content-center m-0 pt-3 h-100">
            <div className="col-12" style={{ maxWidth: '500px' }}>
                <div className="card border-0">
                    <div className="card-body text-center">
                        <LuLogOut className={`display-4 d-inline-block m-auto mb-3 text-${status === 'error' ? 'danger' : 'primary'}`} />
                        <h4 className="mt-2">{title}</h4>
                        <p className="text-muted">{message}</p>

                        {(status === 'loading' || loading) && (
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