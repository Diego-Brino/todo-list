package br.api.todo_list.dtos.tarefa;

import br.api.todo_list.dtos.categoria.CategoriaDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AtualizarInformacoesTarefaDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer idCategoria;
    @NotBlank(message = "Título é obrigatório")
    private String titulo;
    @NotBlank(message = "Descrição é obrigatório")
    private String descricao;
}