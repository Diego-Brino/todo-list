import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {ToDoDialog} from "@/components/custom/to-do-dialog.tsx";
import {Toaster} from "sonner";
import {URL_API} from "@/constants";
import {ToDoAccordion} from "@/components/custom/to-do-accordion.tsx";
import {Category} from "@/types/category.ts";
import {CategoryDialog} from "@/components/custom/category-dialog.tsx";
import {useAppContext} from "@/contexts/app-context.tsx";
import {useGet} from "@/hooks/use-get.ts";

function App() {

    const {
        toDoSelected, setToDoSelected,
        categorySelected, setCategorySelected,
        isToDoDialogOpen, setToDoDialogOpen,
        isCategoryDialogOpen, setCategoryDialogOpen
    } = useAppContext();

    const {data, error} = useGet<Category[]>({
        queryKey: ['categorias'],
        url: `${URL_API}/tarefa/agrupas-por-categoria`,
        onSuccess: (data) => console.log(data),
        onFailure: (err) => console.log(err)
    });

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

    return (
        <div>
            <Toaster position="bottom-left" richColors closeButton/>
            {error ? <div>Erro ao carregar dados!</div> : (
                <ToDoAccordion categorias={data}/>
            )}
            <Button
                variant={'default'}
                onClick={handleCategoryDialogOpen}
                className='fixed bottom-6 right-6'>
                Adicionar Categoria
            </Button>
            <CategoryDialog
                category={categorySelected}
                isOpen={isCategoryDialogOpen}
                onClose={handleCategoryDialogClose}/>
            <ToDoDialog
                toDo={toDoSelected}
                category={categorySelected}
                isOpen={isToDoDialogOpen}
                onClose={handleToDoDialogClose}/>
        </div>
    );
}

export default App;
