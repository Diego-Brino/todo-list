package br.api.todo_list.exceptions.categoria;

import br.api.todo_list.utils.Constantes;

public class AtualizarCategoriaException extends RuntimeException {
    public AtualizarCategoriaException() {
        super(Constantes.ERRO_ATUALIZAR_CATEGORIA);
    }
}