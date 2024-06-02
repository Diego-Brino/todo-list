import {useCallback} from "react";
import {toast} from "sonner";

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

        console.log('Deleting data at: ' + url);

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

            const responseText = await response.text();
            let jsonData: T | undefined = undefined;

            if(responseText) {
                try {
                    jsonData = JSON.parse(responseText) as T;
                } catch {
                    throw new Error('Erro ao converter dados!');
                }
            }

            return jsonData;
        }), {
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados deletados com sucesso!';
            },
            error: (err) => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return err.message || 'Erro ao deletar dados!';
            }
        });
    }, [toast]);

    return deleteRequest;
}