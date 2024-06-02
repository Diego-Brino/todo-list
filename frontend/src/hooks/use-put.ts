import {toast} from "sonner";
import {useCallback} from "react";

interface usePutProps<T> {
    url: string;
    data?: object;
    functionToRun?(data?: T): boolean | void;
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function usePut<T>() {
    const putRequest = useCallback((props: usePutProps<T>) => {
        const {url, data, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + url);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(url, {
            method: 'PUT',
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
            loading: 'Carregando...',
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados alterados com sucesso!';
            },
            error: (err) => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return err.message || 'Erro ao alterar dados!';
            }
        });
    }, [toast]);

    return putRequest;
}