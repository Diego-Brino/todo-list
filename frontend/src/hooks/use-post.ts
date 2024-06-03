import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

interface usePostProps<T> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data?: T): void
    onFailure?(data?: object): void;
}

export function usePost<T>({url, queryKey, onSuccess, onFailure}: usePostProps<T>) {

    const queryClient = useQueryClient();

    const mutationFn = (data: T) => {
        const promise = axios
            .post(url, data)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<T>) => toast.promise(
        promise,
        {
            loading: "Carregando...",
            success: () => {
                return "Sucesso ao criar dados!"
            },
            error: (err) => {
                return err.detalhe || 'Erro ao criar dados!';
            }
        }
    );

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            onSuccess && onSuccess(data);

            queryKey && queryClient.invalidateQueries({
                queryKey
            });
        },
        onError: (err) => onFailure && onFailure(err)
    });
}