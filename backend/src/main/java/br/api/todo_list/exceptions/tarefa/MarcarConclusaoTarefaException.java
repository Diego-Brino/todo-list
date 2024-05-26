package br.api.todo_list.exceptions.tarefa;

import br.api.todo_list.utils.Constantes;

public class MarcarConclusaoTarefaException extends RuntimeException {
    public MarcarConclusaoTarefaException () {
        super(Constantes.ERRO_MARCAR_CONLUSAO_TAREFA);
    }
}