package br.api.todo_list.controllers;

import br.api.todo_list.dtos.tarefa.AtualizarInformacoesTarefaDTO;
import br.api.todo_list.dtos.tarefa.CriarTarefaDTO;
import br.api.todo_list.services.TarefaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tarefa")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TarefaController {
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public ResponseEntity<Object> listar () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tarefaService.listar());
    }

    @GetMapping("/agrupas-por-categoria")
    public ResponseEntity<Object> listarAgrupadasPorCategoria () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tarefaService.listarAgrupadasPorCategoria());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recuperar (@PathVariable @NotNull Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tarefaService.recuperar(id));
    }

    @PostMapping
    public ResponseEntity<Object> criar (@RequestBody @NotNull @Valid CriarTarefaDTO criarTarefaDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(tarefaService.criar(criarTarefaDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> atualizar (@PathVariable @NotNull Integer id,
                                             @RequestBody @NotNull @Valid AtualizarInformacoesTarefaDTO atualizarInformacoesTarefaDTO) {
        tarefaService.atualizar(id, atualizarInformacoesTarefaDTO);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PatchMapping("/{id}/marcar-conclusao")
    public ResponseEntity<Object> marcarConclusao (@PathVariable @NotNull Integer id) {
        tarefaService.marcarConclusao(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remover (@PathVariable @NotNull Integer id) {
        tarefaService.remover(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}