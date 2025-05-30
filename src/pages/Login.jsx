import { useState } from "react";
import { saveUser } from "../utils/localStorage";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      const user = { username };
      saveUser(user);
      onLogin(user);
    }
  };

  return (
    <div className="max-w-4xl m-auto flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Masukkan namamu"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Mulai
        </button>
      </form>
    </div>
  );
}

export default Login;
