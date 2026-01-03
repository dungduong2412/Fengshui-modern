export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Masters</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Services</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Approval Queue</h2>
          <p className="text-gray-600">Pending approvals will appear here</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
          <p className="text-gray-600">User monitoring and audit logs</p>
        </section>
      </div>
    </main>
  );
}
