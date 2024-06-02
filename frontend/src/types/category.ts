import {ToDo} from "@/types/to-do.ts";

export type Category = {
    id?: number;
    descricao: string;
    tarefas?: ToDo[]
}