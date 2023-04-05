import { toast } from 'react-toastify';

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export const useNotification = (message: string, type: TypeOptions = 'info') =>
  toast(message, {
    hideProgressBar: true,
    autoClose: 2000,
    type: type,
  });
