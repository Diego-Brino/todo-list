package br.api.todo_list.exceptions.categoria;

import br.api.todo_list.utils.Constantes;

public class CategoriaTarefasException extends RuntimeException {
    public CategoriaTarefasException () {
        super(Constantes.ERRO_DELETAR_CATEGORIA_COM_TAREFAS);
    }
}