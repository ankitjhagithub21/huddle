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

          // Filter the parsed data to include only specific fields
          const filteredData = parsedData.map((row) => ({
            fullName: row.fullName || '', // Provide default empty string if field doesn't exist
            email: row.email || '',
            mobile: row.mobile || ''
          }));

          setData(filteredData); // Store the filtered data in state
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

      {/* Render the table only if there's data */}
      {data.length > 0 && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <button onClick={() => setData([])} className='px-4 py-2 text-white bg-[var(--secondary)] m-2 rounded-lg'>X</button>
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Map through data rows */}
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{row.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.mobile}</td>
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
