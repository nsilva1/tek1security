import { toast as sonnerToast, ExternalToast } from 'sonner';

/**
 * A custom hook to trigger toast notifications across the application.
 * Wraps the Shadcn UI Sonner implementation.
 */
export const useToast = () => {
  const toast = (message: string, data?: ExternalToast) => {
    return sonnerToast(message, data);
  };

  const success = (message: string, data?: ExternalToast) => {
    return sonnerToast.success(message, data);
  };

  const error = (message: string, data?: ExternalToast) => {
    return sonnerToast.error(message, data);
  };

  const info = (message: string, data?: ExternalToast) => {
    return sonnerToast.info(message, data);
  };

  const warning = (message: string, data?: ExternalToast) => {
    return sonnerToast.warning(message, data);
  };

  const dismiss = (id?: string | number) => {
    return sonnerToast.dismiss(id);
  };

  return {
    toast,
    success,
    error,
    info,
    warning,
    dismiss,
  };
};
