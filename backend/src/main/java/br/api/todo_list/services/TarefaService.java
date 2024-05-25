package br.api.todo_list.services;

import br.api.todo_list.dtos.AtualizarInformacoesTarefaDTO;
import br.api.todo_list.dtos.CriarTarefaDTO;
import br.api.todo_list.dtos.StatusTarefa;
import br.api.todo_list.dtos.TarefaDTO;
import br.api.todo_list.exceptions.AtualizarTarefaException;
import br.api.todo_list.exceptions.DeletarTarefaException;
import br.api.todo_list.exceptions.MarcarConclusaoTarefaException;
import br.api.todo_list.exceptions.TarefaNaoEncontradaException;
import br.api.todo_list.models.Tarefa;
import br.api.todo_list.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {
    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<TarefaDTO> listar () {
        List<Tarefa> tarefas = tarefaRepository.findAll();

        if (tarefas.isEmpty()) {
            return Collections.emptyList();
        }

        return tarefas.stream().map(TarefaDTO::new).toList();
    }

    public TarefaDTO recuperar (Integer id) {
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);

        if (tarefa.isPresent()) {
            return new TarefaDTO(tarefa.get());
        }

        throw new TarefaNaoEncontradaException();
    }

    @Transactional
    public Integer criar (CriarTarefaDTO criarTarefaDTO) {
        Tarefa tarefa = _obterTarefaParaPersistir(criarTarefaDTO);

        tarefaRepository.save(tarefa);

        return tarefa.getId();
    }

    @Transactional
    public void atualizar (Integer id, AtualizarInformacoesTarefaDTO atualizarInformacoesTarefaDTO) {
        Tarefa tarefa = _obterTarefaParaAtualizar(id, atualizarInformacoesTarefaDTO);

        tarefaRepository.save(tarefa);
    }

    @Transactional
    public void marcarConclusao (Integer id) {
        Tarefa tarefa = _obterTarefaParaMarcarConclusao(id);

        tarefaRepository.save(tarefa);
    }

    @Transactional
    public void remover (Integer id) {
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);

        if (tarefa.isPresent()) {
            tarefaRepository.delete(tarefa.get());
            return;
        }

        throw new DeletarTarefaException();
    }

    private Tarefa _obterTarefaParaPersistir (CriarTarefaDTO criarTarefaDTO) {
        Tarefa tarefa = new Tarefa();

        tarefa.setTitulo(criarTarefaDTO.getTitulo());
        tarefa.setDescricao(criarTarefaDTO.getDescricao());
        tarefa.setConcluida(StatusTarefa.EM_ANDAMENTO.getValor());
        tarefa.setDataCriacao(LocalDateTime.now());

        return tarefa;
    }

    private Tarefa _obterTarefaParaAtualizar (Integer id, AtualizarInformacoesTarefaDTO atualizarInformacoesTarefaDTO) {
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);

        if (tarefa.isPresent()) {
            tarefa.get().setTitulo(atualizarInformacoesTarefaDTO.getTitulo());
            tarefa.get().setDescricao(atualizarInformacoesTarefaDTO.getDescricao());

            return tarefa.get();
        }

        throw new AtualizarTarefaException();
    }

    private Tarefa _obterTarefaParaMarcarConclusao (Integer id) {
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);

        if (tarefa.isPresent()) {
            tarefa.get().setId(id);
            tarefa.get().setConcluida(StatusTarefa.CONCLUIDA.getValor());
            tarefa.get().setDataConclusao(LocalDateTime.now());

            return tarefa.get();
        }

        throw new MarcarConclusaoTarefaException();
    }
}