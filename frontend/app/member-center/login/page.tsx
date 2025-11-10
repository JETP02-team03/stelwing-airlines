// // 🔹2️⃣ /login（登入）

// // 後端的工作：接收 email、password → 查資料庫 → 驗證密碼 → 回傳 JWT token。

// // 前端要做的：
// // 做一個「登入頁面」（例如 member-center/login/page.tsx），
// // 表單填帳號密碼 → 送出 → 拿到 token → 存在 localStorage（或 cookie）。
// "use client";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     const res = await fetch("http://localhost:3001/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("token", data.token);
//       setMessage("登入成功！");
//     } else {
//       setMessage(data.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
//         <h1 className="text-2xl font-bold mb-4 text-center">會員登入</h1>
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           type="password"
//           placeholder="密碼"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white p-2 rounded w-full"
//         >
//           登入
//         </button>
//         <p className="text-center mt-3 text-gray-700">{message}</p>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3007/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMessage("登入成功！");
      router.push("/member-center"); // 登入成功後回會員中心
    } else {
      setMessage(data.message || "登入失敗");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">會員登入</h1>
     <form onSubmit={handleLogin}>
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 rounded"
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          登入
        </button>
        </form>
        <p className="text-center mt-3 text-gray-700">{message}</p>
      </div>
    </div>
  );
}
