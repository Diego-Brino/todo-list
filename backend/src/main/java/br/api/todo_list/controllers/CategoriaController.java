package br.api.todo_list.controllers;

import br.api.todo_list.dtos.categoria.AtualizarInformacoesCategoriaDTO;
import br.api.todo_list.dtos.categoria.CriarCategoriaDTO;
import br.api.todo_list.services.CategoriaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<Object> listar () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoriaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recuperar (@PathVariable @NotNull Integer id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoriaService.recuperar(id));
    }

    @PostMapping
    public ResponseEntity<Object> criar (@RequestBody @NotNull @Valid CriarCategoriaDTO criarCategoriaDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoriaService.criar(criarCategoriaDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar (@PathVariable @NotNull Integer id,
                                             @RequestBody @NotNull @Valid AtualizarInformacoesCategoriaDTO atualizarInformacoesCategoriaDTO) {
        categoriaService.atualizar(id, atualizarInformacoesCategoriaDTO);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remover (@PathVariable @NotNull Integer id) {
        categoriaService.remover(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}