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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {formatSemester(semester)}
          </h1>
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
      </div>
    </>
  );
}
