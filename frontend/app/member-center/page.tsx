"use client";

import { useEffect, useState } from "react";
import { Award, TrendingUp, Calendar, Camera } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 性別與等級顯示對照表
const genderLabels = { M: "男", F: "女", X: "其他" };
const levelLabels = {
  Green: "綠卡會員",
  Silver: "銀卡會員",
  Gold: "金卡會員",
  Platinum: "白金會員",
};

export default function MemberInfoPage() {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 新增：頭像功能所需 state
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  // ✅ 取得登入會員資料
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
        if (!data.ok) {
          router.push("/member-center/login");
          return;
        }

        const m = data.member;
        setMember({
          memberId: m.memberId,
          firstName: m.firstName || "",
          lastName: m.lastName || "",
          gender: m.gender || null,
          birthDate: m.birthDate || null,
          phoneNumber: m.phoneNumber || null,
          address: m.address || null,
          email: m.email,
          level: m.membershipLevel || "Green",
          points: 15000,
          registerDate: m.createdAt || "2024-01-01",
          lastLogin: m.lastLogin || new Date().toISOString(),
          avatarChoice: m.avatarChoice,
          avatar: {
            imagePath: "/diverse-user-avatars.png", // 預設頭像
            label: "會員頭像",
          },
        });
      })
      .catch(() => router.push("/member-center/login"))
      .finally(() => setLoading(false));
  }, [router]);

  // ✅ 撈頭像圖庫
  useEffect(() => {
    fetch("http://localhost:3007/api/auth/avatars")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setAvatarOptions(data.avatars);
      });
  }, []);

  // ✅ 更新頭像 API
  const handleSaveAvatar = async () => {
    if (!selectedAvatar || !member) return;
    const selected = avatarOptions.find(
      (a) => a.imagePath === selectedAvatar
    );
    if (!selected) return;

    try {
      const res = await fetch("http://localhost:3007/api/auth/update-avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: member.memberId,
          avatarChoice: selected.avatarId,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMember((prev: any) => ({
          ...prev,
          avatar: { imagePath: selected.imagePath, label: selected.label },
        }));
        alert("✅ 頭像已更新！");
        setIsAvatarModalOpen(false);
      }
    } catch (err) {
      console.error("更新頭像錯誤:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#1F2E3C]">
        資料載入中...
      </div>
    );

  if (!member)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#B91C1C]">
        無法取得會員資料，請重新登入。
      </div>
    );

  // ✅ 計算全名
  const fullName = `${member.lastName || ""}${member.firstName || ""}`;

  return (
    <>
      <div className="bg-white rounded-b-lg shadow-sm">
        <div className="flex flex-col lg:flex-row min-h-[300px]">
          {/* ✅ 左側基本資料 */}
          <div className="w-full lg:w-[235px] border-b lg:border-b-0 lg:border-r-2 border-[#D4D4D4] p-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={member.avatar.imagePath}
                alt={member.avatar.label}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#DCBB87]"
              />
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-0 right-0 bg-[#DCBB87] hover:bg-[#C5A872] text-[#1F2E3C] p-2 rounded-full shadow-md"
              >
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-[#1F2E3C] mt-3 mb-2 text-center text-sm lg:text-base">
              {fullName || "未填寫姓名"}
            </h3>
            <div className="px-3 py-1 rounded-full text-xs bg-[#DCBB87] text-[#1F2E3C]">
              {levelLabels[member.level]}
            </div>

            {/* 小資訊 */}
            <div className="mt-6 w-full space-y-4 border-t border-[#E5E5E5] pt-4">
              <div className="flex items-center gap-3">
                <Award className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] text-[#999]">會員編號</div>
                  <div className="text-xs">{member.memberId}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] text-[#999]">會員積分</div>
                  <div className="text-xs">
                    {member.points.toLocaleString()} 點
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] text-[#999]">註冊日期</div>
                  <div className="text-xs">
                    {new Date(member.registerDate).toLocaleDateString("zh-TW")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ 右側詳細資料 */}
          <div className="flex-1 p-6 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              <div>
                <div className="text-xs text-[#666] mb-1">姓名</div>
                <div>{fullName || "未填寫"}</div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">性別</div>
                <div>
                  {member.gender ? genderLabels[member.gender] : "未設定"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">生日</div>
                <div>
                  {member.birthDate
                    ? new Date(member.birthDate).toLocaleDateString("zh-TW")
                    : "未填寫"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">電話</div>
                <div>{member.phoneNumber || "未填寫"}</div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <div className="text-xs text-[#666] mb-1">Email</div>
                <div>{member.email}</div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <div className="text-xs text-[#666] mb-1">地址</div>
                <div>{member.address || "未填寫"}</div>
              </div>
            </div>

            <Link
              href="/member-center/profile"
              className="absolute lg:bottom-6 lg:right-6 mt-6 px-5 py-2 text-sm bg-[#DCBB87] text-[#1F2E3C] hover:bg-[#C5A872] rounded-full transition-colors text-center"
            >
              更改
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ 頭像選擇 Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-[420px]">
            <h2 className="text-lg font-semibold text-[#1F2E3C] mb-4">
              選擇你的頭像
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
              {avatarOptions.map((a) => (
                <img
                  key={a.avatarId}
                  src={a.imagePath}
                  alt={a.label}
                  className={`w-20 h-20 rounded-full cursor-pointer border-4 transition ${
                    selectedAvatar === a.imagePath
                      ? "border-[#DCBB87]"
                      : "border-transparent hover:border-[#BA9A60]"
                  }`}
                  onClick={() => setSelectedAvatar(a.imagePath)}
                />
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="px-4 py-2 text-[#1F2E3C] border border-gray-300 rounded hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleSaveAvatar}
                className="px-4 py-2 bg-[#DCBB87] text-[#1F2E3C] rounded hover:bg-[#C5A872]"
              >
                儲存變更
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
