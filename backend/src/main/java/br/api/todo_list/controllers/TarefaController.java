package br.api.todo_list.controllers;

import br.api.todo_list.dtos.AtualizarInformacoesTarefaDTO;
import br.api.todo_list.dtos.CriarTarefaDTO;
import br.api.todo_list.services.TarefaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/tarefa")
public class TarefaController {
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<Object> listar () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tarefaService.listar());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<Object> recuperar (@PathVariable @NotNull Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tarefaService.recuperar(id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Object> criar (@RequestBody @NotNull @Valid CriarTarefaDTO criarTarefaDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(tarefaService.criar(criarTarefaDTO));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{id}")
    public ResponseEntity<Object> atualizar (@PathVariable @NotNull Integer id,
                                             @RequestBody @NotNull @Valid AtualizarInformacoesTarefaDTO atualizarInformacoesTarefaDTO) {
        tarefaService.atualizar(id, atualizarInformacoesTarefaDTO);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{id}/marcar-conclusao")
    public ResponseEntity<Object> marcarConclusao (@PathVariable @NotNull Integer id) {
        tarefaService.marcarConclusao(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remover (@PathVariable @NotNull Integer id) {
        tarefaService.remover(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}