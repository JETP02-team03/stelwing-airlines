"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Lock } from "lucide-react"
import SectionCard from "../components/SectionCard"

// Mock data - replace with your actual data fetching
const mockProfile = {
  name: "王小明",
  email: "example@email.com",
  phone: "0912-345-678",
  address: "台北市信義區信義路五段7號",
  birthDate: "1990-01-01",
  gender: "male" as const,
}

const genderOptions = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "其他" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockProfile)
  const [formData, setFormData] = useState(mockProfile)

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(profile)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData(profile)
  }

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    setProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <SectionCard title="個人資料">
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-start gap-4">
            <User className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">姓名</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                />
              ) : (
                <div className="text-[#1F2E3C]">{profile.name}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                />
              ) : (
                <div className="text-[#1F2E3C]">{profile.email}</div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">電話號碼</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                />
              ) : (
                <div className="text-[#1F2E3C]">{profile.phone}</div>
              )}
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-start gap-4">
            <Calendar className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">生日</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                />
              ) : (
                <div className="text-[#1F2E3C]">{new Date(profile.birthDate).toLocaleDateString("zh-TW")}</div>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-start gap-4">
            <User className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">性別</label>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-[#1F2E3C]">{genderOptions.find((g) => g.value === profile.gender)?.label}</div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <label className="text-sm text-[#666666] mb-2 block">地址</label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#DCBB87]"
                />
              ) : (
                <div className="text-[#1F2E3C]">{profile.address}</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#DCBB87] hover:bg-[#C5A872] text-[#1F2E3C] rounded transition-colors"
                >
                  儲存變更
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-[#C5C8C8] hover:bg-gray-100 text-[#666666] rounded transition-colors"
                >
                  取消
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#DCBB87] hover:bg-[#C5A872] text-[#1F2E3C] rounded transition-colors"
              >
                編輯資料
              </button>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="密碼設定">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Lock className="text-[#DCBB87] mt-1" size={20} />
            <div className="flex-1">
              <p className="text-sm text-[#666666] mb-4">為了您的帳戶安全，建議定期更新密碼</p>
              <button className="px-6 py-2 border border-[#DCBB87] hover:bg-[#DCBB87] text-[#DCBB87] hover:text-[#1F2E3C] rounded transition-colors">
                變更密碼
              </button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
