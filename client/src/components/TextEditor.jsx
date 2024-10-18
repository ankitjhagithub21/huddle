// TextEditor.js
import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ value, onChange }) => {
  const editor = useRef(null);

  const editorConfig = {
    readonly: false,
    placeholder: 'Enter description...',
    height: 300,
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={editorConfig}
      onChange={onChange}
    />
  );
};

export default TextEditor;
