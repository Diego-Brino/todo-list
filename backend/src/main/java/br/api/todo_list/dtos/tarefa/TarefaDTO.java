package br.api.todo_list.dtos.tarefa;

import br.api.todo_list.dtos.categoria.CategoriaDTO;
import br.api.todo_list.models.Tarefa;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
public class TarefaDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;
    private CategoriaDTO categoria;
    private String titulo;
    private String descricao;
    private StatusTarefa statusTarefa;

    public TarefaDTO (Tarefa tarefa) {
        this.id = tarefa.getId();
        this.categoria = new CategoriaDTO(tarefa.getCategoria());
        this.titulo = tarefa.getTitulo();
        this.descricao = tarefa.getDescricao();
        this.statusTarefa = StatusTarefa.fromCharacter(tarefa.getConcluida());
    }
}