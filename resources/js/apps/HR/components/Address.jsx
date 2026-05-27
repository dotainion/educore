import { FaHome, FaPeopleCarry } from "react-icons/fa";
import { GlobalApiInput } from "../../../global/widgets/GlobalApiInput";
import { useEffect, useMemo, useState } from "react";
import { GlobalApiToggle } from "../../../global/widgets/GlobalApiToggle";
import { api } from "../../../global/services/Api";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../global/components/Spinner";
import { GlobalApiSelect } from "../../../global/widgets/GlobalApiSelect";
import { House, Locate, Mail, Type, Workflow } from "lucide-react";
import { AddressIcon } from "./AddressIcon";

export const Address = ({ params, address: defaultAddress, onChange }) => {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        addressId: '',
        userId: '',
        street: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        type: 'home',
        status: 'active',
        sameAsMailing: true,
    });

    const addressTypes = useMemo(()=>[
        {title: 'Home', value: 'home'},
        {title: 'Work', value: 'work'},
        {title: 'Parents', value: 'parents'},
        {title: 'Residential', value: 'residential'},
        {title: 'Mailing', value: 'mailing'},
        {title: 'Address', value: 'address'},
        {title: 'Other', value: 'other'},
    ], []);

    const updateResidential = (key, value) => {
        setAddress((addr)=>({
            ...addr,
            [key]: value
        }));
    };

    useEffect(()=>{
        onChange?.(address);
    }, [address]);

    useEffect(()=>{
        if(!defaultAddress) return;
        if(defaultAddress?.attributes){
            setAddress({
                ...defaultAddress.attributes,
                addressId: defaultAddress.id
            });
            return;
        }
        if(!defaultAddress?.addressId && defaultAddress.id){
            setAddress({
                ...defaultAddress,
                addressId: defaultAddress.id
            });
            return;
        }
        setAddress(defaultAddress);
    }, [defaultAddress]);
        
    useEffect(()=>{
        if(!params){
            setLoading(false);
            return;
        }
        api.address.find(params).then((response)=>{
            setAddress({
                ...response.data.address.attributes,
                addressId: response.data.address.id
            });
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>setLoading(false));
    }, [params]);

    return (
        <div className="border rounded-3 p-4 mb-3 position-relative">
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                    <AddressIcon className="text-primary" type={address.type} />
                    <h5 className="mb-0">Address</h5>
                </div>
                <div>
                    <GlobalApiSelect
                        name="type"
                        onChange={(e) => updateResidential('type', e.target.value)}
                        className="form-select"
                        value={address.type}
                    >
                        <option value="" hidden>Select address type</option>
                        {addressTypes.map((type, i)=>(
                            <option value={type.value} key={`${type.value}-${i}-addr-type`}>
                                {type.title}
                            </option>
                        ))}
                    </GlobalApiSelect>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <GlobalApiInput
                        className="form-control"
                        name="street"
                        placeholder="Address Line 1"
                        value={address.street}
                        onChange={(e) => updateResidential('street', e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <GlobalApiInput
                        className="form-control"
                        name="street2"
                        placeholder="Address Line 2"
                        value={address.street2}
                        onChange={(e) => updateResidential('street2', e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <GlobalApiInput
                        className="form-control"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => updateResidential('city', e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <GlobalApiInput
                        className="form-control"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => updateResidential('state', e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <GlobalApiInput
                        className="form-control"
                        name="zip"
                        placeholder="Postal Code"
                        value={address.zip}
                        onChange={(e) => updateResidential('zip', e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <GlobalApiInput
                        className="form-control"
                        placeholder="Country"
                        name="country"
                        value={address.country}
                        onChange={(e) => updateResidential('country', e.target.value)}
                    />
                </div>
            </div>

            {/* MAILING */}
            <GlobalApiToggle
                name="sameAsMailing"
                checked={address.sameAsMailing}
                onChange={(e)=>updateResidential('sameAsMailing', e.target.checked)}
                trailing="Mailing address same as residential"
            />

            <Spinner show={loading} absolute md bg="white" />
        </div>
    )
};