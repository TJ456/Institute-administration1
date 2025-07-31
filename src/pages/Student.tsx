import { useState } from "react";
import PageMeta from "../components/common/PageMeta";

interface Student {
  id: number;
  rollNumber: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  course: string;
  batch: string;
  section: string;
  gender: string;
  dob: string;
  address: string;
  guardianName: string;
  guardianMobile: string;
  admissionDate: string;
}

interface Section {
  id: string;
  name: string;
  students: Student[];
  maxCapacity: number;
}

interface Batch {
  id: string;
  name: string;
  year: string;
  sections: Section[];
}

interface Course {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  batches: Batch[];
}

interface Department {
  id: string;
  name: string;
  fullName: string;
  courses: Course[];
}

export default function StudentPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSection, setNewSection] = useState<Partial<Section>>({
    name: "",
    maxCapacity: 60,
    students: []
  });
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    rollNumber: "",
    name: "",
    email: "",
    mobile: "",
    department: "",
    course: "",
    batch: "",
    section: "",
    gender: "",
    dob: "",
    address: "",
    guardianName: "",
    guardianMobile: "",
    admissionDate: "",
  });

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "it",
      name: "IT",
      fullName: "Information Technology",
      courses: [
        {
          id: "btech-it",
          name: "B.Tech",
          fullName: "Bachelor of Technology",
          duration: "4 years",
          batches: [
            {
              id: "2024-it",
              name: "2024",
              year: "2024-2028",
              sections: [
                {
                  id: "2024-it-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [
                    {
                      id: 1,
                      rollNumber: "24IT001",
                      name: "Rahul Kumar",
                      email: "rahul.kumar@student.infuni.edu",
                      mobile: "+91 9876543210",
                      department: "IT",
                      course: "B.Tech",
                      batch: "2024",
                      section: "A",
                      gender: "Male",
                      dob: "2005-03-15",
                      address: "123 Student Street, Mumbai, Maharashtra, India - 400001",
                      guardianName: "Mr. Suresh Kumar",
                      guardianMobile: "+91 9876543211",
                      admissionDate: "2024-07-15",
                    },
                    {
                      id: 2,
                      rollNumber: "24IT002",
                      name: "Priya Sharma",
                      email: "priya.sharma@student.infuni.edu",
                      mobile: "+91 9876543212",
                      department: "IT",
                      course: "B.Tech",
                      batch: "2024",
                      section: "A",
                      gender: "Female",
                      dob: "2005-08-22",
                      address: "456 Campus Road, Delhi, India - 110001",
                      guardianName: "Mrs. Sunita Sharma",
                      guardianMobile: "+91 9876543213",
                      admissionDate: "2024-07-15",
                    },
                  ],
                },
                {
                  id: "2024-it-b",
                  name: "Section B",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
            {
              id: "2023-it",
              name: "2023",
              year: "2023-2027",
              sections: [
                {
                  id: "2023-it-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
          ],
        },
        {
          id: "mtech-it",
          name: "M.Tech",
          fullName: "Master of Technology",
          duration: "2 years",
          batches: [
            {
              id: "2024-mtech-it",
              name: "2024",
              year: "2024-2026",
              sections: [
                {
                  id: "2024-mtech-it-a",
                  name: "Section A",
                  maxCapacity: 30,
                  students: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ece",
      name: "ECE",
      fullName: "Electronics & Communication Engineering",
      courses: [
        {
          id: "btech-ece",
          name: "B.Tech",
          fullName: "Bachelor of Technology",
          duration: "4 years",
          batches: [
            {
              id: "2024-ece",
              name: "2024",
              year: "2024-2028",
              sections: [
                {
                  id: "2024-ece-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "eee",
      name: "EEE",
      fullName: "Electrical & Electronics Engineering",
      courses: [
        {
          id: "btech-eee",
          name: "B.Tech",
          fullName: "Bachelor of Technology",
          duration: "4 years",
          batches: [
            {
              id: "2024-eee",
              name: "2024",
              year: "2024-2028",
              sections: [
                {
                  id: "2024-eee-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "civil",
      name: "CIVIL",
      fullName: "Civil Engineering",
      courses: [
        {
          id: "btech-civil",
          name: "B.Tech",
          fullName: "Bachelor of Technology",
          duration: "4 years",
          batches: [
            {
              id: "2024-civil",
              name: "2024",
              year: "2024-2028",
              sections: [
                {
                  id: "2024-civil-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "mechanical",
      name: "MECHANICAL",
      fullName: "Mechanical Engineering",
      courses: [
        {
          id: "btech-mechanical",
          name: "B.Tech",
          fullName: "Bachelor of Technology",
          duration: "4 years",
          batches: [
            {
              id: "2024-mechanical",
              name: "2024",
              year: "2024-2028",
              sections: [
                {
                  id: "2024-mechanical-a",
                  name: "Section A",
                  maxCapacity: 60,
                  students: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const getCurrentDepartment = () => {
    const dept = departments.find(d => d.id === selectedDepartment);
    console.log('Current Department:', dept?.name);
    return dept;
  };
  const getCurrentCourse = () => {
    const course = getCurrentDepartment()?.courses.find(c => c.id === selectedCourse);
    console.log('Current Course:', course?.name);
    return course;
  };
  const getCurrentBatch = () => {
    const batch = getCurrentCourse()?.batches.find(b => b.id === selectedBatch);
    console.log('Current Batch:', batch?.name);
    return batch;
  };
  const getCurrentSection = () => {
    const section = getCurrentBatch()?.sections.find(s => s.id === selectedSection);
    console.log('Current Section:', section?.name);
    return section;
  };

  const getAllStudents = () => {
    const students: Student[] = [];
    departments.forEach(dept => {
      dept.courses.forEach(course => {
        course.batches.forEach(batch => {
          batch.sections.forEach(section => {
            students.push(...section.students);
          });
        });
      });
    });
    return students;
  };

  const getFilteredStudents = () => {
    if (selectedSection) return getCurrentSection()?.students || [];
    if (selectedBatch) {
      const students: Student[] = [];
      getCurrentBatch()?.sections.forEach(section => {
        students.push(...section.students);
      });
      return students;
    }
    if (selectedCourse) {
      const students: Student[] = [];
      getCurrentCourse()?.batches.forEach(batch => {
        batch.sections.forEach(section => {
          students.push(...section.students);
        });
      });
      return students;
    }
    if (selectedDepartment) {
      const students: Student[] = [];
      getCurrentDepartment()?.courses.forEach(course => {
        course.batches.forEach(batch => {
          batch.sections.forEach(section => {
            students.push(...section.students);
          });
        });
      });
      return students;
    }
    return getAllStudents();
  };

  const openAddStudentModal = () => {
    setIsAddStudentModalOpen(true);
  };

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
    setNewStudent({
      rollNumber: "",
      name: "",
      email: "",
      mobile: "",
      department: "",
      course: "",
      batch: "",
      section: "",
      gender: "",
      dob: "",
      address: "",
      guardianName: "",
      guardianMobile: "",
      admissionDate: "",
    });
  };

  const openAddSectionModal = () => {
    setIsAddSectionModalOpen(true);
  };

  const closeAddSectionModal = () => {
    setIsAddSectionModalOpen(false);
    setNewSection({
      name: "",
      maxCapacity: 60,
      students: []
    });
  };

  const handleSectionInputChange = (field: keyof Omit<Section, 'students' | 'id'>, value: string | number) => {
    setNewSection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSection = () => {
    if (newSection.name && newSection.maxCapacity && selectedBatch) {
      // Create a unique ID for the section
      const sectionId = `${selectedBatch}-${newSection.name?.toLowerCase().replace(/\s+/g, '')}`;
      
      // Create the new section object
      const section: Section = {
        id: sectionId,
        name: newSection.name as string,
        maxCapacity: newSection.maxCapacity as number,
        students: []
      };
      
      // Update departments state with the new section
      setDepartments(prevDepartments => {
        return prevDepartments.map(dept => {
          if (dept.id === selectedDepartment) {
            return {
              ...dept,
              courses: dept.courses.map(course => {
                if (course.id === selectedCourse) {
                  return {
                    ...course,
                    batches: course.batches.map(batch => {
                      if (batch.id === selectedBatch) {
                        return {
                          ...batch,
                          sections: [...batch.sections, section]
                        };
                      }
                      return batch;
                    })
                  };
                }
                return course;
              })
            };
          }
          return dept;
        });
      });
      
      // Close the modal after adding
      closeAddSectionModal();
    }
  };

  const handleInputChange = (field: keyof Student, value: string) => {
    setNewStudent(prev => ({ ...prev, [field]: value }));
  };

  const generateRollNumber = (dept: string, course: string, batch: string) => {
    const yearCode = batch.slice(-2);
    const deptCode = dept.toUpperCase();
    const courseCode = course === "B.Tech" ? "" : course === "M.Tech" ? "M" : course.slice(0, 1);
    
    // Get existing roll numbers for this combination
    const existingStudents = getAllStudents().filter(s => 
      s.department === dept && s.course === course && s.batch === batch
    );
    
    const nextNumber = existingStudents.length + 1;
    return `${yearCode}${deptCode}${courseCode}${nextNumber.toString().padStart(3, '0')}`;
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.mobile && 
        newStudent.department && newStudent.course && newStudent.batch && newStudent.section) {
      
      const rollNumber = generateRollNumber(
        newStudent.department!, 
        newStudent.course!, 
        newStudent.batch!
      );

      const student: Student = {
        id: Date.now(),
        rollNumber,
        name: newStudent.name || "",
        email: newStudent.email || "",
        mobile: newStudent.mobile || "",
        department: newStudent.department || "",
        course: newStudent.course || "",
        batch: newStudent.batch || "",
        section: newStudent.section || "",
        gender: newStudent.gender || "",
        dob: newStudent.dob || "",
        address: newStudent.address || "",
        guardianName: newStudent.guardianName || "",
        guardianMobile: newStudent.guardianMobile || "",
        admissionDate: newStudent.admissionDate || "",
      };

      // Find and update the specific section
      setDepartments(prev => prev.map(dept => {
        if (dept.id === newStudent.department) {
          return {
            ...dept,
            courses: dept.courses.map(course => {
              if (course.id === newStudent.course) {
                return {
                  ...course,
                  batches: course.batches.map(batch => {
                    if (batch.id === newStudent.batch) {
                      return {
                        ...batch,
                        sections: batch.sections.map(section => {
                          if (section.id === newStudent.section) {
                            return {
                              ...section,
                              students: [...section.students, student]
                            };
                          }
                          return section;
                        })
                      };
                    }
                    return batch;
                  })
                };
              }
              return course;
            })
          };
        }
        return dept;
      }));

      closeAddStudentModal();
    }
  };

  return (
    <>
      <PageMeta
        title="Student Management | InfuniLMS"
        description="Manage students - Institute Administration"
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Student Management
            </h1>
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span 
                onClick={() => {
                  setSelectedDepartment("");
                  setSelectedCourse("");
                  setSelectedBatch("");
                  setSelectedSection("");
                }}
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 select-none"
                style={{ cursor: 'pointer' }}
              >
                All Departments
              </span>
              {selectedDepartment && (
                <>
                  <span>›</span>
                  <span 
                    onClick={() => {
                      setSelectedCourse("");
                      setSelectedBatch("");
                      setSelectedSection("");
                    }}
                    className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 select-none"
                    style={{ cursor: 'pointer' }}
                  >
                    {getCurrentDepartment()?.name}
                  </span>
                </>
              )}
              {selectedCourse && (
                <>
                  <span>›</span>
                  <span 
                    onClick={() => {
                      setSelectedBatch("");
                      setSelectedSection("");
                    }}
                    className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 select-none"
                    style={{ cursor: 'pointer' }}
                  >
                    {getCurrentCourse()?.name}
                  </span>
                </>
              )}
              {selectedBatch && (
                <>
                  <span>›</span>
                  <span 
                    onClick={() => setSelectedSection("")}
                    className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 select-none"
                    style={{ cursor: 'pointer' }}
                  >
                    Batch {getCurrentBatch()?.name}
                  </span>
                </>
              )}
              {selectedSection && (
                <>
                  <span>›</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {getCurrentSection()?.name}
                  </span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={openAddStudentModal}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 lg:px-6 xl:px-8 shadow-lg"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        </div>

        {/* Navigation Hierarchy */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Department Selection */}
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedCourse("");
                setSelectedBatch("");
                setSelectedSection("");
              }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white outline-none focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} - {dept.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Course Selection */}
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                console.log('Course selected:', e.target.value);
                setSelectedCourse(e.target.value);
                setSelectedBatch("");
                setSelectedSection("");
              }}
              disabled={!selectedDepartment}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
              style={{ cursor: !selectedDepartment ? 'default' : 'pointer' }}
            >
              <option value="">All Courses</option>
              {getCurrentDepartment()?.courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} - {course.fullName}
                </option>
              )) || []}
            </select>
          </div>

          {/* Batch Selection */}
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => {
                console.log('Batch selected:', e.target.value);
                setSelectedBatch(e.target.value);
                setSelectedSection("");
              }}
              disabled={!selectedDepartment || !selectedCourse}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
              style={{ cursor: (!selectedDepartment || !selectedCourse) ? 'default' : 'pointer' }}
            >
              <option value="">All Batches</option>
              {getCurrentCourse()?.batches?.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} ({batch.year})
                </option>
              )) || []}
            </select>
          </div>

          {/* Section Selection */}
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                console.log('Section selected:', e.target.value);
                setSelectedSection(e.target.value);
              }}
              disabled={!selectedDepartment || !selectedCourse || !selectedBatch}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
              style={{ cursor: (!selectedDepartment || !selectedCourse || !selectedBatch) ? 'default' : 'pointer' }}
            >
              <option value="">All Sections</option>
              {getCurrentBatch()?.sections?.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name} ({section.students.length}/{section.maxCapacity})
                </option>
              )) || []}
            </select>
          </div>
        </div>

        {/* Department Overview Cards */}
        {!selectedDepartment && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">All Departments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <div 
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-boxdark select-none"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {dept.courses.length} course{dept.courses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{dept.fullName}</p>
                  <div className="flex flex-wrap gap-1">
                    {dept.courses.map((course) => (
                      <span key={course.id} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Overview Cards */}
        {selectedDepartment && !selectedCourse && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setSelectedDepartment("")}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium select-none"
                style={{ cursor: 'pointer' }}
              >
                ← Back to Departments
              </button>
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              {getCurrentDepartment()?.name} - Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentDepartment()?.courses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-boxdark select-none"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{course.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.batches.length} batch{course.batches.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Duration: {course.duration}</p>
                  <div className="flex flex-wrap gap-1">
                    {course.batches.map((batch) => (
                      <span key={batch.id} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full">
                        {batch.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Batch Overview Cards */}
        {selectedCourse && !selectedBatch && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setSelectedCourse("")}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium select-none"
                style={{ cursor: 'pointer' }}
              >
                ← Back to Courses
              </button>
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              {getCurrentDepartment()?.name} {getCurrentCourse()?.name} - Batches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentCourse()?.batches.map((batch) => (
                <div 
                  key={batch.id}
                  onClick={() => setSelectedBatch(batch.id)}
                  className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-boxdark select-none"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Batch {batch.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {batch.sections.length} section{batch.sections.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{batch.year}</p>
                  <div className="space-y-1">
                    {batch.sections.map((section) => (
                      <div key={section.id} className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">{section.name}</span>
                        <span className="text-gray-500 dark:text-gray-500">
                          {section.students.length}/{section.maxCapacity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Overview Cards */}
        {selectedBatch && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setSelectedBatch("")}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium select-none"
                style={{ cursor: 'pointer' }}
              >
                ← Back to Batches
              </button>
              <button
                onClick={openAddSectionModal}
                className="inline-flex items-center justify-center rounded-md bg-green-600 py-2 px-4 text-center font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm"
                style={{ cursor: 'pointer' }}
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Section
              </button>
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              {getCurrentDepartment()?.name} {getCurrentCourse()?.name} Batch {getCurrentBatch()?.name} - Sections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentBatch()?.sections.map((section) => (
                <div 
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`cursor-pointer rounded-lg border p-4 hover:shadow-lg transition-all duration-200 select-none ${
                    selectedSection === section.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-boxdark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{section.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      section.students.length >= section.maxCapacity 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : section.students.length >= section.maxCapacity * 0.8
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {section.students.length >= section.maxCapacity ? 'Full' : 'Available'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Students: {section.students.length}</span>
                    <span>Capacity: {section.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        section.students.length >= section.maxCapacity 
                          ? 'bg-red-600' 
                          : section.students.length >= section.maxCapacity * 0.8
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${(section.students.length / section.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                  {section.students.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Click to view {section.students.length} student{section.students.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  {selectedSection === section.id && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSection("");
                        }}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View All Sections
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {selectedSection ? `Students in ${getCurrentSection()?.name}` :
                   selectedBatch ? `All Students in Batch ${getCurrentBatch()?.name}` :
                   selectedCourse ? `All Students in ${getCurrentCourse()?.name}` :
                   selectedDepartment ? `All Students in ${getCurrentDepartment()?.name}` :
                   'All Students'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedSection && getCurrentSection() ? 
                    `${getCurrentSection()?.students.length} of ${getCurrentSection()?.maxCapacity} capacity used` :
                    `Total: ${getFilteredStudents().length} students`
                  }
                </p>
              </div>
              {(selectedDepartment || selectedCourse || selectedBatch || selectedSection) && (
                <button
                  onClick={() => {
                    setSelectedDepartment("");
                    setSelectedCourse("");
                    setSelectedBatch("");
                    setSelectedSection("");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Course Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Guardian
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-boxdark divide-y divide-gray-200 dark:divide-gray-700">
                {getFilteredStudents().length > 0 ? (
                  getFilteredStudents().map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <div className="font-medium">{student.department} {student.course}</div>
                          <div>Batch {student.batch} • Section {student.section}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <div className="font-medium">{student.guardianName}</div>
                          <div>{student.guardianMobile}</div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Section Modal */}
        {isAddSectionModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Add New Section
                  </h3>
                  <button
                    onClick={closeAddSectionModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Section Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Section Name *
                    </label>
                    <input
                      type="text"
                      value={newSection.name || ""}
                      onChange={(e) => handleSectionInputChange('name', e.target.value)}
                      placeholder="Section A"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Section Capacity */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maximum Capacity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={newSection.maxCapacity || 60}
                      onChange={(e) => handleSectionInputChange('maxCapacity', parseInt(e.target.value, 10))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <button
                      onClick={addSection}
                      disabled={!newSection.name || !newSection.maxCapacity}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow transition-colors"
                      style={{ cursor: (!newSection.name || !newSection.maxCapacity) ? 'default' : 'pointer' }}
                    >
                      Add Section
                    </button>
                    <button
                      onClick={closeAddSectionModal}
                      className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 font-medium shadow transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Student Modal */}
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Add New Student
                  </h3>
                  <button
                    onClick={closeAddStudentModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      value={newStudent.name || ""}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newStudent.email || ""}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="student@student.infuni.edu"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={newStudent.mobile || ""}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Gender *
                    </label>
                    <select
                      value={newStudent.gender || ""}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={newStudent.dob || ""}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Admission Date */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admission Date *
                    </label>
                    <input
                      type="date"
                      value={newStudent.admissionDate || ""}
                      onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Department *
                    </label>
                    <select
                      value={newStudent.department || ""}
                      onChange={(e) => {
                        handleInputChange('department', e.target.value);
                        handleInputChange('course', '');
                        handleInputChange('batch', '');
                        handleInputChange('section', '');
                      }}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} - {dept.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Course *
                    </label>
                    <select
                      value={newStudent.course || ""}
                      onChange={(e) => {
                        handleInputChange('course', e.target.value);
                        handleInputChange('batch', '');
                        handleInputChange('section', '');
                      }}
                      disabled={!newStudent.department}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                      style={{ cursor: !newStudent.department ? 'default' : 'pointer' }}
                    >
                      <option value="">Select Course</option>
                      {departments.find(d => d.id === newStudent.department)?.courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} - {course.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Batch */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Batch *
                    </label>
                    <select
                      value={newStudent.batch || ""}
                      onChange={(e) => {
                        handleInputChange('batch', e.target.value);
                        handleInputChange('section', '');
                      }}
                      disabled={!newStudent.course}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                      style={{ cursor: !newStudent.course ? 'default' : 'pointer' }}
                    >
                      <option value="">Select Batch</option>
                      {departments.find(d => d.id === newStudent.department)?.courses.find(c => c.id === newStudent.course)?.batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name} ({batch.year})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Section *
                    </label>
                    <select
                      value={newStudent.section || ""}
                      onChange={(e) => handleInputChange('section', e.target.value)}
                      disabled={!newStudent.batch}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                      style={{ cursor: !newStudent.batch ? 'default' : 'pointer' }}
                    >
                      <option value="">Select Section</option>
                      {departments.find(d => d.id === newStudent.department)?.courses.find(c => c.id === newStudent.course)?.batches.find(b => b.id === newStudent.batch)?.sections.map((section) => (
                        <option key={section.id} value={section.id} disabled={section.students.length >= section.maxCapacity}>
                          {section.name} ({section.students.length}/{section.maxCapacity}) {section.students.length >= section.maxCapacity ? '- Full' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guardian Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Name *
                    </label>
                    <input
                      type="text"
                      value={newStudent.guardianName || ""}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      placeholder="Mr./Mrs. Guardian Name"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Guardian Mobile */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Mobile *
                    </label>
                    <input
                      type="tel"
                      value={newStudent.guardianMobile || ""}
                      onChange={(e) => handleInputChange('guardianMobile', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address *
                  </label>
                  <textarea
                    value={newStudent.address || ""}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Complete address with city, state, and postal code..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={addStudent}
                    disabled={!newStudent.name || !newStudent.email || !newStudent.mobile || !newStudent.department || !newStudent.course || !newStudent.batch || !newStudent.section}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                  >
                    Add Student
                  </button>
                  <button
                    onClick={closeAddStudentModal}
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
