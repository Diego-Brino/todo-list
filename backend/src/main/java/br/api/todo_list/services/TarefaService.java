package br.api.todo_list.services;

import br.api.todo_list.dtos.CategoriaTarefa;
import br.api.todo_list.dtos.categoria.CategoriaDTO;
import br.api.todo_list.dtos.tarefa.AtualizarInformacoesTarefaDTO;
import br.api.todo_list.dtos.tarefa.CriarTarefaDTO;
import br.api.todo_list.dtos.tarefa.StatusTarefa;
import br.api.todo_list.dtos.tarefa.TarefaDTO;
import br.api.todo_list.exceptions.tarefa.AtualizarTarefaException;
import br.api.todo_list.exceptions.tarefa.DeletarTarefaException;
import br.api.todo_list.exceptions.tarefa.MarcarConclusaoTarefaException;
import br.api.todo_list.exceptions.tarefa.TarefaNaoEncontradaException;
import br.api.todo_list.models.Categoria;
import br.api.todo_list.models.Tarefa;
import br.api.todo_list.repositories.CategoriaRepository;
import br.api.todo_list.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TarefaService {
    private final CategoriaService categoriaService;
    private final TarefaRepository tarefaRepository;
    private final CategoriaRepository categoriaRepository;

    public TarefaService(TarefaRepository tarefaRepository, CategoriaService categoriaService, CategoriaRepository categoriaRepository) {
        this.tarefaRepository = tarefaRepository;
        this.categoriaService = categoriaService;
        this.categoriaRepository = categoriaRepository;
    }

    public List<TarefaDTO> listar () {
        List<Tarefa> tarefas = tarefaRepository.findAll();

        if (tarefas.isEmpty()) {
            return Collections.emptyList();
        }

        return tarefas.stream().map(TarefaDTO::new).toList();
    }

    public List<CategoriaTarefa> listarAgrupadasPorCategoria() {
        List<Categoria> categorias = categoriaRepository.findAll();

        List<Tarefa> tarefas = tarefaRepository.findAll();

        Map<Categoria, List<Tarefa>> tarefasPorCategoria = tarefas
                .stream()
                .collect(Collectors.groupingBy(Tarefa::getCategoria));

        List<CategoriaTarefa> categoriaTarefaList = new ArrayList<>();

        for (Categoria categoria : categorias) {
            List<Tarefa> tarefasDaCategoria = tarefasPorCategoria.getOrDefault(categoria, Collections.emptyList());
            CategoriaTarefa categoriaTarefa = new CategoriaTarefa(categoria.getId(), categoria.getDescricao(), tarefasDaCategoria.stream().map(TarefaDTO::new).collect(Collectors.toList()));
            categoriaTarefaList.add(categoriaTarefa);
        }

        return categoriaTarefaList;
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

        _preencherAtributoCategoria(tarefa, criarTarefaDTO.getIdCategoria());

        tarefa.setTitulo(criarTarefaDTO.getTitulo());
        tarefa.setDescricao(criarTarefaDTO.getDescricao());
        tarefa.setConcluida(StatusTarefa.EM_ANDAMENTO.getValor());
        tarefa.setDataCriacao(LocalDateTime.now());

        return tarefa;
    }

    private Tarefa _obterTarefaParaAtualizar (Integer id, AtualizarInformacoesTarefaDTO atualizarInformacoesTarefaDTO) {
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);

        if (tarefa.isPresent()) {
            _preencherAtributoCategoria(tarefa.get(), atualizarInformacoesTarefaDTO.getIdCategoria());

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

    private void _preencherAtributoCategoria (Tarefa tarefa, Integer idCategoria) {
        if (Objects.nonNull(idCategoria) && Objects.nonNull(categoriaService.recuperar(idCategoria))) {
            Categoria categoria = new Categoria();

            categoria.setId(idCategoria);

            tarefa.setCategoria(categoria);
        }
    }
}