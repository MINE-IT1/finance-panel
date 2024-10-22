import { useState } from 'react';

const EditableField = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(inputValue);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={handleSave}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <span onClick={() => setIsEditing(true)} className="cursor-pointer text-blue-500">
          ${value}
        </span>
      )}
    </div>
  );
};

export default EditableField;
