import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify'; 
import { addMultipleAttendee } from '../api/attendees';
import { useDispatch, useSelector } from 'react-redux';
import { setAttendees } from '../redux/slices/attendeeSlice';

const ExcelUploader = ({ onImport }) => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();
  const { attendees } = useSelector((state) => state.attendee);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = async (event) => {
        const binaryData = event.target.result;
        try {
          const workbook = XLSX.read(binaryData, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setData(parsedData); // Set the parsed data
          await handleImport(parsedData); // Call handleImport automatically
        } catch (error) {
          console.error('Error parsing file:', error);
          toast.error('Error parsing file.');
        }
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
        toast.error('File reading error.');
      };
    } else {
      console.warn('No file selected');
      toast.warn('No file selected.');
    }
  };

  const handleImport = async (importedData) => {
    const filteredData = importedData
      .map(({ fullName, email, mobile }) => ({ fullName, email, mobile }))
      .filter(item => item.fullName && item.email && item.mobile); // Ensure valid entries

    if (filteredData.length === 0) {
      toast.error('No valid attendees to save.');
      return;
    }

    try {
      const response = await addMultipleAttendee(filteredData);
      const data = await response.json();

      if (response.ok) {
        dispatch(setAttendees([...attendees, ...data]));
        onImport(data); 
        toast.success('Attendees imported successfully!');
      } else {
        toast.error(data.message);
      }
      setData([]); 
      setFileName(''); // Clear the file name after import
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

      {fileName && (
        <div className="mt-2 text-gray-700">
          <strong>Uploaded File:</strong> {fileName}
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
