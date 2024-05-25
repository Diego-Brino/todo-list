package br.api.todo_list.utils;

public interface Constantes {
    String ERRO_GENERICO = "Um erro inesperado ocorreu! Por favor tente novamente mais tarde.";
    String ERRO_TAREFA_NAO_ENCONTRADA = "Não foi possível encontrar uma tarefa com o id especificado!";
    String ERRO_DELETAR_TAREFA = "Não foi possível realizar a deleção, não existe nenhuma tarefa com o id especificado!";
    String ERRO_ATUALIZAR_TAREFA = "Não foi possível atualizar a tarefa, não existe nenhuma tarefa com o id especificado!";
    String ERRO_MARCAR_CONLUSAO_TAREFA = "Não foi possível marcar a tarefa como concluída, não existe nenhuma tarefa com o id especificado!";
}