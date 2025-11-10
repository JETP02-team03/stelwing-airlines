import { useCallback, useState } from 'react';

// useAlertDialog 是一個自訂 Hook，集中管理 alert 通知訊息視窗的邏輯狀態，負責邏輯和資料
export function useAlertDialog() {
  // 設定 alert 通知訊息視窗的初始狀態，預設的空白內容
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    description: '',
    confirmText: '確認',
    onConfirm: () => {},
  });

  type AlertOptions = {
    title: string;
    description?: string;
    confirmText: string;
    onConfirm?: () => void;
  };

  // 當我的程式下 showAlert()，顯示訊息彈出視窗
  const showAlert = useCallback(
    // 它會將 alert 視窗
    ({ title, description, confirmText, onConfirm }: AlertOptions) => {
      setAlert({
        open: true,
        title,
        description: description ?? '',
        confirmText,
        onConfirm: () => {
          setAlert((prev) => ({ ...prev, open: false }));
          onConfirm?.();
        },
      });
    },
    []
  );

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return { alert, showAlert, closeAlert };
}
