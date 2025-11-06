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
    // ❌ 不要放 <html> 或 <body>
    <DFStoreProvider>
      {/* ✅ 把 dutyfree theme 套在頂層 div */}
      <div id="dutyfree-theme" className="relative" style={{ all: 'unset' }}>
        <main className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          {children}
        </main>
      </div>
    </DFStoreProvider>
  );
}
