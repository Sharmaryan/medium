import { useCallback, useState } from "react";
import { delReq, postReq, putReq } from "../lib/axios-helpers/apiClient";
import { AxiosResponse, isAxiosError } from "axios";

type MutationState<T> = {
  data: T | null | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useMutation = <T>(
  method: "POST" | "PUT" | "DELETE",
  url: string,
  clientToken?: string
) => {
  const [apiState, setApiState] = useState<MutationState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(
    async (payload?: Record<string, any>) => {
      setApiState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        let response: AxiosResponse<T> | null = null;
        if (method === "POST") {
          response = await postReq<T>(url, payload, clientToken);
        } else if (method === "PUT") {
          response = await putReq<T>(url, payload, clientToken);
        } else if (method === "DELETE") {
          response = await delReq<T>(url, clientToken);
        }
        setApiState({ data: response?.data, isLoading: false, error: null });
        return response;
      } catch (err) {
        let errorMessage = "An error occurred";
        if (isAxiosError(err)) {
          errorMessage = err.response?.data?.error || "Unknown server error";
        }
        setApiState({ data: null, isLoading: false, error: errorMessage });
        throw err;
      }
    },
    [method, url, clientToken]
  );

  return {
    mutate,
    data: apiState.data,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
};
