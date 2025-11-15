"use client";

import { useEffect, useState } from "react";
import { Award, TrendingUp, Calendar, Camera } from "lucide-react"; // ✅【新增】Camera
import Link from "next/link";
import { useRouter } from "next/navigation";
import MileageOverview from "./components/MileageOverview";
import MileageTabs from "./components/MileageTabs";
import MileageTable from "./components/MileageTable";

// ✅【保留】性別與等級顯示對照表
const genderLabels = { male: "男", female: "女", other: "其他", M: "男", F: "女", X: "其他" };
const levelLabels = { Green: "普卡會員", Silver: "銀卡會員", Gold: "金卡會員", Platinum: "白金會員" };

export default function MemberInfoPage() {
  const router = useRouter();

  // ✅【保留】會員資料（動態）
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("rule");
  // =========================
  // ✅【新增】頭像彈窗所需狀態
  // =========================
  const [avatarOptions, setAvatarOptions] = useState<any[]>([]);          // ✅ 圖庫清單
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);      // ✅ Modal 開關
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null); // ✅ 選擇中的 avatarId

  // ✅【保留】載入會員資料
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

        // ⚠️ /verify 目前只回傳基本欄位（你後端的 select）
        //    這裡先用安全預設，之後你擴充 /verify 回傳 avatar 資料就會自動帶出
        setMember({
          memberId: data.member.memberId,
          name: `${data.member.lastName || ""}${data.member.firstName || ""}`,
          email: data.member.email,
          level: data.member.membershipLevel || "Green",
          mileage: data.member.mileage || 0, // ✅ 從後端撈哩程
          gender: data.member.gender || "other",
          birthDate: data.member.birthDate || "",
          phone: data.member.phoneNumber || "",
          address: data.member.address || "",
          registerDate: data.member.createdAt || "",
          lastLogin: data.member.lastLogin || "",
          avatar: {
            imagePath: data.member.avatar?.imagePath || "/avatars/default.png",
            label: data.member.avatar?.label || "預設頭像",
          },
        });
      })
      .catch(() => router.push("/member-center/login"))
      .finally(() => setLoading(false));
  }, [router]);

  // =========================
  // ✅【新增】載入頭像圖庫（只跑一次）
  // =========================
  useEffect(() => {
    fetch("http://localhost:3007/api/auth/avatars")
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok) setAvatarOptions(data.avatars || []);
      })
      .catch((err) => console.error("頭像圖庫載入錯誤:", err));
  }, []);

  // =========================
  // ✅【新增】開啟頭像 Modal（預選現在的 avatarChoice）
  // =========================
  const openAvatarModal = () => {
    if (member?.avatarChoice) {
      setSelectedAvatarId(Number(member.avatarChoice));
    } else {
      setSelectedAvatarId(null);
    }
    setIsAvatarModalOpen(true);
  };

  // =========================
  // ✅【新增】儲存頭像
  // =========================
  const handleSaveAvatar = async () => {
    if (!member || !selectedAvatarId) return;

    try {
      const res = await fetch("http://localhost:3007/api/auth/update-avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: member.memberId,
          avatarChoice: selectedAvatarId,
        }),
      });

      const data = await res.json();

      if (data?.ok) {
        // 從圖庫找出選取的那一張，更新本地狀態
        const newly = avatarOptions.find((a) => a.avatarId === selectedAvatarId);
        setMember((prev: any) => ({
          ...prev,
          avatarChoice: selectedAvatarId,
          avatar: newly
            ? { imagePath: newly.imagePath, label: newly.label }
            : prev.avatar,
        }));
        setIsAvatarModalOpen(false);
      } else {
        alert(data?.message || "更新頭像失敗");
      }
    } catch (err) {
      console.error("更新頭像錯誤:", err);
      alert("伺服器連線錯誤，請稍後再試");
    }
  };

  // ✅【保留】載入中/錯誤顯示
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#1F2E3C]">
        資料載入中...
      </div>
    );
  if (!member)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#B91C1C]">
        無法取得會員資料，請重新登入
      </div>
    );

  return (
    <>
      <div className="bg-white rounded-b-lg shadow-sm">
        <div className="flex flex-col lg:flex-row min-h-[300px]">
          {/* 左側基本資料 */}
          <div className="w-full lg:w-[235px] border-b lg:border-b-0 lg:border-r-2 border-[#D4D4D4] p-6 flex flex-col items-center">
            {/* =========================
                ✅【修改】頭像可點擊，右下角加相機鈕 → 開啟 Modal
               ========================= */}
            <div className="relative">
              <img
                src={member.avatar.imagePath}
                alt={member.avatar.label}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-[#DCBB87] mb-4 cursor-pointer hover:opacity-80 transition"
                onClick={openAvatarModal} // ✅ 點頭像開彈窗
              />
              <button
                type="button"
                onClick={openAvatarModal}
                className="absolute bottom-2 right-2 bg-[#DCBB87] hover:bg-[#C5A872] text-[#1F2E3C] p-2 rounded-full shadow"
                aria-label="更換頭像"
              >
                <Camera size={16} />
              </button>
            </div>

            <h3 className="text-[#1F2E3C] -mt-1 mb-2 text-center text-sm lg:text-base">
              {member.name || "未填寫姓名"}
            </h3>
            <div className="px-3 py-1 rounded-full text-xs lg:text-sm bg-[#DCBB87] text-[#1F2E3C]">
              {levelLabels[member.level] || "一般會員"}
            </div>

            {/* Info group */}
            <div className="mt-6 w-full space-y-4 border-t border-[#E5E5E5] pt-4">
              <div className="flex items-center gap-3">
                <Award className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">會員編號</div>
                  <div className="text-xs lg:text-sm">
                    ST-{String(member.memberId).padStart(6, '0')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] text-[#999]">哩程數</div>
                  <div className="text-xs">{member.mileage?.toLocaleString() || 0} 哩</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">註冊日期</div>
                  <div className="text-xs lg:text-sm">
                    {member.registerDate
                      ? new Date(member.registerDate).toLocaleDateString("zh-TW")
                      : "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">最後登入</div>
                  <div className="text-xs lg:text-sm">
                    {member.lastLogin
                    ? new Date(member.lastLogin).toLocaleString("zh-TW")
                    : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側詳細資料 */}
          <div className="flex-1 p-6 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              <div>
                <div className="text-xs text-[#666] mb-1">姓名</div>
                <div>{member.name || "未填寫"}</div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">性別</div>
                <div>{genderLabels[member.gender as keyof typeof genderLabels] || "未設定"}</div>
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
                <div>{member.phone || "未填寫"}</div>
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

            {/* ✅ 保留你的 UI：更改 → 前往 profile */}
            <Link
              href="/member-center/profile"
              className="
                absolute lg:bottom-6 lg:right-6
                mt-6 lg:mt-0
                px-5 py-2 text-sm
                bg-[#DCBB87] text-[#1F2E3C]
                hover:bg-[#C5A872]
                rounded-full
                transition-colors
                text-center
              "
            >
              修改
            </Link>
          </div>
        </div>
      </div>
      {/* --- 哩程系統 --- */}
      <MileageOverview
        mileage={member.mileage}
        level={levelLabels[member.level]}
        nextLevelPercent={12}
      />

      <MileageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "rule" && (
        <div className="p-6 border border-[#BA9A60] rounded-xl mt-4">
          <h3 className="font-semibold text-[#1F2E3C] mb-3">哩程說明</h3>
          <ul className="text-sm text-[#444] space-y-2">
            <li>．每消費 NT$30 可累積 1 哩程</li>
            <li>．哩程可用於兌換機票、升等、免稅商品等優惠</li>
            <li>．哩程有效期限為 2 年，請於期限內使用</li>
          </ul>
        </div>
      )}

      {activeTab === "detail" && (
        <div className="mt-4">
          <MileageTable />
        </div>
      )}
      {/* =========================
          ✅【新增】頭像選擇 Modal
         ========================= */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-[520px]">
            <h2 className="text-lg font-semibold text-[#1F2E3C] mb-4">選擇你的頭像</h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
              {avatarOptions.map((a) => (
                <button
                  key={a.avatarId}
                  type="button"
                  onClick={() => setSelectedAvatarId(a.avatarId)}
                  className={`w-[88px] h-[88px] flex items-center justify-center rounded-full border-4 transition ${
                    selectedAvatarId === a.avatarId
                      ? "border-[#DCBB87]"
                      : "border-transparent hover:border-[#BA9A60]"
                  }`}
                  aria-label={a.label}
                  title={a.label}
                >
                  <img
                    src={a.imagePath}
                    alt={a.label}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </button>
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
                disabled={!selectedAvatarId}
                className="px-4 py-2 bg-[#DCBB87] text-[#1F2E3C] rounded hover:bg-[#C5A872] disabled:opacity-60"
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
