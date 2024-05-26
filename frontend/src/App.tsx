import './App.css'
import ToDoCard from "@/components/custom/to-do-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCallback, useEffect, useState} from "react";
import {ToDo} from "@/types/to-do.ts";
import {ToDoDialog} from "@/components/custom/to-do-dialog.tsx";
import {useGet} from "@/hooks/use.get.ts";
import {Toaster} from "sonner";

function App() {

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [toDoSelected, setToDoSelected] = useState<ToDo | undefined>(undefined);
    const [todos, setTodos] = useState<ToDo[]>([]);

    const fetch = useGet();

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setToDoSelected(undefined);

        setDialogOpen(false);
    };

    const handleToDoSelected = (toDo: ToDo) => {
        setToDoSelected(toDo);

        handleDialogOpen();
    }

    const fecthToDo = useCallback(() => {
        fetch({
            onSuccess: (data) => {
                console.log(data);

                setTodos(data);
            },
            onFailure: () => {
                console.log('erro');
            }
        });
    }, [fetch]);

    useEffect(() => {
        fecthToDo();
    }, [fetch]);

    return (
        <div>
            <Toaster position="bottom-left" richColors closeButton/>
            <div className='grid grid-cols-3  w-full h-full gap-4'>
                {todos.length === 0 && <p>Nenhum ToDo cadastrado</p>}
                {todos.map((t) => (
                    <ToDoCard key={t.id} toDo={t} fun={() => handleToDoSelected(t)}/>
                ))}
            </div>
            <Button
                variant={'default'}
                onClick={handleDialogOpen}
                className='fixed bottom-6 right-6'>
                Adicionar
            </Button>
            <ToDoDialog
                toDo={toDoSelected}
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                fetchToDo={fecthToDo}/>
        </div>
    );
}

export default App;
