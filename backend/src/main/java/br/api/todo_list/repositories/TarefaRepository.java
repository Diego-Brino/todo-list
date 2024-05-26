package br.api.todo_list.repositories;

import br.api.todo_list.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {
    List<Tarefa> findTarefaByCategoria_Id (Integer id);
}