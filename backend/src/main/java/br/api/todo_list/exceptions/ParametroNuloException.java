package br.api.todo_list.exceptions;

import br.api.todo_list.utils.Constantes;

public class ParametroNuloException extends RuntimeException {
    public ParametroNuloException (String parametro) {
        super(String.format(Constantes.ERRO_PARAMETRO_NULO, parametro));
    }
}