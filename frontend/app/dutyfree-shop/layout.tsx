import type { Metadata } from 'next';
import { DFStoreProvider } from './context/DFStoreContext';
import './style.css';

export const metadata: Metadata = {
  title: 'Stelwing Duty Free',
  description: 'Stelwing Airlines 免稅店專區',
};

export default function DutyFreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DFStoreProvider>
      {/* ✅ 新增一層變數容器，把 dutyfree theme 套在 body-level */}
      <div id="dutyfree-theme" className="relative" style={{ all: 'unset' }}>
        <main className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          {children}
        </main>
      </div>
    </DFStoreProvider>
  );
}
