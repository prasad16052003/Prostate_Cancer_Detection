import React from "react";

const ResultsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Analysis Results</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div>
          <p className="text-gray-600">Results will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
