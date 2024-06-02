import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {usePost} from "@/hooks/use-post.ts";
import {useDelete} from "@/hooks/use-delete.ts";
import {Category} from "@/types/category.ts";
import {URL_API} from "@/constants";
import {usePut} from "@/hooks/use-put.ts";

const FormSchema = z.object({
    descricao: z.string().nonempty({message: "Descrição é obrigatória"}),
});

const rawObject = {descricao: ''}

interface CategoryDialogProps {
    category?: Category;
    isOpen: boolean;
    onClose: () => void;
    fetchCategories: () => void;
}

export function CategoryDialog({category, isOpen, onClose, fetchCategories}: CategoryDialogProps) {
    const post = usePost();
    const put = usePut();
    const del = useDelete();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: rawObject
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (category?.id) {
            put({
                url: `${URL_API}/categoria/${category.id}`,
                data: data,
                onSuccess: (data) => {
                    console.log(data);

                    fetchCategories();

                    onClose();
                }
            });
        } else {
            post({
                url: `${URL_API}/categoria`,
                data: data,
                onSuccess: (data) => {
                    console.log(data);

                    fetchCategories();

                    onClose();
                }
            });
        }


    };

    const onDelete = () => {
        if (category?.id) {
            del({
                url: `${URL_API}/categoria/${category.id}`,
                onSuccess: (data) => {
                    console.log(data);

                    fetchCategories();

                    onClose();
                }
            });
        }
    }

    const onError = (errors: object) => {
        console.log("Form submission errors:", errors);
    };

    const onCloseDialog = () => {
        onClose();
    }

    useEffect(() => {
        if (category) {
            form.reset(category);
        } else {
            form.reset(rawObject);
        }
    }, [form, isOpen, category]);

    return (
        <Dialog open={isOpen} onOpenChange={onCloseDialog}>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{category ? "Editar Categoria" : "Criar Categoria"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <div className="flex flex-col pt-2 gap-4">
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
                            {category && (
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
