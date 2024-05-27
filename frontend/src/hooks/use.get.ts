import {toast} from "sonner";
import {useCallback} from "react";

interface useGetProps<T> {
    url: string;
    functionToRun?(data?: T): boolean | void;
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function useGet<T>() {
    const getRequest = useCallback((props: useGetProps<T>) => {
        const {url, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        setIsLoading && setIsLoading(true);

        toast.promise(
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.detalhe || 'Erro ao carregar dados!';
                    throw new Error(errorMessage);
                }
                return await response.json() as Promise<T>;
            }),
            {
                success: (data) => {
                    setIsLoading && setIsLoading(false);

                    functionToRun && functionToRun(data);

                    onSuccess && onSuccess(data);

                    return 'Dados carregados com sucesso!';
                },
                error: (err) => {
                    setIsLoading && setIsLoading(false);

                    onFailure && onFailure(err);

                    return 'Erro ao carregar dados!';
                }
            }
        );
    }, []);

    return getRequest;
}
