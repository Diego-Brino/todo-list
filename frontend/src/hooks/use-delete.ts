import {useCallback} from "react";
import {toast} from "sonner";
import {URL_API} from "@/constants";

interface useDeleteProps {
    id: string;
    functionToRun?(data?: object): boolean | void;
    onSuccess?(data?: object): boolean | void;
    onFailure?(data?: object): boolean | void;
    setIsLoading?: (value: boolean) => void;
}

export function useDelete() {
    const deleteRequest = useCallback((props: useDeleteProps) => {
        const {id, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        console.log('Updating data at: ' + URL_API);

        setIsLoading && setIsLoading(true);

        toast.promise(fetch(URL_API + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
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