package br.api.todo_list.utils;

public interface Constantes {
    String ERRO_GENERICO = "Um erro inesperado ocorreu! Por favor tente novamente mais tarde.";

    String ERRO_PARAMETRO_NULO = "O parâmetro \"%s\" é nulo!";

    String ERRO_TAREFA_NAO_ENCONTRADA = "Não foi possível encontrar uma tarefa com o id especificado!";
    String ERRO_DELETAR_TAREFA = "Não foi possível realizar a deleção, não existe nenhuma tarefa com o id especificado!";
    String ERRO_ATUALIZAR_TAREFA = "Não foi possível realizar a atualização, não existe nenhuma tarefa com o id especificado!";
    String ERRO_MARCAR_CONLUSAO_TAREFA = "Não foi possível marcar a conclusão, não existe nenhuma tarefa com o id especificado!";

    String ERRO_CATEGORIA_NAO_ENCONTRADA = "Não foi possível encontrar uma categoria com o id especificado!";
    String ERRO_DELETAR_CATEGORIA = "Não foi possível realizar a deleção, não existe nenhuma categoria com o id especificado!";
    String ERRO_DELETAR_CATEGORIA_COM_TAREFAS = "Não foi possível realizar a deleção, essa categoria possui tarefas vinculadas a mesma!";
    String ERRO_ATUALIZAR_CATEGORIA = "Não foi possível realizar a atualização, não existe nenhuma categoria com o id especificado!";
}