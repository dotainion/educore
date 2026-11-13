
import { FormInput } from "../widgets/FormInput";
import { FormSelect } from "../widgets/FormSelect";
import { Switch } from "../widgets/Switch";

export const Address = () => {
    return (
        <div className="row g-3">
            <FormInput
                label="Street Address"
                name="street"
                required
                placeholder="Enter street address"
            />
            <FormInput
                label="Street Address 2"
                name="street2"
                placeholder="Apartment, suite, unit, etc. (optional)"
            />
            <FormInput
                label="City"
                name="city"
                required
                placeholder="Enter city"
            />
            <FormInput
                label="State / Parish"
                name="state"
                placeholder="Enter state or parish"
            />
            <FormInput
                label="Postal / ZIP Code"
                name="zip"
                placeholder="Enter postal code"
            />
            <FormInput
                label="Country"
                name="country"
                required
                placeholder="Enter country"
            />
            <FormSelect
                className="mb-3"
                label="Address Type"
                name="type"
                required
                options={[
                    { label: "Residential", value: "residential" },
                    { label: "Mailing", value: "mailing" },
                    { label: "Billing", value: "billing" },
                    { label: "Business", value: "business" },
                    { label: "Other", value: "other" },
                ]}
            />
            <Switch
                className="pb-3"
                trailing="Same as Mailing Address"
                name="sameAsMailing"
                description="Indicates whether this address is also used as the mailing address."
            />
            <Switch
                className="pb-3"
                label="Status"
                name="status"
                description="Controls whether this address is active or inactive."
            />
        </div>
    );
};
