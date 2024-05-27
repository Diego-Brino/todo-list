import {useCallback} from "react";
import {toast} from "sonner";
import {URL_API} from "@/constants";

interface usePostProps<T> {
    url: string;
    data: object;
    functionToRun?(data?: T): boolean | void;
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function usePost<T>() {

    const postRequest = useCallback((props: usePostProps<T>) => {
        const {data, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + URL_API);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        }).then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detalhe || 'Erro ao alterar dados!';
                throw new Error(errorMessage);
            }
            return await response.json() as Promise<T>;
        }), {
            loading: 'Carregando...',
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados cadastrados com sucesso!';
            },
            error: () => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return 'Erro ao alterar dados!';
            }
        });
    }, [toast]);

    return postRequest;
}