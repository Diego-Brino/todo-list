import {ToDo} from "@/types/to-do.ts";

export type Category = {
    id?: number;
    titulo: string;
    tarefas?: ToDo[]
}