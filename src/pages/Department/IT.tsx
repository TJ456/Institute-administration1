import PageMeta from "../../components/common/PageMeta";

export default function ITDepartment() {
  return (
    <>
      <PageMeta
        title="IT Department | InfuniLMS"
        description="Information Technology Department - Institute Administration"
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            IT Department
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Computer Science & Engineering
                </h4>
                <span className="text-sm font-medium">Core Department</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Information Technology
                </h4>
                <span className="text-sm font-medium">Specialized Branch</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Software Engineering
                </h4>
                <span className="text-sm font-medium">Advanced Program</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
