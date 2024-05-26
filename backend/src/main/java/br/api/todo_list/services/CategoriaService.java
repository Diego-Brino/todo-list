package br.api.todo_list.services;

import br.api.todo_list.dtos.categoria.AtualizarInformacoesCategoriaDTO;
import br.api.todo_list.dtos.categoria.CategoriaDTO;
import br.api.todo_list.dtos.categoria.CriarCategoriaDTO;
import br.api.todo_list.dtos.tarefa.TarefaDTO;
import br.api.todo_list.exceptions.categoria.AtualizarCategoriaException;
import br.api.todo_list.exceptions.categoria.CategoriaNaoEncontradaException;
import br.api.todo_list.exceptions.categoria.CategoriaTarefasException;
import br.api.todo_list.exceptions.categoria.DeletarCategoriaException;
import br.api.todo_list.models.Categoria;
import br.api.todo_list.models.Tarefa;
import br.api.todo_list.repositories.CategoriaRepository;
import br.api.todo_list.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final TarefaRepository tarefaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, TarefaRepository tarefaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.tarefaRepository = tarefaRepository;
    }

    public List<CategoriaDTO> listar () {
        List<Categoria> categorias = categoriaRepository.findAll();

        if (categorias.isEmpty()) {
            return Collections.emptyList();
        }

        return categorias.stream().map(CategoriaDTO::new).toList();
    }

    public CategoriaDTO recuperar (Integer id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            return new CategoriaDTO(categoria.get());
        }

        throw new CategoriaNaoEncontradaException();
    }

    @Transactional
    public Integer criar (CriarCategoriaDTO criarCategoriaDTO) {
        Categoria categoria = _obterCategoriaParaPersistir(criarCategoriaDTO);

        categoriaRepository.save(categoria);

        return categoria.getId();
    }

    @Transactional
    public void atualizar (Integer id, AtualizarInformacoesCategoriaDTO atualizarInformacoesTarefaDTO) {
        Categoria categoria = _obterCategoriaParaAtualizar(id, atualizarInformacoesTarefaDTO);

        categoriaRepository.save(categoria);
    }

    @Transactional
    public void remover (Integer id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            _validarDelecao(id);

            categoriaRepository.delete(categoria.get());
            return;
        }

        throw new DeletarCategoriaException();
    }

    private Categoria _obterCategoriaParaPersistir (CriarCategoriaDTO criarCategoriaDTO) {
        Categoria categoria = new Categoria();

        categoria.setDescricao(criarCategoriaDTO.getDescricao());

        return categoria;
    }

    private Categoria _obterCategoriaParaAtualizar (Integer id, AtualizarInformacoesCategoriaDTO atualizarInformacoesTarefaDTO) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            categoria.get().setDescricao(atualizarInformacoesTarefaDTO.getDescricao());

            return categoria.get();
        }

        throw new AtualizarCategoriaException();
    }

    private void _validarDelecao (Integer id) {
        List<TarefaDTO> tarefas = _listarTarefasPorIdCateogira(id);

        if (!tarefas.isEmpty()) {
            throw new CategoriaTarefasException();
        }
    }

    private List<TarefaDTO> _listarTarefasPorIdCateogira (Integer id) {
        List<Tarefa> tarefas = tarefaRepository.findTarefaByCategoria_Id(id);

        if (tarefas.isEmpty()) {
            return Collections.emptyList();
        }

        return tarefas
                .stream()
                .map(TarefaDTO::new)
                .toList();
    }
}