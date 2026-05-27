import { useEffect, useState } from "react";
import { MobileTransformable, MobileTransformableButton, MobileTransformableProvider } from "../../../../global/components/MobileTransformable";
import { GlobalApiInput } from "../../../../global/widgets/GlobalApiInput";
import { GlobalApiSelect } from "../../../../global/widgets/GlobalApiSelect";
import { api } from "../../../../global/services/Api";
import { Spinner } from "../../../../global/components/Spinner";
import { GlobalApiSubmit } from "../../../../global/widgets/GlobalApiSubmit";

const formDefault = () =>({
    id: null,
    attributes: {
        name: '',
        code: '',
        status: 'Active',
    }
});

export const Departments = () =>{
    const [departments, setDepartments] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(formDefault());

    const openCreate = () => {
        setEditing(null);
        setForm(formDefault());
    };

    const openEdit = (dept) => {
        setEditing(true);
        setForm(dept);
    };

    const save = () => {
        const data = {
            departmentId: form.id,
            ...form.attributes
        }

        const req = editing
            ? api.department.update(data)
            : api.department.create(data);

        req.then((response)=>{
            const doc = response.data.department;
            if(editing) setDepartments((prevs)=>prevs.map((d)=>d.id === doc.id ? doc : d));
            else setDepartments((prevs)=>[doc, ...prevs]);
            
        }).catch((error)=>{

        });
    };

    const remove = (departmentId) => {
        api.department.delete({departmentId}).then((response)=>{
            const doc = response.data.department;
            setDepartments((prev)=>prev.filter((d) => d.id !== doc.id));
        }).catch((error)=>{

        });
    };

    useEffect(()=>{
        api.department.list().then((response)=>{
            setDepartments(response.data.departments);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <MobileTransformableProvider>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-5 mt-3">
                <h6 className="mb-0">Departments</h6>
                <MobileTransformableButton onClick={openCreate} className="btn btn-sm btn-primary">
                    + New Department
                </MobileTransformableButton>
            </div>

            <div className="list-group rounded-0 p-0 m-0">
                {departments.map((d) => (
                    <div className="list-group-item border-start-0 border-end-0 px-0 py-3" key={d.id}>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="small">
                                <div className="fw-semibold">{d.attributes.name}</div>
                                <div className="small text-muted">{d.attributes.code}</div>
                            </div>
                            <div>
                                <span className={`px-2 small badge bg-${d.attributes.status === 'Active' ? 'primary' : 'secondary'}`}>
                                    {d.attributes.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <MobileTransformableButton onClick={()=>openEdit(d)} className="btn btn-sm btn-secondary px-3">
                                Edit
                            </MobileTransformableButton>
                            <button onClick={()=>remove(d.id)} className="btn btn-sm btn-primary px-3">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="position-relative p-5">
                        <Spinner show absolute md bg="white" />
                    </div>
                )}
            </div>

            {/* MODAL */}
            <MobileTransformable useOverlay>
                <div className="w-sm-100" style={{width: '500px'}}>
                    <h2 className="mb-4">{editing ? 'Edit Department' : 'New Department'}</h2>
                    <div className="mb-4">
                        <GlobalApiInput
                            className="form-control mb-3"
                            label="Department name"
                            placeholder="Enter a department name"
                            value={form.attributes.name}
                            name="name"
                            onChange={(e)=>setForm({id: form.id, attributes: {...form.attributes, name: e.target.value}})}
                        />
                        <GlobalApiInput
                            className="form-control mb-3"
                            label="Code"
                            placeholder="Enter a code"
                            value={form.attributes.code}
                            name="code"
                            onChange={(e)=>setForm({id: form.id, attributes: {...form.attributes, code: e.target.value}})}
                        />
                        <GlobalApiSelect
                            className="form-control mb-3"
                            label="Status"
                            value={form.attributes.status}
                            name="status"
                            onChange={(e)=>setForm({id: form.id, attributes: {...form.attributes, status: e.target.value}})}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </GlobalApiSelect>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button onClick={()=>setOpen(false)} className="btn btn-sm btn-secondary px-3">
                            Cancel
                        </button>
                        <GlobalApiSubmit onClick={save} className="btn btn-sm btn-primary px-3">
                            Save
                        </GlobalApiSubmit>
                    </div>
                </div>
            </MobileTransformable>
        </MobileTransformableProvider>
    );
}