package br.api.todo_list.dtos;

import br.api.todo_list.dtos.tarefa.TarefaDTO;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CategoriaTarefa implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String descricao;
    private List<TarefaDTO> tarefas;
}