package br.api.todo_list.dtos.tarefa;

import java.util.Objects;

public enum StatusTarefa {
    EM_ANDAMENTO ('N'),
    CONCLUIDA ('S');

    private final Character valor;

    StatusTarefa(Character valor) {
        this.valor = valor;
    }

    public char getValor() {
        return valor;
    }

    public static StatusTarefa fromCharacter (Character valor) {
        for (StatusTarefa st : StatusTarefa.values()) {
            if (Objects.equals(st.getValor(), valor)) {
                return st;
            }
        }

        throw new IllegalArgumentException("Status inválido: " + valor);
    }
}