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
        setCategorySelected(undefined);

        setToDoDialogOpen(false);
    };

    const fetchCategories = useCallback(() => {
        fetch({
            url: `${URL_API}/tarefa/agrupas-por-categoria`,
            onSuccess: (data) => setCategorias(data),
            onFailure: (err) => console.log(err)
        });
    }, [fetch]);

    useEffect(() => {
        fetchCategories();
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
                category={categorySelected}
                isOpen={isToDoDialogOpen}
                onClose={handleToDoDialogClose}
                fetchToDo={fetchCategories}/>
        </div>
    );
}

export default App;
