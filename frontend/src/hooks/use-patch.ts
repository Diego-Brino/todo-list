import {toast} from "sonner";
import {useCallback} from "react";

interface usePatchProps<T> {
    url: string;
    data?: object;
    functionToRun?(data?: T): boolean | void;
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function usePatch<T>() {
    const patchRequest = useCallback((props: usePatchProps<T>) => {
        const {url, data, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(url, {
            method: 'PATCH',
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
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados alterados com sucesso!';
            },
            error: () => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return 'Erro ao alterar dados!';
            }
        });
    }, [toast]);

    return patchRequest;
}