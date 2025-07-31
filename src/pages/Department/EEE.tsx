import PageMeta from "../../components/common/PageMeta";

export default function EEEDepartment() {
  return (
    <>
      <PageMeta
        title="EEE Department | InfuniLMS"
        description="Electrical & Electronics Engineering Department - Institute Administration"
      />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            EEE Department
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Electrical Engineering
                </h4>
                <span className="text-sm font-medium">Power Systems</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Electronics Engineering
                </h4>
                <span className="text-sm font-medium">Control Systems</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Power Electronics
                </h4>
                <span className="text-sm font-medium">Advanced Systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
