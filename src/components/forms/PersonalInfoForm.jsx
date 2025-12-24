import React from 'react';

const PersonalInfoForm = ({ data, onChange, completed }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          📋 <strong>Why we need this:</strong> Universities use this information to verify your identity and contact you about opportunities.
        </p>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="e.g., Meera Patel"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700 mb-2">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            id="nationality"
            value={data.nationality || ''}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="">Select nationality</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="nigerian">Nigerian</option>
            <option value="bangladeshi">Bangladeshi</option>
            <option value="pakistani">Pakistani</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+44 20 1234 5678"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
          Current Country of Residence
        </label>
        <select
          id="country"
          value={data.country || ''}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="china">China</option>
          <option value="nigeria">Nigeria</option>
          <option value="bangladesh">Bangladesh</option>
          <option value="pakistan">Pakistan</option>
          <option value="uk">United Kingdom</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
