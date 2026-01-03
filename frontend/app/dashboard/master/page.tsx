export default function MasterDashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Fengshui Master Dashboard</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          Environment: <strong>UAT</strong> - Test your services here before admin approval
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">My Services</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Approval</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Services (UAT)</h2>
            <button className="px-4 py-2 bg-purple-600 text-white rounded">
              Create New Service
            </button>
          </div>
          <p className="text-gray-600">Your services will appear here</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600">Manage your profile and credentials</p>
        </section>
      </div>
    </main>
  );
}
