package br.api.todo_list.exceptions.categoria;

import br.api.todo_list.utils.Constantes;

public class DeletarCategoriaException extends RuntimeException {
    public DeletarCategoriaException () {
        super(Constantes.ERRO_DELETAR_CATEGORIA);
    }
}