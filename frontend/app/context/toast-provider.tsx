import { Status, ToastTypes } from "../components/Toast/Toast.types";
import { createContext, useContext, useMemo, useState } from "react";
import { Toast } from "../components/Toast/Toast";

type ToastMessage = Omit<ToastTypes, "onClose" | "duration">;

type ToastContextType = {
  addToast: (type: Status, message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useMemo(
    () => (type: Status, message: string) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, type, message }]);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = useMemo(() => ({ addToast }), [addToast]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="flex flex-col gap-3 fixed bottom-4 right-4">
        {toasts.map((toast) => (
          <div key={toast.id}>
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={removeToast}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
