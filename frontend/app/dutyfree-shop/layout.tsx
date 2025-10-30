import type { Metadata } from 'next';
import './style.css'; // ✅ 僅此區域的 CSS

export const metadata: Metadata = {
  title: 'Stelwing Duty Free',
  description: 'Stelwing Airlines 免稅店專區',
};

export default function DutyFreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen flex flex-col">{children}</main>;
}
