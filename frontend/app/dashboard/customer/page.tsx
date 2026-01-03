export default function CustomerDashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Available Services</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white border rounded shadow">
          <h3 className="text-lg font-semibold mb-2">My Consultations</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Browse Services</h2>
          <p className="text-gray-600">Approved Fengshui services will appear here</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          <div className="p-4 bg-white border rounded">
            <p className="text-sm text-gray-600">
              Keep your profile complete for accurate consultations:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>✓ Date of Birth</li>
              <li>✓ Gender</li>
              <li>✓ Contact Information</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
