import axios from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseMutateFunction, useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";

interface GetNode {
  url: string;
  id: string;
  options?: {};
}

export function useGet({ url, id, options }: GetNode) {
  const { isLoading, isSuccess, isError, data, error, refetch, isRefetching } =
    useQuery(
      ["get", id],
      async () => {
        const token = await AsyncStorage.getItem("token");

        const properties = {
          headers: { Authorization: `Bearer ${token}` },
        };

        return await axios.get(url, properties);
      },
    );

  return {
    isLoading,
    isSuccess,
    isError,
    data: data?.data,
    error,
    refetch,
    isRefetching,
  };
}

interface PostNode {
  url: string;
  payload?: {};
  onSuccess?: (data: AxiosResponse<any, any> | undefined) => void;
  onError?: (error: any) => void;
}

interface MutateNode {
  isLoading: Boolean;
  error: any;
  mutate: UseMutateFunction<AxiosResponse<any, any> | undefined>;
}

export function usePost({ url, payload, onSuccess, onError }: PostNode) {
  const { isLoading, mutate }: MutateNode = useMutation(
    async () => {
      const token = await AsyncStorage.getItem("token");

      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return await axios.post(url, payload, options);
    },
    {
      onSuccess: (data) => {
        return onSuccess?.(data?.data);
      },
      onError: (error) => {
        return onError?.(error?.response.data);
      },
    }
  );

  return {
    mutate,
    isLoading,
  };
}

export function useGetMutation({ url, payload, onSuccess, onError }: PostNode) {
  const { isLoading, mutate }: MutateNode = useMutation(
    async () => {
      const token = await AsyncStorage.getItem("token");

      const options = {
        headers: { Authorization: `Bearer ${token}` },
        params: payload,
      };

      return await axios.get(url, options);
    },
    {
      onSuccess: (data) => {
        return onSuccess?.(data?.data);
      },
      onError: (error) => {
        return onError?.(error?.response.data);
      },
    }
  );

  return {
    mutate,
    isLoading,
  };
}
