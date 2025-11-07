"use client";

import { useState } from "react";
import { Award, TrendingUp, Calendar, X } from "lucide-react";

const mockMember = {
  memberId: 12345,
  name: "王小明",
  gender: "male",
  birthDate: "1990-01-01",
  phone: "0912-345-678",
  email: "example@email.com",
  address: "台北市信義區信義路五段7號",
  level: "gold",
  points: 15000,
  registerDate: "2020-01-01",
  lastLogin: new Date().toISOString(),
  avatar: {
    imagePath: "/diverse-user-avatars.png",
    label: "會員頭像",
  },
};

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

const levelLabels = {
  bronze: "銅卡會員",
  silver: "銀卡會員",
  gold: "金卡會員",
  platinum: "白金會員",
};

export default function MemberInfoPage() {
  const member = mockMember;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-b-lg shadow-sm">
        <div className="flex flex-col lg:flex-row min-h-[300px]">

          {/* ✅ 上方（手機）→ 左側（桌機） */}
          <div className="w-full lg:w-[235px] border-b lg:border-b-0 lg:border-r-2 border-[#D4D4D4] p-6 flex flex-col items-center">
            <img
              src={member.avatar.imagePath}
              alt={member.avatar.label}
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-[#DCBB87] mb-4"
            />
            <h3 className="text-[#1F2E3C] mb-2 text-center text-sm lg:text-base">{member.name}</h3>
            <div className="px-3 py-1 rounded-full text-xs lg:text-sm bg-[#DCBB87] text-[#1F2E3C]">
              {levelLabels[member.level]}
            </div>

            {/* Info group */}
            <div className="mt-6 w-full space-y-4 border-t border-[#E5E5E5] pt-4">
              {/* Member ID */}
              <div className="flex items-center gap-3">
                <Award className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">會員編號</div>
                  <div className="text-xs lg:text-sm">{member.memberId}</div>
                </div>
              </div>

              {/* Points */}
              <div className="flex items-center gap-3">
                <TrendingUp className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">會員積分</div>
                  <div className="text-xs lg:text-sm">{member.points.toLocaleString()} 點</div>
                </div>
              </div>

              {/* Register date */}
              <div className="flex items-center gap-3">
                <Calendar className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">註冊日期</div>
                  <div className="text-xs lg:text-sm">
                    {new Date(member.registerDate).toLocaleDateString("zh-TW")}
                  </div>
                </div>
              </div>

              {/* Last login */}
              <div className="flex items-center gap-3">
                <Calendar className="text-[#DCBB87]" size={16} />
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs text-[#999]">最後登入</div>
                  <div className="text-xs lg:text-sm">
                    {new Date(member.lastLogin).toLocaleString("zh-TW")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ 右側（桌機）→ 下方（手機） */}
          <div className="flex-1 p-6 relative">
            {/* RWD：桌機 4欄，手機 2欄 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">

              <div>
                <div className="text-xs text-[#666] mb-1">姓名</div>
                <div>{member.name}</div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">性別</div>
                <div>{genderLabels[member.gender]}</div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">生日</div>
                <div>{new Date(member.birthDate).toLocaleDateString("zh-TW")}</div>
              </div>
              <div>
                <div className="text-xs text-[#666] mb-1">電話</div>
                <div>{member.phone}</div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <div className="text-xs text-[#666] mb-1">Email</div>
                <div>{member.email}</div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <div className="text-xs text-[#666] mb-1">地址</div>
                <div>{member.address}</div>
              </div>
            </div>

            {/* ✅ Edit button RWD */}
            <button
              onClick={() => alert("會再串 API")}
              className="
                absolute lg:bottom-6 lg:right-6
                mt-6 lg:mt-0
                px-5 py-2 text-sm
                bg-[#DCBB87] text-[#1F2E3C]
                hover:bg-[#C5A872]
                rounded-full
                transition-colors
              "
            >
              更改
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
