export interface DefaultDialogData {
  title?: string;
  contentText?: string;
  cancelText?: string;
  confirmText?: string;
  thirdButtonText?: string;
  isCancelHidden?: boolean;
  isConfirmHidden?: boolean;

  documentUUID?: string;

  onCancel?: () => void;
  onConfirm?: () => void;
  onThirdAction?: () => void;
}
