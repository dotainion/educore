import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { api } from "../../../global/services/Api";
import { Spinner } from "../../../global/components/Spinner";
import { Address } from "./Address";
import { EmptyDisplay } from "./EmptyDisplay";
import { FaHouseUser } from "react-icons/fa";
import { AddressIcon } from "./AddressIcon";
import { useParams } from "react-router-dom";
import { PendingDisplay } from "./PendingDisplay";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export const AddressesAndModification = forwardRef(({ addresses: incommingAddresses }, ref) =>{
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState(null);
    const [pending, setPending] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showAddress, setShowAddress] = useState({
        show: false,
        address: null
    });

    const params = useParams();
    const userId = params.userId || params.employeeId;

    const open = () =>{
        setShowAddress((s)=>({address: null, show: true}));
    }

    const close = () =>{
        setShowAddress((s)=>({address: null, show: false}));
    }

    const openWithAttress = (addr) =>{
        setShowAddress((s)=>({show: true, address: addr}));
    }

    const save = () => {
        setLoading(true);
        const data = {
            ...address,
            userId: userId,
        };

        api.onboarding.addrInfo.primarykey('addressId').set(data).then((response)=>{
            const addrs = response.data.address;
            setAddresses((prevs)=>prevs.map((addr)=>{
                if(addr.id === addrs.id) return addrs;
                return addr;
            }));
            close();
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    };

    useImperativeHandle(ref, ()=>({
        open,
        close,
        openWithAttress,
    }), []);
    
    useEffect(()=>{
        if(incommingAddresses?.length){
            setAddresses(incommingAddresses);
            setPending(false);
            return;
        }
        if(!userId){
            setPending(false);
            return;
        }
        api.address.list({userId: userId}).then((response)=>{
            setAddresses(response.data.addresses);
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setPending(false));
    }, [incommingAddresses]);
        
    if(pending) return(
        <PendingDisplay message="Loading addresses" />
    )

    return(
        <div>
            {addresses.length ? (
                <ul className="list-group">
                    {addresses.map((address)=>(
                        <li
                            onClick={()=>openWithAttress(address)}
                            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between gap-3"
                            key={address.id}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <AddressIcon
                                    className="text-primary"
                                    type={address.attributes.type}
                                    size={20}
                                />
                                <div>
                                    {address.attributes.toString}
                                    {address.attributes.type && (
                                        <div className="fw-bold" style={{fontSize: '12px'}}>Fishing</div>
                                    )}
                                </div>
                            </div>
                            <span className="badge bg-primary rounded-pill">{address.attributes.type}</span>
                        </li>
                    ))}
                </ul>
            ):(
                <EmptyDisplay
                    icon={FaHouseUser}
                    title="No Address Created Yet"
                    subtitle="Address help keep track of employee"
                    render={(opt)=>(
                        <button onClick={open} className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3 rounded-pill">
                            <opt.icon.plus />
                            Create Your First Address
                        </button>
                    )}
                />
            )}
            {showAddress.show && (
                <motion.div
                    className="position-fixed top-0 start-0 w-100 vh-100"
                    initial={{ opacity: 0, x: -20, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    style={{zIndex: 1060}}
                >
                    <div className="bg-white bg-opacity-75 w-100 h-100 d-flex align-items-center justify-content-center">
                        <div className="container vh-100 overflow-auto py-5" style={{maxWidth: '768px'}}>
                            <div className="d-flex justify-content-end">
                                <button onClick={close} className="position-sticky top-0 btn btn-sm link-danger border-0 p-0">
                                    <X />
                                </button>
                            </div>
                            <div className="bg-white shadow-sm rounded">
                                <Address
                                    address={showAddress.address}
                                    onChange={setAddress}
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-3 px-3">
                                <button onClick={save} className="btn btn-sm btn-primary px-3">
                                    Save
                                </button>
                            </div>
                            <Spinner show={loading} bg="white" />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
});
