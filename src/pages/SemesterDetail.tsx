import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";

interface Subject {
  code: string;
  name: string;
  teacher: string;
}

export default function SemesterDetail() {
  const { department, programme, batch, semester } = useParams();
  const navigate = useNavigate();

  // Edit Semester Modal states
  const [isEditSemesterModalOpen, setIsEditSemesterModalOpen] = useState(false);
  const [editSemesterNumber, setEditSemesterNumber] = useState("");
  const [editSemesterYear, setEditSemesterYear] = useState("");
  const [editSubjects, setEditSubjects] = useState<Subject[]>([]);

  // Convert URL parameters to readable format
  const formatDepartment = (dept?: string) => {
    switch(dept?.toLowerCase()) {
      case 'it': return 'Information Technology';
      case 'ece': return 'Electronics & Communication Engineering';
      case 'eee': return 'Electrical & Electronics Engineering';
      case 'civil': return 'Civil Engineering';
      case 'mechanical': return 'Mechanical Engineering';
      default: return dept || '';
    }
  };

  const formatProgramme = (prog?: string) => {
    return prog?.toUpperCase() || '';
  };

  const formatBatch = (batchName?: string) => {
    return batchName?.replace(/batch/i, 'Batch ') || '';
  };

  const formatSemester = (sem?: string) => {
    return sem?.replace(/sem/i, 'Semester ') || '';
  };

  // Sample subjects data - this would come from your database
  const getSubjects = (): Subject[] => {
    const semesterNumber = semester?.replace(/sem/i, '');
    
    // Different subjects based on department and semester
    if (department === 'it') {
      switch (semesterNumber) {
        case '1':
          return [
            { code: 'CS101', name: 'Programming Fundamentals', teacher: 'Dr. John Smith' },
            { code: 'MA101', name: 'Mathematics I', teacher: 'Prof. Sarah Johnson' },
            { code: 'PH101', name: 'Physics', teacher: 'Dr. Michael Brown' },
            { code: 'EG101', name: 'Engineering Graphics', teacher: 'Prof. Lisa Davis' },
            { code: 'CS102', name: 'Computer Lab', teacher: 'Mr. Robert Wilson' }
          ];
        case '2':
          return [
            { code: 'CS201', name: 'Data Structures', teacher: 'Dr. Emily Chen' },
            { code: 'MA201', name: 'Mathematics II', teacher: 'Prof. David Lee' },
            { code: 'CS202', name: 'Digital Logic', teacher: 'Dr. James Miller' },
            { code: 'EE201', name: 'Basic Electronics', teacher: 'Prof. Anna Taylor' },
            { code: 'CS203', name: 'Programming Lab II', teacher: 'Mr. Mark Anderson' }
          ];
        case '3':
          return [
            { code: 'CS301', name: 'Database Management', teacher: 'Dr. Rachel Green' },
            { code: 'CS302', name: 'Computer Networks', teacher: 'Prof. Kevin White' },
            { code: 'CS303', name: 'Operating Systems', teacher: 'Dr. Steven Clark' },
            { code: 'MA301', name: 'Discrete Mathematics', teacher: 'Prof. Nancy Lewis' },
            { code: 'CS304', name: 'Software Engineering', teacher: 'Dr. Peter Hall' }
          ];
        default:
          return [
            { code: 'CS' + semesterNumber + '01', name: 'Advanced Computing', teacher: 'Dr. Faculty Name' },
            { code: 'CS' + semesterNumber + '02', name: 'Core Subject', teacher: 'Prof. Teacher Name' },
            { code: 'CS' + semesterNumber + '03', name: 'Lab Work', teacher: 'Mr. Lab Instructor' }
          ];
      }
    }
    
    // Default subjects for other departments
    return [
      { code: (department || 'DEP') + (semesterNumber || '1') + '01', name: 'Core Subject 1', teacher: 'Dr. Faculty 1' },
      { code: (department || 'DEP') + (semesterNumber || '1') + '02', name: 'Core Subject 2', teacher: 'Prof. Faculty 2' },
      { code: (department || 'DEP') + (semesterNumber || '1') + '03', name: 'Core Subject 3', teacher: 'Dr. Faculty 3' },
      { code: (department || 'DEP') + (semesterNumber || '1') + '04', name: 'Laboratory', teacher: 'Mr. Lab Instructor' }
    ];
  };

  const subjects = getSubjects();

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  // Edit Semester functions
  const openEditSemesterModal = () => {
    setEditSemesterNumber(semester?.replace(/sem/i, '') || '');
    setEditSemesterYear('2024-25'); // Default year, could be dynamic
    setEditSubjects([...subjects]);
    setIsEditSemesterModalOpen(true);
  };

  const closeEditSemesterModal = () => {
    setIsEditSemesterModalOpen(false);
    setEditSemesterNumber('');
    setEditSemesterYear('');
    setEditSubjects([]);
  };

  const saveSemesterEdit = () => {
    // Here you would typically save to database
    console.log('Saving semester changes:', {
      semesterNumber: editSemesterNumber,
      semesterYear: editSemesterYear,
      subjects: editSubjects
    });
    closeEditSemesterModal();
  };

  const addSubject = () => {
    const newSubject: Subject = {
      code: `${department?.toUpperCase() || 'DEP'}${editSemesterNumber}${(editSubjects.length + 1).toString().padStart(2, '0')}`,
      name: 'New Subject',
      teacher: 'TBD'
    };
    setEditSubjects([...editSubjects, newSubject]);
  };

  const updateSubject = (index: number, field: keyof Subject, value: string) => {
    const updatedSubjects = [...editSubjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setEditSubjects(updatedSubjects);
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = editSubjects.filter((_, i) => i !== index);
    setEditSubjects(updatedSubjects);
  };

  return (
    <>
      <PageMeta
        title={`${formatSemester(semester || '')} - ${formatProgramme(programme)} ${formatBatch(batch)} | InfuniLMS`}
        description={`Semester details for ${formatDepartment(department || '')} department`}
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {/* Back Button at Top */}
        <div className="mb-4">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatSemester(semester)}
            </h1>
            <button
              onClick={openEditSemesterModal}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {formatDepartment(department || '')}
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
              {formatProgramme(programme)}
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
              {formatBatch(batch)}
            </span>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-default">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Subject Details
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject Teacher
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-boxdark divide-y divide-gray-200 dark:divide-gray-700">
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {subject.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {subject.teacher}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No subjects found for this semester
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Previous Page
          </button>
        </div>

        {/* Edit Semester Modal */}
        {isEditSemesterModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Edit Semester Information
                  </h3>
                  <button
                    onClick={closeEditSemesterModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Editing: {formatSemester(semester)} - {formatDepartment(department || '')} - {formatProgramme(programme)} - {formatBatch(batch)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Semester Number *
                    </label>
                    <select
                      value={editSemesterNumber}
                      onChange={(e) => setEditSemesterNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Select Semester</option>
                      <option value="1">1st Semester</option>
                      <option value="2">2nd Semester</option>
                      <option value="3">3rd Semester</option>
                      <option value="4">4th Semester</option>
                      <option value="5">5th Semester</option>
                      <option value="6">6th Semester</option>
                      <option value="7">7th Semester</option>
                      <option value="8">8th Semester</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Academic Year *
                    </label>
                    <input
                      type="text"
                      value={editSemesterYear}
                      onChange={(e) => setEditSemesterYear(e.target.value)}
                      placeholder="Enter academic year (e.g., 2024-25)"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Subjects Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Subjects
                    </h4>
                    <button
                      onClick={addSubject}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Add Subject
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {editSubjects.map((subject, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Subject Code
                          </label>
                          <input
                            type="text"
                            value={subject.code}
                            onChange={(e) => updateSubject(index, 'code', e.target.value)}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Subject Name
                          </label>
                          <input
                            type="text"
                            value={subject.name}
                            onChange={(e) => updateSubject(index, 'name', e.target.value)}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              Teacher
                            </label>
                            <input
                              type="text"
                              value={subject.teacher}
                              onChange={(e) => updateSubject(index, 'teacher', e.target.value)}
                              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              onClick={() => removeSubject(index)}
                              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={saveSemesterEdit}
                    disabled={!editSemesterNumber || !editSemesterYear.trim()}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={closeEditSemesterModal}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 font-medium shadow-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
