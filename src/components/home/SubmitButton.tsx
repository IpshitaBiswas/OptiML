
import React from "react";
import { ArrowUp } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton = ({ isLoading, isDisabled, onClick }: SubmitButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`bg-optiml-purple text-white px-6 py-3 rounded-md flex items-center ${
        !isDisabled && !isLoading
          ? "hover:bg-purple-800"
          : "opacity-70 cursor-not-allowed"
      } transition duration-300`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          <ArrowUp className="mr-2 h-5 w-5" />
          Submit for Analysis
        </>
      )}
    </button>
  );
};

export default SubmitButton;
