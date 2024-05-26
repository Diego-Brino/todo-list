package br.api.todo_list.dtos.tarefa;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CriarTarefaDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotNull(message = "idCategoria é obrigatório")
    private Integer idCategoria;
    @NotBlank(message = "Título é obrigatório")
    private String titulo;
    @NotBlank(message = "Descrição é obrigatório")
    private String descricao;
}