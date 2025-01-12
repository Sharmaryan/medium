export enum Status { Error = "ERROR", Success = "SUCCESS", Info = "INFO", Default = "DEFAULT" }

export type ToastTypes = {
    message: string
    type: Status
    id: string;
    onClose: (id: string) => void;
    duration?: number;
}