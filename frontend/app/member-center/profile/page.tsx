"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";
import SectionCard from "../components/SectionCard";

export default function ProfilePage() {
  const router = useRouter();

  // ✅ 密碼變更狀態
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");

  // ✅ 密碼變更功能
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPwd) {
      setPwdMessage("請填寫所有欄位");
      return;
    }
    if (newPassword !== confirmPwd) {
      setPwdMessage("新密碼與確認密碼不一致");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3007/api/auth/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (data.ok) {
        setPwdMessage("密碼更新成功！");
        setTimeout(() => {
          setShowPwdModal(false);
          setOldPassword("");
          setNewPassword("");
          setConfirmPwd("");
          setPwdMessage("");
        }, 1000);
      } else {
        setPwdMessage(data.message || "變更失敗");
      }
    } catch (error) {
      setPwdMessage("伺服器錯誤，請稍後再試");
    }
  };

  // ✅ 會員資料狀態
  const [formData, setFormData] = useState({
    memberId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
    gender: "X",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ 撈會員資料
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/member-center/login");
      return;
    }

    fetch("http://localhost:3007/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const m = data.member;
          setFormData({
            memberId: m.memberId?.toString() || "",
            firstName: m.firstName || "",
            lastName: m.lastName || "",
            email: m.email || "",
            phoneNumber: m.phoneNumber || "",
            address: m.address || "",
            birthDate: m.birthDate ? m.birthDate.split("T")[0] : "",
            gender: m.gender || "X",
          });
        } else {
          setMessage("無法載入會員資料");
        }
      })
      .catch(() => setMessage("伺服器錯誤"))
      .finally(() => setLoading(false));
  }, [router]);

  // ✅ 儲存修改
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setMessage("儲存中...");

    const res = await fetch("http://localhost:3007/api/auth/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: formData.memberId,
        gender: formData.gender,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      }),
    });

    const data = await res.json();
    if (data.ok) {
      setMessage("資料已更新！");
      setTimeout(() => router.push("/member-center"), 1200);
    } else {
      setMessage(data.message || "更新失敗");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#666] text-lg">
        資料載入中...
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 bg-[#F5F6F7] min-h-screen">
      {/* 返回導覽 */}
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft
          className="cursor-pointer text-[#1F2E3C] hover:text-[#DCBB87] transition"
          onClick={() => router.push("/member-center")}
        />
        <h1 className="text-2xl font-semibold text-[#1F2E3C]">編輯會員資料</h1>
      </div>

      {/* 訊息提示 */}
      {message && (
        <div className="text-center text-sm py-2 rounded bg-[#DCBB87] text-[#1F2E3C]">
          {message}
        </div>
      )}

      {/* 個人資料 */}
      <SectionCard title="個人資料">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-[#666] mb-2 block">姓氏</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#666] mb-2 block">名字</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#666] mb-2 block">Email（不可修改）</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-[#C5C8C8] bg-gray-100 cursor-not-allowed rounded"
            />
          </div>

          <div>
            <label className="text-sm text-[#666] mb-2 block">電話號碼</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
            />
          </div>

          <div>
            <label className="text-sm text-[#666] mb-2 block">生日</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
            />
          </div>

          <div>
            <label className="text-sm text-[#666] mb-2 block">性別</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
            >
              <option value="M">男</option>
              <option value="F">女</option>
              <option value="X">其他</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#666] mb-2 block">地址</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-[#C5C8C8] rounded focus:border-[#DCBB87]"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#DCBB87] hover:bg-[#C5A872] text-[#1F2E3C] rounded transition-colors"
            >
              儲存變更
            </button>
            <button
              onClick={() => router.push("/member-center")}
              className="px-6 py-2 border border-[#C5C8C8] hover:bg-gray-100 text-[#666] rounded transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </SectionCard>

      {/* 密碼設定 */}
      <SectionCard title="密碼設定">
        <div className="flex items-start gap-4">
          <Lock className="text-[#DCBB87] mt-1" size={20} />
          <div className="flex-1">
            <p className="text-sm text-[#666] mb-4">
              為了您的帳戶安全，建議定期更新密碼。
            </p>
            <button
              onClick={() => setShowPwdModal(true)}
              className="px-6 py-2 border border-[#DCBB87] hover:bg-[#DCBB87] text-[#DCBB87] hover:text-[#1F2E3C] rounded transition-colors"
            >
              變更密碼
            </button>
          </div>
        </div>

        {showPwdModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
              <h2 className="text-lg font-semibold text-[#1F2E3C] mb-4">變更密碼</h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-sm text-[#666] block mb-1">舊密碼</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-[#C5C8C8] rounded px-3 py-2 focus:border-[#DCBB87]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#666] block mb-1">新密碼</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-[#C5C8C8] rounded px-3 py-2 focus:border-[#DCBB87]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#666] block mb-1">確認新密碼</label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="w-full border border-[#C5C8C8] rounded px-3 py-2 focus:border-[#DCBB87]"
                  />
                </div>
              </div>

              {pwdMessage && (
                <p
                  className={`text-sm mb-3 ${
                    pwdMessage.includes("成功")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {pwdMessage}
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPwdModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  取消
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-[#DCBB87] text-[#1F2E3C] rounded hover:bg-[#C5A872]"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
