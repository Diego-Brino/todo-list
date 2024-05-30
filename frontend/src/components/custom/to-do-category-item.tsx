import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Category} from "@/types/category.ts";
import ToDoCard from "@/components/custom/to-do-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Pencil1Icon, PlusIcon} from "@radix-ui/react-icons";
import {useAppContext} from "@/contexts/app-context.tsx";

interface ToDoCategoryItemProps {
    categoria: Category
}

export default function ToDoCategoryItem({categoria}: ToDoCategoryItemProps) {

    const tarefas = categoria.tarefas ?? [];

    const {
        setCategorySelected,
        setCategoryDialogOpen,
        setToDoDialogOpen
    } = useAppContext();

    const handleCategorySelected = (category: Category) => {
        setCategorySelected(category);

        setCategoryDialogOpen(true);
    }

    return (
        <AccordionItem value={categoria.id ? `${categoria.id}` : "item"}>
            <AccordionTrigger
            className='text-xl font-bold'>
                <div className='flex items-center gap-2'>
                    <p>{categoria.titulo}</p>
                    <Button
                        variant='ghost'
                        onClick={(event) => {
                            event.preventDefault();
                            handleCategorySelected(categoria);
                        }}>
                        <Pencil1Icon/>
                    </Button>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className='grid grid-cols-3  w-full h-full gap-4'>
                    {tarefas.length === 0
                        ? <p>Nenhuma categoria cadastrada</p>
                        : tarefas.map((tarefa, index) => (
                            <>
                                <ToDoCard toDo={tarefa} />
                                {index === tarefas.length - 1 && (
                                    <Card
                                        key={index}
                                        className='flex flex-col items-center justify-center min-w-min p-4'>
                                        <div>
                                            <Button
                                            onClick={() => setToDoDialogOpen(true)}>
                                                <PlusIcon />
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </>
                        ))
                    }
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}