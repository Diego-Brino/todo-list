import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ToDo} from "@/types/to-do.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {usePatch} from "@/hooks/use-patch.ts";
import {useDelete} from "@/hooks/use-delete.ts";
import {URL_API} from "@/constants";
import {Category} from "@/types/category.ts";
import {usePost} from "@/hooks/use-post.ts";

const FormSchema = z.object({
    idCategoria: z.number(),
    titulo: z.string().nonempty({message: "Título é obrigatório"}),
    descricao: z.string().nonempty({message: "Descrição é obrigatória"}),
});

const rawObject = {titulo: '', descricao: ''}

interface ToDoDialogProps {
    toDo?: ToDo;
    category?: Category;
    isOpen: boolean;
    onClose: () => void;
}

export function ToDoDialog({toDo, category, isOpen, onClose}: ToDoDialogProps) {
    const {mutate: postMutate} = usePost({
        url: `${URL_API}/tarefa`,
        queryKey: ['categorias'],
        onSuccess: (data) => {
            console.log(data);

            onClose();
        },
        onFailure: (err) => {
            console.log(err)
        }
    });
    const {mutate: patchMutate} = usePatch({
        url: `${URL_API}/tarefa/${toDo?.id}`,
        queryKey: ['categorias'],
        onSuccess: (data) => {
            console.log(data);

            onClose();
        },
        onFailure: (err) => {
            console.log(err)
        }
    });
    const {mutate: deleteMutate} = useDelete({
        url: `${URL_API}/tarefa/${toDo?.id}`,
        queryKey: ['categorias'],
        onSuccess: (data) => {
            console.log(data);

            onClose();
        },
        onFailure: (err) => {
            console.log(err)
        }
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: rawObject
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (toDo?.id) {
            patchMutate(data);
        } else {
            postMutate(data);
        }
    };

    const onDelete = () => {
        if (toDo?.id) {
            deleteMutate();
        }
    }

    const onError = (errors: object) => {
        console.log("Form submission errors:", errors);
    };

    const onCloseDialog = () => {
        onClose();
    }

    useEffect(() => {
        if (toDo) {
            form.reset(toDo);
        } else {
            form.reset(rawObject);
        }
        form.setValue('idCategoria', category?.id as number);
    }, [form, isOpen, toDo, category]);

    return (
        <Dialog open={isOpen} onOpenChange={onCloseDialog}>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{toDo ? "Editar ToDo" : "Criar ToDo"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <div className="flex flex-col pt-2 gap-4">
                            <FormField
                                control={form.control}
                                name="idCategoria"
                                render={({field}) => (
                                    <FormItem
                                    className="hidden">
                                        <FormLabel>Título</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Título" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="titulo"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Título</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Título" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Descrição" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className='mt-4'>
                            {toDo && (
                                <Button
                                    variant="destructive"
                                    type="button"
                                    onClick={onDelete}>
                                    Deletar
                                </Button>
                            )}
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                disabled={toDo?.statusTarefa === "CONCLUIDA"}
                                type="submit">
                                Enviar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
