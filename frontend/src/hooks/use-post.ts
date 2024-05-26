import {useCallback} from "react";
import {toast} from "sonner";
import {URL_API} from "@/constants";

interface usePostProps {
    data: object;

    functionToRun?(data?: object): boolean | void;

    onSuccess?(data?: object): boolean | void;

    onFailure?(data?: object): boolean | void;

    setIsLoading?: (value: boolean) => void;
}

export function usePost() {

    const postRequest = useCallback((props: usePostProps) => {
        const {data, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + URL_API);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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