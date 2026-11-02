import { useForm } from "./Form";

export const FormError = () => {
    const { error } = useForm();

    if(error?.status !== 'error' || !error?.message) return null;

    return(
        <div className="alert alert-danger" role="alert">
            {error.message}
        </div>
    )
}