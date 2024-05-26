package br.api.todo_list.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
@Entity(name = "TAREFA")
public class Tarefa implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TAREFA")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "ID_CATEGORIA")
    private Categoria categoria;
    @Column(name = "TITULO", length = 256, nullable = false)
    private String titulo;
    @Column(name = "DESCRICAO", length = 256, nullable = false)
    private String descricao;
    @Column(name = "CONCLUIDA", nullable = false)
    private Character concluida;
    @Column(name = "DATA_CRIACAO", nullable = false)
    private LocalDateTime dataCriacao;
    @Column(name = "DATA_CONCLUSAO")
    private LocalDateTime dataConclusao;
}