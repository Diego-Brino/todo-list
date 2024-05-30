import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {useCallback, useEffect, useState} from "react";
import {ToDoDialog} from "@/components/custom/to-do-dialog.tsx";
import {useGet} from "@/hooks/use.get.ts";
import {Toaster} from "sonner";
import {URL_API} from "@/constants";
import {ToDoAccordion} from "@/components/custom/to-do-accordion.tsx";
import {Category} from "@/types/category.ts";
import {CategoryDialog} from "@/components/custom/category-dialog.tsx";
import {useAppContext} from "@/contexts/app-context.tsx";

function App() {

    const [categorias, setCategorias] = useState<Category[] | undefined>([]);

    const {
        toDoSelected, setToDoSelected,
        categorySelected, setCategorySelected,
        isToDoDialogOpen, setToDoDialogOpen,
        isCategoryDialogOpen, setCategoryDialogOpen
    } = useAppContext();

    const fetch = useGet<Category[]>();

    const handleCategoryDialogOpen = () => {
        setCategoryDialogOpen(true);
    }

    const handleCategoryDialogClose = () => {
        setCategorySelected(undefined);

        setCategoryDialogOpen(false);
    };

    const handleToDoDialogClose = () => {
        setToDoSelected(undefined);

        setToDoDialogOpen(false);
    };

    const fetchCategories = useCallback(() => {
        fetch({
            url: URL_API,
            onSuccess: (data) => setCategorias(data),
            onFailure: (err) => console.log(err)
        });
    }, [fetch]);

    useEffect(() => {
        fetchCategories();

        const categoriasTemp = [
            {
                id: 1,
                titulo: 'Categoria 1',
                tarefas: [
                    {
                        id: 1,
                        titulo: 'ToDo 1',
                        descricao: 'Descrição 1',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 2,
                        titulo: 'ToDo 2',
                        descricao: 'Descrição 2',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 3,
                        titulo: 'ToDo 3',
                        descricao: 'Descrição 3',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 4,
                        titulo: 'ToDo 4',
                        descricao: 'Descrição 4',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                ]
            },
            {
                id: 2,
                titulo: 'Categoria 2',
                tarefas: [
                    {
                        id: 1,
                        titulo: 'ToDo 1',
                        descricao: 'Descrição 1',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 2,
                        titulo: 'ToDo 2',
                        descricao: 'Descrição 2',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 3,
                        titulo: 'ToDo 3',
                        descricao: 'Descrição 3',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                ]
            },
            {
                id: 3,
                titulo: 'Categoria 3',
                tarefas: [
                    {
                        id: 1,
                        titulo: 'ToDo 1',
                        descricao: 'Descrição 1',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 2,
                        titulo: 'ToDo 2',
                        descricao: 'Descrição 2',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                    {
                        id: 3,
                        titulo: 'ToDo 3',
                        descricao: 'Descrição 3',
                        statusTarefa: 'EM_ANDAMENTO'
                    },
                ]
            },
        ];

        setCategorias(categoriasTemp);

    }, [fetch]);

    return (
        <div>
            <Toaster position="bottom-left" richColors closeButton/>
            <ToDoAccordion categorias={categorias}/>
            <Button
                variant={'default'}
                onClick={handleCategoryDialogOpen}
                className='fixed bottom-6 right-6'>
                Adicionar Categoria
            </Button>
            <CategoryDialog
                category={categorySelected}
                isOpen={isCategoryDialogOpen}
                onClose={handleCategoryDialogClose}
                fetchCategories={fetchCategories}/>
            <ToDoDialog
                toDo={toDoSelected}
                isOpen={isToDoDialogOpen}
                onClose={handleToDoDialogClose}
                fetchToDo={fetchCategories}/>
        </div>
    );
}

export default App;
