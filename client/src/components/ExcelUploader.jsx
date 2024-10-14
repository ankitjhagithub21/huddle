import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (event) => {
        const binaryData = event.target.result;
        try {
          const workbook = XLSX.read(binaryData, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setData(parsedData); // Store the parsed data in state
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
    } else {
      console.warn('No file selected');
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      {/* Render the table only if there's data */}
      {data.length > 0 && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {/* Dynamically generate table headers from the keys of the first object */}
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-6 py-3">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Map through data rows */}
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {/* Render each cell */}
                  {Object.keys(row).map((key) => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap">
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
