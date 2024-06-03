import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {ToDo} from "@/types/to-do.ts";
import {usePatch} from "@/hooks/use-patch.ts";
import {URL_API} from "@/constants";
import {useAppContext} from "@/contexts/app-context.tsx";
import {Category} from "@/types/category.ts";


interface ToDoCardProps {
    toDo: ToDo;
    category: Category;
}

export default function ToDoCard({toDo = {titulo: '', descricao: '', statusTarefa: 'EM_ANDAMENTO'}, category}: ToDoCardProps) {
    const [concluido, setConcluido] = useState<boolean>(toDo.statusTarefa == "CONCLUIDA");

    const {mutate: patchMutate} = usePatch({
        url: `${URL_API}/tarefa/${toDo?.id}/marcar-conclusao`,
        queryKey: ['categorias'],
        onSuccess: (data) => {
            console.log(data);

            setConcluido(true);
        },
        onFailure: (err) => {
            console.log(err)
        }
    });

    const {
        setToDoSelected,
        setCategorySelected,
        setToDoDialogOpen
    } = useAppContext();

    const handleToDoSelected = (toDo: ToDo, category: Category) => {
        setToDoSelected(toDo);
        setCategorySelected(category);

        setToDoDialogOpen(true);
    }

    const handleSwitchStatus = (toDo: ToDo) => {
        patchMutate(toDo);
    }

    return (
        <Card
            key={toDo.id}
            className='flex flex-col items-start min-w-min min-h-36 p-4'>
            <CardTitle className='flex w-full'>
                <p>{toDo.titulo}</p>
            </CardTitle>
            <CardContent className='flex grow break-all w-full pt-2'>
                <p className={cn('', concluido ? 'line-through' : '')}>{toDo.descricao}</p>
            </CardContent>
            <div className='flex w-full justify-between items-center'>
                <Button variant='ghost' onClick={() => handleToDoSelected(toDo, category)}>
                    <Pencil1Icon className="h-4 w-4"/>
                </Button>
                <Checkbox
                    checked={concluido}
                    disabled={toDo.statusTarefa === "CONCLUIDO"}
                    onClick={() => handleSwitchStatus(toDo)}
                />
            </div>
        </Card>
    );
}
