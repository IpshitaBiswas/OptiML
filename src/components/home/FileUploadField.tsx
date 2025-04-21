
import React from "react";

interface FileUploadFieldProps {
  id: string;
  name: string;
  label: string;
  acceptedFileTypes: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  error?: string;
}

const FileUploadField = ({ 
  id, 
  name, 
  label, 
  acceptedFileTypes, 
  onChange, 
  selectedFile, 
  error 
}: FileUploadFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium mb-2">
        {label}
      </label>
      <div className={`relative border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md p-2 bg-gray-50`}>
        <div className="flex items-center">
          <label 
            htmlFor={id} 
            className="flex-shrink-0 bg-white hover:bg-gray-100 px-4 py-2 rounded cursor-pointer border border-gray-300"
          >
            Choose file
          </label>
          <span className="ml-3 text-gray-500 truncate">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
        </div>
        <input
          type="file"
          id={id}
          name={name}
          onChange={onChange}
          accept={acceptedFileTypes}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {error && (
        <p className="mt-1 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUploadField;
