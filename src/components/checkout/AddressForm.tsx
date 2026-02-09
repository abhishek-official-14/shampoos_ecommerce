// src/components/checkout/AddressForm.tsx
import React from 'react';

interface AddressFormProps {
  address: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    saveAddress: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => {
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            required
            className="input-field"
            value={address.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            required
            className="input-field"
            value={address.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          required
          className="input-field"
          value={address.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          required
          className="input-field"
          value={address.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Street Address</label>
        <input
          type="text"
          required
          className="input-field"
          value={address.street}
          onChange={(e) => onChange('street', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            required
            className="input-field"
            value={address.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <select
            required
            className="input-field"
            value={address.state}
            onChange={(e) => onChange('state', e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            required
            className="input-field"
            value={address.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <input
            type="text"
            required
            className="input-field"
            value={address.country}
            readOnly
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveAddress"
          className="h-4 w-4 text-primary-600 rounded"
          checked={address.saveAddress}
          onChange={(e) => onChange('saveAddress', e.target.checked)}
        />
        <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">
          Save this address for future orders
        </label>
      </div>
    </div>
  );
};

export default AddressForm;