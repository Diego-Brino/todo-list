import {toast} from "sonner";
import {useCallback} from "react";
import {URL_API} from "@/constants";

interface useGetProps {
    functionToRun?(data?: object): boolean | void;

    onSuccess?(data?: object): boolean | void;

    onFailure?(data?: object): boolean | void;

    setIsLoading?: (value: boolean) => void;
}

export function useGet() {
    const getRequest = useCallback((props: useGetProps) => {
        const {functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Fetching data from: ' + URL_API);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(URL_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json()), {
            success: (data) => {
                setIsLoading && setIsLoading(false);

                functionToRun && functionToRun(data);

                onSuccess && onSuccess(data);

                return 'Dados carregados com sucesso!';
            },
            error: () => {
                setIsLoading && setIsLoading(false);

                onFailure && onFailure();

                return 'Erro ao carregar dados!';
            }
        });
    }, [toast]);

    return getRequest;
}
