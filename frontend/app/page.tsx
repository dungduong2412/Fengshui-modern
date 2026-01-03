export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Fengshui Modern</h1>
      <p className="text-lg mb-6">
        Welcome to Fengshui Modern - Your trusted platform for Fengshui services
      </p>
      
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Approved Services</h2>
          <p className="text-gray-600">Services will be listed here</p>
        </section>
        
        <div className="flex gap-4 mt-8">
          <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
            Login
          </a>
          <a href="/signup/customer" className="px-4 py-2 bg-green-600 text-white rounded">
            Sign up as Customer
          </a>
          <a href="/signup/master" className="px-4 py-2 bg-purple-600 text-white rounded">
            Sign up as Fengshui Master
          </a>
        </div>
      </div>
    </main>
  );
}
