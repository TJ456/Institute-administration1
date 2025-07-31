import { useState } from "react";
import PageMeta from "../components/common/PageMeta";

interface Teacher {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
  facultyId: string;
  department: string;
  qualification: string;
  gender: string;
  dob: string;
  address: string;
  experience: string;
}

export default function TeacherPage() {
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: "",
    email: "",
    password: "",
    mobile: "",
    facultyId: "",
    department: "",
    qualification: "",
    gender: "",
    dob: "",
    address: "",
    experience: "",
  });

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@infuni.edu",
      password: "RK@2024",
      mobile: "+91 9876543210",
      facultyId: "FAC001",
      department: "IT",
      qualification: "Ph.D. Computer Science",
      gender: "Male",
      dob: "1985-05-15",
      address: "123 Tech Street, Bangalore, Karnataka, India - 560001",
      experience: "15 years",
    },
    {
      id: 2,
      name: "Prof. Priya Sharma",
      email: "priya.sharma@infuni.edu",
      password: "PS@2024",
      mobile: "+91 9876543211",
      facultyId: "FAC002",
      department: "ECE",
      qualification: "M.Tech Electronics",
      gender: "Female",
      dob: "1990-08-22",
      address: "456 Innovation Park, Hyderabad, Telangana, India - 500032",
      experience: "12 years",
    },
    {
      id: 3,
      name: "Dr. Amit Singh",
      email: "amit.singh@infuni.edu",
      password: "AS@2024",
      mobile: "+91 9876543212",
      facultyId: "FAC003",
      department: "EEE",
      qualification: "Ph.D. Electrical Engineering",
      gender: "Male",
      dob: "1982-12-10",
      address: "789 University Avenue, Chennai, Tamil Nadu, India - 600036",
      experience: "18 years",
    },
    {
      id: 4,
      name: "Dr. Neha Gupta",
      email: "neha.gupta@infuni.edu",
      password: "NG@2024",
      mobile: "+91 9876543213",
      facultyId: "FAC004",
      department: "CIVIL",
      qualification: "Ph.D. Civil Engineering",
      gender: "Female",
      dob: "1988-03-18",
      address: "321 Campus Road, Pune, Maharashtra, India - 411007",
      experience: "8 years",
    },
  ]);

  const departments = ["IT", "ECE", "EEE", "CIVIL", "MECHANICAL"];

  const openAddTeacherModal = () => {
    setIsAddTeacherModalOpen(true);
  };

  const closeAddTeacherModal = () => {
    setIsAddTeacherModalOpen(false);
    setNewTeacher({
      name: "",
      email: "",
      password: "",
      mobile: "",
      facultyId: "",
      department: "",
      qualification: "",
      gender: "",
      dob: "",
      address: "",
      experience: "",
    });
  };

  const handleInputChange = (field: keyof Teacher, value: string) => {
    setNewTeacher(prev => ({ ...prev, [field]: value }));
  };

  const addTeacher = () => {
    if (newTeacher.name && newTeacher.email && newTeacher.password && newTeacher.mobile) {
      const teacher: Teacher = {
        id: Date.now(),
        name: newTeacher.name || "",
        email: newTeacher.email || "",
        password: newTeacher.password || "",
        mobile: newTeacher.mobile || "",
        facultyId: newTeacher.facultyId || "",
        department: newTeacher.department || "",
        qualification: newTeacher.qualification || "",
        gender: newTeacher.gender || "",
        dob: newTeacher.dob || "",
        address: newTeacher.address || "",
        experience: newTeacher.experience || "",
      };
      setTeachers(prev => [...prev, teacher]);
      closeAddTeacherModal();
    }
  };

  return (
    <>
      <PageMeta
        title="Teacher Management | InfuniLMS"
        description="Manage teachers and faculty members - Institute Administration"
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Teacher Management
          </h1>
          <button
            onClick={openAddTeacherModal}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 lg:px-6 xl:px-8 shadow-lg"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Teacher
          </button>
        </div>

        {/* Teachers Table */}
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Faculty Members
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gmail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mobile Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-boxdark divide-y divide-gray-200 dark:divide-gray-700">
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {teacher.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {teacher.department} • {teacher.qualification}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                        {teacher.password}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {teacher.mobile}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No teachers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Teacher Modal */}
        {isAddTeacherModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 relative z-[100000]">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Add New Teacher
                  </h3>
                  <button
                    onClick={closeAddTeacherModal}
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
                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newTeacher.email || ""}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="teacher@infuni.edu"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password *
                    </label>
                    <input
                      type="text"
                      value={newTeacher.password || ""}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Faculty ID */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Faculty ID *
                    </label>
                    <input
                      type="text"
                      value={newTeacher.facultyId || ""}
                      onChange={(e) => handleInputChange('facultyId', e.target.value)}
                      placeholder="FAC001"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Faculty Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Faculty Name *
                    </label>
                    <input
                      type="text"
                      value={newTeacher.name || ""}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Dr. John Doe"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Department *
                    </label>
                    <select
                      value={newTeacher.department || ""}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Qualification *
                    </label>
                    <input
                      type="text"
                      value={newTeacher.qualification || ""}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      placeholder="Write experience"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Gender *
                    </label>
                    <select
                      value={newTeacher.gender || ""}
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
                      value={newTeacher.dob || ""}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
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
                      value={newTeacher.mobile || ""}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Experience *
                    </label>
                    <input
                      type="text"
                      value={newTeacher.experience || ""}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="10 years"
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
                    value={newTeacher.address || ""}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Complete address with city, state, and postal code..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={addTeacher}
                    disabled={!newTeacher.name || !newTeacher.email || !newTeacher.password || !newTeacher.mobile}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg transition-colors"
                  >
                    Add Teacher
                  </button>
                  <button
                    onClick={closeAddTeacherModal}
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
