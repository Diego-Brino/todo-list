package br.api.todo_list.exceptions.tarefa;

import br.api.todo_list.utils.Constantes;

public class AtualizarTarefaException extends RuntimeException {
    public AtualizarTarefaException() {
        super(Constantes.ERRO_ATUALIZAR_TAREFA);
    }
}