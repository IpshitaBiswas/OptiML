
import React from "react";

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const InputField = ({ id, name, value, onChange, placeholder, error }: InputFieldProps) => {
  // Display "Company Name" instead of using the name prop directly for the companyName field
  const displayName = id === "companyName" ? "Company Name" : name;
  
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium mb-2">
        {displayName}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-optiml-purple ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-1 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;
