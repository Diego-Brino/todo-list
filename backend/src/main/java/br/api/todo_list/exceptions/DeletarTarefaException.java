package br.api.todo_list.exceptions;

import br.api.todo_list.utils.Constantes;

public class DeletarTarefaException extends RuntimeException {
    public DeletarTarefaException () { super(Constantes.ERRO_DELETAR_TAREFA); }
}