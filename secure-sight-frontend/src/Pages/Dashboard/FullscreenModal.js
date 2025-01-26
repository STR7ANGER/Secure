import React from 'react';
import { Maximize2, Edit3, Database, Trash2, MoreVertical, X } from 'lucide-react';

// Fullscreen Modal Component
const FullscreenModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <div className="h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modified CustomDropdown component
const CustomDropdown = ({
  i,
  OpenEditModel,
  OpenDeleteModel,
  OpenRowDataModel,
  RawData,
  onFullscreen
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Chart options"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700">
          <div className="py-1">
            <button
              onClick={() => {
                onFullscreen();
                setDropdownOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Fullscreen
            </button>

            <button
              onClick={() => {
                OpenEditModel({ id: i._id, title: i.title });
                setDropdownOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </button>

            {RawData && (
              <button
                onClick={() => {
                  OpenRowDataModel(i.data);
                  setDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Database className="w-4 h-4 mr-2" />
                Raw Data
              </button>
            )}

            <button
              onClick={() => {
                OpenDeleteModel(i._id);
                setDropdownOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { FullscreenModal, CustomDropdown };