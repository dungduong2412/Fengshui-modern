export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
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
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
