import {Accordion,} from "@/components/ui/accordion"
import {Category} from "@/types/category.ts";
import ToDoCategoryItem from "@/components/custom/to-do-category-item.tsx";

interface ToDoAccordionProps {
    categorias: Category[]|undefined
}

export function ToDoAccordion({categorias}: ToDoAccordionProps) {
    return (
        <Accordion type="multiple" className="w-full">
            {categorias ? categorias.map((categoria, index) => (
                <ToDoCategoryItem key={index} categoria={categoria} />
            )) : <>Sem categorias</>}
        </Accordion>
    )
}
