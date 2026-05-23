import { DialogFormField } from "./DialogFormField";

export interface DefaultDialogData {
  title?: string;
  contentText?: string;
  cancelText?: string;
  confirmText?: string;

  formFields?: DialogFormField[];

  thirdButtonText?: string;
  isCancelHidden?: boolean;
  isConfirmHidden?: boolean;

  documentUUID?: string;

  onCancel?: () => void;
  onConfirm?: (formValues?: Record<string, any>) => void;
  onThirdAction?: () => void;
}
