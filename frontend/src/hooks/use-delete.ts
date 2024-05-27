import {useCallback} from "react";
import {toast} from "sonner";
import {URL_API} from "@/constants";

interface useDeleteProps<T> {
    url: string;
    functionToRun?(data?: T): boolean | void;
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function useDelete<T>() {
    const deleteRequest = useCallback((props: useDeleteProps<T>) => {
        const {url, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + URL_API);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detalhe || 'Erro ao deletar dados!';
                throw new Error(errorMessage);
            }
            return await response.json() as Promise<T>;
        }), {
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados deletados com sucesso!';
            },
            error: () => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return 'Erro ao alterar dados!';
            }
        });
    }, [toast]);

    return deleteRequest;
}