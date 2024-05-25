package br.api.todo_list.dtos;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ErroDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String mensagem;
    private String detalhe;
}