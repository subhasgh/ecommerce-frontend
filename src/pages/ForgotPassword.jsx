import React, { useState }from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('Please enter your email.');
      return;
    }

    try {
      const response = await fetch('/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('A reset link has been sent to your email.');
      } else {
        setStatus('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
   <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-600">
          Enter your registered email address. We will send you a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
