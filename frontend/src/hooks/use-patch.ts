import {toast} from "sonner";
import {useCallback} from "react";
import {URL_API} from "@/constants";

interface usePatchProps {
    url?: string;
    id: string;
    data?: object;
    functionToRun?(data?: object): boolean | void;
    onSuccess?(data?: object): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function usePatch() {
    const patchRequest = useCallback((props: usePatchProps) => {
        const {url, id, data, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + URL_API);

        const URL = url ? url : URL_API + '/' + id

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
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