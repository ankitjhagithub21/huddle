import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import { toast } from 'react-toastify'; 
import { addMultipleAttendee } from '../api/attendees';

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
          setData(parsedData);
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

  const handleImport = async () => {
    // Filter data to include only relevant fields
    const filteredData = data
      .map(({ fullName, email, mobile }) => ({ fullName, email, mobile }))
      .filter(item => item.fullName && item.email && item.mobile); // Ensure valid entries

    // Check if filtered data length is greater than 0
    if (filteredData.length === 0) {
      toast.error('No valid attendees to save.');
      return;
    }

    try {
      const response = await addMultipleAttendee(filteredData)
      const data = await response.json()
      if(response.ok){
        toast.success('Attendees imported successfully!');
      }else{
        toast.error("Error importing attendees.")
      }
      setData([]); 
    } catch (error) {
      console.error('Error importing attendees:', error);
      toast.error('Error importing attendees.');
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="bg-[var(--secondary)] w-fit px-4 py-2 text-white rounded-lg cursor-pointer ">
        <label htmlFor="excel" className='cursor-pointer'>Import Excel</label>
        <input
          type="file"
          name='excel'
          id='excel'
          onChange={handleFileUpload}
          className='hidden'
        />
      </div>

      {/* Button to trigger import after data is loaded */}
      {data.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleImport}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
            Save Imported Data
          </button>
          <button
            onClick={() => setData([])}
            className='px-4 py-2 text-white bg-[var(--secondary)] m-2 rounded-lg'>
            Clear Data
          </button>
        </div>
      )}

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
