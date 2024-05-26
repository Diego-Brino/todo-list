package br.api.todo_list.dtos.categoria;

import br.api.todo_list.models.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
public class CategoriaDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotNull(message = "Id é obrigatório")
    private Integer id;
    @NotBlank(message = "Descrição é obrigatório")
    private String descricao;

    public CategoriaDTO (Categoria categoria) {
        this.id = categoria.getId();
        this.descricao = categoria.getDescricao();
    }
}
