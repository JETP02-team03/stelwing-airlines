'use client';

import { DFLoginPage } from '../components/DFLoginPage';

export default function LoginPage() {
  return (
    <DFLoginPage
      onLoginSuccess={() => {
        console.log('登入成功，導向下一步或顯示取貨資訊');
      }}
      onLoginFailed={() => {
        console.log('登入失敗，請檢查輸入');
      }}
      onRegisterClick={() => {
        console.log('點擊加入會員');
      }}
    />
  );
}
