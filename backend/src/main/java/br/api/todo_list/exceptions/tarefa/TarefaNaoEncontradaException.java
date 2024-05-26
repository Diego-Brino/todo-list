package br.api.todo_list.exceptions.tarefa;

import br.api.todo_list.utils.Constantes;

public class TarefaNaoEncontradaException extends RuntimeException {
    public TarefaNaoEncontradaException () { super(Constantes.ERRO_TAREFA_NAO_ENCONTRADA); }
}