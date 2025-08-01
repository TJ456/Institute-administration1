import { useState, useEffect } from 'react';
import { DepartmentAPI } from '../utils/departmentAPI';
import { Department } from '../utils/departmentStorage';

interface DepartmentSelectorProps {
  onDepartmentChange?: (department: Department | null) => void;
}

export default function DepartmentSelector({ onDepartmentChange }: DepartmentSelectorProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load departments and current selection on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Initialize and get current department
        const currentDept = await DepartmentAPI.initializeDepartment();
        setSelectedDepartment(currentDept);

        // Load all departments for dropdown
        const deptList = await DepartmentAPI.fetchDepartments();
        setDepartments(deptList);

      } catch (error) {
        console.error('Error loading departments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle department selection
  const handleDepartmentSelect = async (department: Department) => {
    try {
      setIsLoading(true);
      
      // Use the new selectDepartment function to properly store the selection
      const selectedDept = await DepartmentAPI.selectDepartment(department.id);
      
      if (selectedDept) {
        setSelectedDepartment(selectedDept);
        setIsOpen(false);
        
        // Notify parent component
        onDepartmentChange?.(selectedDept);
        
        // You can also trigger a page refresh or navigation here if needed
        // For example: window.location.reload(); or navigate to department page
        
        console.log(`Successfully selected: ${selectedDept.name} (ID: ${selectedDept.id})`);
      }
    } catch (error) {
      console.error('Error selecting department:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Current Department Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
      >
        <span className="text-sm font-medium">
          {isLoading ? 'Loading...' : selectedDepartment ? selectedDepartment.name : 'Select Department'}
        </span>
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="max-h-60 overflow-auto">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => handleDepartmentSelect(department)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                  selectedDepartment?.id === department.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`}
              >
                <div>
                  <div className="font-medium">{department.name}</div>
                  <div className="text-xs text-gray-500">{department.shortname} • {department.email}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Selection Info (Optional - for debugging) */}
      {selectedDepartment && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <strong>Selected:</strong> {selectedDepartment.name} (ID: {selectedDepartment.id})
          <br />
          <strong>Email:</strong> {selectedDepartment.email}
        </div>
      )}
    </div>
  );
}
