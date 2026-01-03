export default function MasterSignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign up as Fengshui Master</h1>
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            Note: Your account will require admin approval before you can create services.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block mb-2">Credentials / Certification</label>
            <textarea 
              className="w-full px-4 py-2 border rounded"
              placeholder="Describe your qualifications"
              rows={4}
            />
          </div>
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded"
          >
            Submit for Approval
          </button>
        </form>
      </div>
    </main>
  );
}
