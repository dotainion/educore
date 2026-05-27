import { PiPersonSimple } from "react-icons/pi";
import { useAuth } from "../../../global/context/AuthProvider";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { routes } from "../../../global/routes/Routes";
import { LogInButton } from "./LogInButton";
import { LogOutButton } from "./LogOutButton";

export const Header = () =>{
    const { user, authenticated, loading } = useAuth();
    return(
        <div className="container mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-0 fw-semibold">App Launcher</h5>
                    <small className="text-muted">
                        {authenticated
                            ? `Welcome back ${user.attributes.fullName} 👋 Manage your workspace`
                            : "Welcome guest sign in to access full enterprise system"}
                    </small>
                </div>

                {authenticated ? (
                    <div className="dropdown">
                        <button
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                            data-bs-toggle="dropdown"
                            style={{ width: 38, height: 38 }}
                        >
                            {user.attributes.firstName.charAt(0)}
                        </button>
                        <ul className="dropdown-menu">
                            <li className="py-1 px-2">
                                <div className="bg-primary text-center text-dark bg-opacity-10 p-3 mb-2 small rounded-2">
                                    <PiPersonSimple className="border border-dark rounded-circle p-2 fs-1 m-auto" />
                                    <div className="my-3 text-dark">{user.attributes.fullName}</div>
                                    <LogOutButton className="rounded-pill d-flex align-items-center gap-2 text-nowrap m-auto px-3">
                                        <BiLogOut />
                                        Log out
                                    </LogOutButton>
                                </div>
                            </li>
                            {[
                                {
                                    title: 'Log out',
                                    icon: BiLogIn,
                                    onClick: ()=>routes.navigate.to.account().withPath('logout')
                                }
                            ].map((acc)=>(
                                <li onClick={acc.onClick} className="dropdown-item small d-flex align-items-center gap-2" key={acc.title}>
                                    <acc.icon />
                                    {acc.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        {loading ? (
                            <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                <div className="spinner-border spinner-border-sm text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ):(
                            <LogInButton className="border-0 d-flex align-items-center gap-2" outline>
                                <BiLogIn />
                                Login
                            </LogInButton>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}