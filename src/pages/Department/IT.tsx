import { useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

interface Semester {
  id: number;
  semNumber: number;
  semYear: string;
  route: string;
}

interface Batch {
  id: number;
  name: string;
  students: number;
  year: string;
  semester: string;
  description?: string;
  semesters: Semester[];
}

interface Course {
  id: number;
  name: string;
  batches: Batch[];
}

interface Teacher {
  id: number;
  name: string;
  designation: string;
  experience: string;
  specialization: string;
}

interface DepartmentInfo {
  email: string;
  password: string;
  hod: Teacher | null;
  description: string;
}

export default function ITDepartment() {
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [newBatchName, setNewBatchName] = useState("");
  const [newBatchYear, setNewBatchYear] = useState("");
  const [newBatchSemester, setNewBatchSemester] = useState("");
  const [activeBatchTabs, setActiveBatchTabs] = useState<{[key: number]: number}>({});
  
  // HOD Management states
  const [isAssignHODModalOpen, setIsAssignHODModalOpen] = useState(false);
  

  
  // Edit Department states
  const [isEditDepartmentModalOpen, setIsEditDepartmentModalOpen] = useState(false);
  const [editDeptEmail, setEditDeptEmail] = useState("");
  const [editDeptPassword, setEditDeptPassword] = useState("");
  const [editDeptDescription, setEditDeptDescription] = useState("");
  
  // Edit Batch states
  const [isEditBatchModalOpen, setIsEditBatchModalOpen] = useState(false);
  const [selectedEditBatch, setSelectedEditBatch] = useState<Batch | null>(null);
  const [editBatchName, setEditBatchName] = useState("");
  const [editBatchYear, setEditBatchYear] = useState("");
  const [editBatchSemester, setEditBatchSemester] = useState("");
  const [editBatchStudents, setEditBatchStudents] = useState("");
  
  const [departmentInfo, setDepartmentInfo] = useState<DepartmentInfo>({
    email: "it.department@infuni.edu",
    password: "ITDept@2024",
    hod: null,
    description: "The Information Technology Department is dedicated to providing cutting-edge education in computer science, software engineering, and emerging technologies. Our curriculum is designed to prepare students for the rapidly evolving tech industry with hands-on experience in programming, data structures, algorithms, database management, web development, mobile app development, artificial intelligence, and machine learning. We focus on both theoretical foundations and practical applications to ensure our graduates are industry-ready."
  });
  
  // Available teachers for HOD assignment
  const [availableTeachers] = useState<Teacher[]>([
    { id: 1, name: "Dr. Rajesh Kumar", designation: "Professor", experience: "15 years", specialization: "Data Science & AI" },
    { id: 2, name: "Prof. Priya Sharma", designation: "Associate Professor", experience: "12 years", specialization: "Software Engineering" },
    { id: 3, name: "Dr. Amit Singh", designation: "Professor", experience: "18 years", specialization: "Computer Networks" },
    { id: 4, name: "Dr. Neha Gupta", designation: "Assistant Professor", experience: "8 years", specialization: "Database Systems" },
    { id: 5, name: "Prof. Suresh Reddy", designation: "Associate Professor", experience: "14 years", specialization: "Web Technologies" },
    { id: 6, name: "Dr. Anita Verma", designation: "Professor", experience: "16 years", specialization: "Machine Learning" }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "B.Tech",
      batches: [
        { 
          id: 1, 
          name: "Batch 1", 
          students: 60, 
          year: "2024-2028", 
          semester: "1st Semester", 
          semesters: [
            { id: 1, semNumber: 1, semYear: "2024-25", route: "/it/btech/batch1/sem1" },
            { id: 2, semNumber: 2, semYear: "2024-25", route: "/it/btech/batch1/sem2" },
            { id: 3, semNumber: 3, semYear: "2025-26", route: "/it/btech/batch1/sem3" },
            { id: 4, semNumber: 4, semYear: "2025-26", route: "/it/btech/batch1/sem4" },
            { id: 5, semNumber: 5, semYear: "2026-27", route: "/it/btech/batch1/sem5" },
            { id: 6, semNumber: 6, semYear: "2026-27", route: "/it/btech/batch1/sem6" },
            { id: 7, semNumber: 7, semYear: "2027-28", route: "/it/btech/batch1/sem7" },
            { id: 8, semNumber: 8, semYear: "2027-28", route: "/it/btech/batch1/sem8" }
          ]
        },
        { 
          id: 2, 
          name: "Batch 2", 
          students: 58, 
          year: "2023-2027", 
          semester: "3rd Semester", 
          semesters: [
            { id: 9, semNumber: 1, semYear: "2023-24", route: "/it/btech/batch2/sem1" },
            { id: 10, semNumber: 2, semYear: "2023-24", route: "/it/btech/batch2/sem2" },
            { id: 11, semNumber: 3, semYear: "2024-25", route: "/it/btech/batch2/sem3" },
            { id: 12, semNumber: 4, semYear: "2024-25", route: "/it/btech/batch2/sem4" },
            { id: 13, semNumber: 5, semYear: "2025-26", route: "/it/btech/batch2/sem5" },
            { id: 14, semNumber: 6, semYear: "2025-26", route: "/it/btech/batch2/sem6" },
            { id: 15, semNumber: 7, semYear: "2026-27", route: "/it/btech/batch2/sem7" },
            { id: 16, semNumber: 8, semYear: "2026-27", route: "/it/btech/batch2/sem8" }
          ]
        },
        { 
          id: 3, 
          name: "Batch 3", 
          students: 62, 
          year: "2022-2026", 
          semester: "5th Semester", 
          semesters: [
            { id: 17, semNumber: 1, semYear: "2022-23", route: "/it/btech/batch3/sem1" },
            { id: 18, semNumber: 2, semYear: "2022-23", route: "/it/btech/batch3/sem2" },
            { id: 19, semNumber: 3, semYear: "2023-24", route: "/it/btech/batch3/sem3" },
            { id: 20, semNumber: 4, semYear: "2023-24", route: "/it/btech/batch3/sem4" },
            { id: 21, semNumber: 5, semYear: "2024-25", route: "/it/btech/batch3/sem5" },
            { id: 22, semNumber: 6, semYear: "2024-25", route: "/it/btech/batch3/sem6" },
            { id: 23, semNumber: 7, semYear: "2025-26", route: "/it/btech/batch3/sem7" },
            { id: 24, semNumber: 8, semYear: "2025-26", route: "/it/btech/batch3/sem8" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "M.Tech",
      batches: [
        { 
          id: 4, 
          name: "Batch 1", 
          students: 30, 
          year: "2024-2026", 
          semester: "1st Semester", 
          semesters: [
            { id: 25, semNumber: 1, semYear: "2024-25", route: "/it/mtech/batch1/sem1" },
            { id: 26, semNumber: 2, semYear: "2024-25", route: "/it/mtech/batch1/sem2" },
            { id: 27, semNumber: 3, semYear: "2025-26", route: "/it/mtech/batch1/sem3" },
            { id: 28, semNumber: 4, semYear: "2025-26", route: "/it/mtech/batch1/sem4" }
          ]
        },
        { 
          id: 5, 
          name: "Batch 2", 
          students: 28, 
          year: "2023-2025", 
          semester: "3rd Semester", 
          semesters: [
            { id: 29, semNumber: 1, semYear: "2023-24", route: "/it/mtech/batch2/sem1" },
            { id: 30, semNumber: 2, semYear: "2023-24", route: "/it/mtech/batch2/sem2" },
            { id: 31, semNumber: 3, semYear: "2024-25", route: "/it/mtech/batch2/sem3" },
            { id: 32, semNumber: 4, semYear: "2024-25", route: "/it/mtech/batch2/sem4" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "BCA",
      batches: [
        { 
          id: 6, 
          name: "Batch 1", 
          students: 45, 
          year: "2024-2027", 
          semester: "1st Semester", 
          semesters: [
            { id: 33, semNumber: 1, semYear: "2024-25", route: "/it/bca/batch1/sem1" },
            { id: 34, semNumber: 2, semYear: "2024-25", route: "/it/bca/batch1/sem2" },
            { id: 35, semNumber: 3, semYear: "2025-26", route: "/it/bca/batch1/sem3" },
            { id: 36, semNumber: 4, semYear: "2025-26", route: "/it/bca/batch1/sem4" },
            { id: 37, semNumber: 5, semYear: "2026-27", route: "/it/bca/batch1/sem5" },
            { id: 38, semNumber: 6, semYear: "2026-27", route: "/it/bca/batch1/sem6" }
          ]
        },
        { 
          id: 7, 
          name: "Batch 2", 
          students: 42, 
          year: "2023-2026", 
          semester: "3rd Semester", 
          semesters: [
            { id: 39, semNumber: 1, semYear: "2023-24", route: "/it/bca/batch2/sem1" },
            { id: 40, semNumber: 2, semYear: "2023-24", route: "/it/bca/batch2/sem2" },
            { id: 41, semNumber: 3, semYear: "2024-25", route: "/it/bca/batch2/sem3" },
            { id: 42, semNumber: 4, semYear: "2024-25", route: "/it/bca/batch2/sem4" },
            { id: 43, semNumber: 5, semYear: "2025-26", route: "/it/bca/batch2/sem5" },
            { id: 44, semNumber: 6, semYear: "2025-26", route: "/it/bca/batch2/sem6" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "MCA",
      batches: [
        { 
          id: 8, 
          name: "Batch 1", 
          students: 35, 
          year: "2024-2026", 
          semester: "1st Semester", 
          semesters: [
            { id: 45, semNumber: 1, semYear: "2024-25", route: "/it/mca/batch1/sem1" },
            { id: 46, semNumber: 2, semYear: "2024-25", route: "/it/mca/batch1/sem2" },
            { id: 47, semNumber: 3, semYear: "2025-26", route: "/it/mca/batch1/sem3" },
            { id: 48, semNumber: 4, semYear: "2025-26", route: "/it/mca/batch1/sem4" }
          ]
        }
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
            semesters: [] // Start with empty semesters array
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

  const openAssignHODModal = () => {
    setIsAssignHODModalOpen(true);
  };

  const closeAssignHODModal = () => {
    setIsAssignHODModalOpen(false);
  };

  const assignHOD = (teacher: Teacher) => {
    setDepartmentInfo(prev => ({
      ...prev,
      hod: teacher
    }));
    closeAssignHODModal();
  };

  // Edit Department functions
  const openEditDepartmentModal = () => {
    setEditDeptEmail(departmentInfo.email);
    setEditDeptPassword(departmentInfo.password);
    setEditDeptDescription(departmentInfo.description);
    setIsEditDepartmentModalOpen(true);
  };

  const closeEditDepartmentModal = () => {
    setIsEditDepartmentModalOpen(false);
    setEditDeptEmail("");
    setEditDeptPassword("");
    setEditDeptDescription("");
  };

  const saveDepartmentEdit = () => {
    if (editDeptEmail.trim() && editDeptPassword.trim() && editDeptDescription.trim()) {
      setDepartmentInfo(prev => ({
        ...prev,
        email: editDeptEmail.trim(),
        password: editDeptPassword.trim(),
        description: editDeptDescription.trim()
      }));
      closeEditDepartmentModal();
    }
  };

  // Edit Batch functions
  const openEditBatchModal = (batch: Batch) => {
    setSelectedEditBatch(batch);
    setEditBatchName(batch.name);
    setEditBatchYear(batch.year);
    setEditBatchSemester(batch.semester);
    setEditBatchStudents(batch.students.toString());
    setIsEditBatchModalOpen(true);
  };

  const closeEditBatchModal = () => {
    setIsEditBatchModalOpen(false);
    setSelectedEditBatch(null);
    setEditBatchName("");
    setEditBatchYear("");
    setEditBatchSemester("");
    setEditBatchStudents("");
  };

  const saveBatchEdit = () => {
    if (selectedEditBatch && editBatchName.trim()) {
      setCourses(prev => prev.map(course => ({
        ...course,
        batches: course.batches.map(batch => {
          if (batch.id === selectedEditBatch.id) {
            return {
              ...batch,
              name: editBatchName.trim(),
              year: editBatchYear.trim() || batch.year,
              semester: editBatchSemester.trim() || batch.semester,
              students: parseInt(editBatchStudents) || batch.students
            };
          }
          return batch;
        })
      })));
      closeEditBatchModal();
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl md:text-5xl font-bold text-black bg-clip-text ">
            Information Technology (IT)
          </h1>
          <button 
            onClick={openEditDepartmentModal}
            className="inline-flex items-center justify-center rounded-md bg-green-600 py-2 px-4 text-center font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 lg:px-6 xl:px-8 shadow-lg"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Department
          </button>
        </div>

        {/* Department Information Section */}
        <div className="mb-6 bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-default">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Department Information
            </h3>
          </div>
          <div className="p-6">
            {/* Department Description */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-black dark:text-white mb-3">About the Department</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {departmentInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Credentials */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-black dark:text-white mb-3">Department Credentials</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department Email</label>
                    <p className="text-black dark:text-white font-mono bg-white dark:bg-gray-700 px-3 py-2 rounded border">
                      {departmentInfo.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department Password</label>
                    <p className="text-black dark:text-white font-mono bg-white dark:bg-gray-700 px-3 py-2 rounded border">
                      {departmentInfo.password}
                    </p>
                  </div>
                </div>
              </div>

              {/* HOD Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-black dark:text-white mb-3">Head of Department</h4>
                {departmentInfo.hod ? (
                  <div className="space-y-2">
                    <p className="text-black dark:text-white font-semibold">{departmentInfo.hod.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{departmentInfo.hod.designation}</p>
                    <p className="text-gray-600 dark:text-gray-400">Experience: {departmentInfo.hod.experience}</p>
                    <p className="text-gray-600 dark:text-gray-400">Specialization: {departmentInfo.hod.specialization}</p>
                    <button
                      onClick={openAssignHODModal}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Change HOD
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No HOD assigned</p>
                    <button
                      onClick={openAssignHODModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Assign HOD
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Courses and Batches */}
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Programmes
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
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {activeBatch.students} students
                                </span>
                                <button
                                  onClick={() => openEditBatchModal(activeBatch)}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </div>
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
                          </div>

                          {/* Semester Table */}
                          <div className="border border-stroke dark:border-strokedark rounded-lg">
                            <div className="px-4 py-3 border-b border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                              <h6 className="text-sm font-semibold text-black dark:text-white">
                                Semester Information
                              </h6>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Sem Number
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Sem Year
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-boxdark divide-y divide-gray-200 dark:divide-gray-700">
                                  {activeBatch.semesters.length > 0 ? (
                                    activeBatch.semesters.map((semester) => (
                                      <tr key={semester.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                          Semester {semester.semNumber}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                          {semester.semYear}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                          <Link
                                            to={semester.route}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                          </Link>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No semesters added yet
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
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
                <button
                  onClick={addBatch}
                  disabled={!newBatchName.trim()}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors w-full"
                >
                  Add Batch
                </button>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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

        {/* Assign HOD Modal */}
        {isAssignHODModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Assign Head of Department
                  </h3>
                  <button
                    onClick={closeAssignHODModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select a teacher from the available faculty to assign as Head of Department:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableTeachers.map((teacher) => (
                    <div key={teacher.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {teacher.name}
                          </h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">
                            {teacher.designation}
                          </p>
                        </div>
                        <button
                          onClick={() => assignHOD(teacher)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Assign
                        </button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Experience:</span> {teacher.experience}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Specialization:</span> {teacher.specialization}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={closeAssignHODModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Department Modal */}
        {isEditDepartmentModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Edit Department Information
                  </h3>
                  <button
                    onClick={closeEditDepartmentModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department Email *
                  </label>
                  <input
                    type="email"
                    value={editDeptEmail}
                    onChange={(e) => setEditDeptEmail(e.target.value)}
                    placeholder="department.email@infuni.edu"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department Password *
                  </label>
                  <input
                    type="text"
                    value={editDeptPassword}
                    onChange={(e) => setEditDeptPassword(e.target.value)}
                    placeholder="Enter department password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department Description *
                  </label>
                  <textarea
                    value={editDeptDescription}
                    onChange={(e) => setEditDeptDescription(e.target.value)}
                    placeholder="Enter department description..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={saveDepartmentEdit}
                    disabled={!editDeptEmail.trim() || !editDeptPassword.trim() || !editDeptDescription.trim()}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={closeEditDepartmentModal}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 font-medium shadow-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Batch Modal */}
        {isEditBatchModalOpen && selectedEditBatch && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Edit Batch Information
                  </h3>
                  <button
                    onClick={closeEditBatchModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Editing: {selectedEditBatch.name}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Batch Name *
                  </label>
                  <input
                    type="text"
                    value={editBatchName}
                    onChange={(e) => setEditBatchName(e.target.value)}
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
                    value={editBatchYear}
                    onChange={(e) => setEditBatchYear(e.target.value)}
                    placeholder="Enter academic year (e.g., 2024-2028)"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Semester
                  </label>
                  <select
                    value={editBatchSemester}
                    onChange={(e) => setEditBatchSemester(e.target.value)}
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
                    Number of Students
                  </label>
                  <input
                    type="number"
                    value={editBatchStudents}
                    onChange={(e) => setEditBatchStudents(e.target.value)}
                    placeholder="Enter number of students"
                    min="0"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={saveBatchEdit}
                    disabled={!editBatchName.trim()}
                    className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={closeEditBatchModal}
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
