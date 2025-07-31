import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";

interface Batch {
  id: number;
  name: string;
  students: number;
  year: string;
  semester: string;
  description: string;
}

interface Course {
  id: number;
  name: string;
  batches: Batch[];
}

export default function ITDepartment() {
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [newBatchName, setNewBatchName] = useState("");
  const [newBatchYear, setNewBatchYear] = useState("");
  const [newBatchSemester, setNewBatchSemester] = useState("");
  const [newBatchDescription, setNewBatchDescription] = useState("");
  const [activeBatchTabs, setActiveBatchTabs] = useState<{[key: number]: number}>({});

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "B.Tech",
      batches: [
        { id: 1, name: "Batch 1", students: 60, year: "2024-2028", semester: "1st Semester", description: "First year B.Tech students specializing in Computer Science and Information Technology. Focus on programming fundamentals and mathematics." },
        { id: 2, name: "Batch 2", students: 58, year: "2023-2027", semester: "3rd Semester", description: "Second year B.Tech students with advanced programming concepts and data structures." },
        { id: 3, name: "Batch 3", students: 62, year: "2022-2026", semester: "5th Semester", description: "Third year B.Tech students focusing on software engineering and system design." }
      ]
    },
    {
      id: 2,
      name: "M.Tech",
      batches: [
        { id: 4, name: "Batch 1", students: 30, year: "2024-2026", semester: "1st Semester", description: "First year M.Tech students specializing in Advanced Computing and AI/ML technologies." },
        { id: 5, name: "Batch 2", students: 28, year: "2023-2025", semester: "3rd Semester", description: "Second year M.Tech students working on research projects and advanced algorithms." }
      ]
    },
    {
      id: 3,
      name: "BCA",
      batches: [
        { id: 6, name: "Batch 1", students: 45, year: "2024-2027", semester: "1st Semester", description: "First year BCA students learning computer applications and programming basics." },
        { id: 7, name: "Batch 2", students: 42, year: "2023-2026", semester: "3rd Semester", description: "Second year BCA students focusing on web development and database management." }
      ]
    },
    {
      id: 4,
      name: "MCA",
      batches: [
        { id: 8, name: "Batch 1", students: 35, year: "2024-2026", semester: "1st Semester", description: "First year MCA students with advanced computer applications and software development." }
      ]
    }
  ]);

  const toggleCourse = (courseId: number) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const openAddBatchModal = (courseId: number) => {
    setSelectedCourseId(courseId);
    setIsAddBatchModalOpen(true);
  };

  const closeAddBatchModal = () => {
    setIsAddBatchModalOpen(false);
    setSelectedCourseId(null);
    setNewBatchName("");
    setNewBatchYear("");
    setNewBatchSemester("");
    setNewBatchDescription("");
  };

  const addBatch = () => {
    if (selectedCourseId && newBatchName.trim()) {
      setCourses(prev => prev.map(course => {
        if (course.id === selectedCourseId) {
          const newBatch: Batch = {
            id: Date.now(),
            name: newBatchName.trim(),
            students: 0,
            year: newBatchYear.trim() || "TBD",
            semester: newBatchSemester.trim() || "TBD",
            description: newBatchDescription.trim() || "No description provided"
          };
          return {
            ...course,
            batches: [...course.batches, newBatch]
          };
        }
        return course;
      }));
      closeAddBatchModal();
    }
  };

  return (
    <>
      <PageMeta
        title="IT Department | InfuniLMS"
        description="Information Technology Department - Institute Administration"
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
           Electrical and Electronics Engineering (EEE)
          </h2>
          <button 
            onClick={() => setIsAddBatchModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 lg:px-6 xl:px-8 shadow-lg"
          >
            Add Batch
          </button>
        </div>

        {/* Courses and Batches */}
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Courses & Batches
            </h3>
          </div>
          
          <div className="p-6">
            {courses.map((course) => (
              <div key={course.id} className="mb-4 last:mb-0">
                {/* Course Header */}
                <div 
                  onClick={() => toggleCourse(course.id)}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`transform transition-transform ${expandedCourses.includes(course.id) ? 'rotate-90' : 'rotate-0'}`}>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M6 6l8 4-8 4V6z"/>
                      </svg>
                    </span>
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {course.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({course.batches.length} batches)
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddBatchModal(course.id);
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md font-medium"
                  >
                    Add Batch
                  </button>
                </div>

                {/* Batches */}
                {expandedCourses.includes(course.id) && (
                  <div className="mt-2 ml-6">
                    {/* Batch Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.batches.map((batch) => (
                        <button
                          key={batch.id}
                          onClick={() => setActiveBatchTabs(prev => ({...prev, [course.id]: batch.id}))}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                            (activeBatchTabs[course.id] || course.batches[0]?.id) === batch.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {batch.name}
                        </button>
                      ))}
                    </div>

                    {/* Active Batch Content */}
                    {(() => {
                      const activeBatch = course.batches.find(b => 
                        b.id === (activeBatchTabs[course.id] || course.batches[0]?.id)
                      );
                      
                      if (!activeBatch) return null;

                      return (
                        <div className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg p-4">
                          {/* Batch Info */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-lg font-semibold text-black dark:text-white">
                                {activeBatch.name}
                              </h5>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {activeBatch.students} students
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Academic Year:</span>
                                <p className="text-black dark:text-white">{activeBatch.year}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Semester:</span>
                                <p className="text-black dark:text-white">{activeBatch.semester}</p>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Description:</span>
                              <p className="text-black dark:text-white mt-1">{activeBatch.description}</p>
                            </div>
                          </div>

                          {/* Table Placeholder */}
                          <div className="border border-stroke dark:border-strokedark rounded-lg">
                            <div className="px-4 py-3 border-b border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                              <h6 className="text-sm font-semibold text-black dark:text-white">
                                Student Information Table
                              </h6>
                            </div>
                            <div className="p-4">
                              <p className="text-gray-500 dark:text-gray-400 text-center">
                                Table content will be added here later...
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Batch Modal */}
        {isAddBatchModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Add New Batch
                  </h3>
                  <button
                    onClick={closeAddBatchModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
              {selectedCourseId && (
                <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <label className="block text-sm font-medium text-blue-800 dark:text-blue-200">
                    Selected Course
                  </label>
                  <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    {courses.find(c => c.id === selectedCourseId)?.name}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Batch Name *
                </label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="Enter batch name (e.g., Batch 1)"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={newBatchYear}
                  onChange={(e) => setNewBatchYear(e.target.value)}
                  placeholder="Enter academic year (e.g., 2024-2028)"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Semester
                </label>
                <select
                  value={newBatchSemester}
                  onChange={(e) => setNewBatchSemester(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select Semester</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                  <option value="5th Semester">5th Semester</option>
                  <option value="6th Semester">6th Semester</option>
                  <option value="7th Semester">7th Semester</option>
                  <option value="8th Semester">8th Semester</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={newBatchDescription}
                  onChange={(e) => setNewBatchDescription(e.target.value)}
                  placeholder="Enter batch description, specialization, or additional details..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={addBatch}
                  disabled={!newBatchName.trim()}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                >
                  Add Batch
                </button>
                <button
                  onClick={closeAddBatchModal}
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
