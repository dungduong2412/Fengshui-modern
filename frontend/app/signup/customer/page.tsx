export default function CustomerSignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign up as Customer</h1>
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
            <label className="block mb-2">Date of Birth</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select className="w-full px-4 py-2 border rounded">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
