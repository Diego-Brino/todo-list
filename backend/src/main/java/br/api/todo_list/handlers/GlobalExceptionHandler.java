package br.api.todo_list.handlers;

import br.api.todo_list.dtos.ErroDTO;
import br.api.todo_list.exceptions.AtualizarTarefaException;
import br.api.todo_list.exceptions.DeletarTarefaException;
import br.api.todo_list.exceptions.MarcarConclusaoTarefaException;
import br.api.todo_list.exceptions.TarefaNaoEncontradaException;
import br.api.todo_list.utils.Constantes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroDTO> handleErroGenerico (Exception e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erroDTO);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErroDTO> handleArgumentoIlegal (IllegalArgumentException e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erroDTO);
    }

    @ExceptionHandler(TarefaNaoEncontradaException.class)
    public ResponseEntity<ErroDTO> handleTarefaNaoEncontrada (TarefaNaoEncontradaException e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erroDTO);
    }

    @ExceptionHandler(DeletarTarefaException.class)
    public ResponseEntity<ErroDTO> handleDeletarTarefa (DeletarTarefaException e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erroDTO);
    }

    @ExceptionHandler(AtualizarTarefaException.class)
    public ResponseEntity<ErroDTO> handleAtualizarTarefa (AtualizarTarefaException e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erroDTO);
    }

    @ExceptionHandler(MarcarConclusaoTarefaException.class)
    public ResponseEntity<ErroDTO> handleMarcarConclusaoTarefa (MarcarConclusaoTarefaException e) {
        log.error(e.getMessage(), e);

        ErroDTO erroDTO = new ErroDTO(Constantes.ERRO_GENERICO, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erroDTO);
    }
}