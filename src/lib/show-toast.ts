import { toast } from "sonner";

export function showSuccessToast(message: string) {
  toast.success(message, {
    richColors: true,
  });
}

export function showErrorToast(message: string) {
  toast.error(message, {
    richColors: true,
  });
}