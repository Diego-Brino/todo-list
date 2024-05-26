package br.api.todo_list.exceptions.categoria;

import br.api.todo_list.utils.Constantes;

public class CategoriaNaoEncontradaException extends RuntimeException {
    public CategoriaNaoEncontradaException() { super(Constantes.ERRO_CATEGORIA_NAO_ENCONTRADA); }
}