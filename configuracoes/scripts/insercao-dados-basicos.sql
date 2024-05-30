-- todolistdb.categoria definition
CREATE TABLE categoria (
                           ID_CATEGORIA int NOT NULL AUTO_INCREMENT,
                           DESCRICAO varchar(256) NOT NULL,
                           PRIMARY KEY (ID_CATEGORIA)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- todolistdb.tarefa definition
CREATE TABLE tarefa (
                        ID_TAREFA int NOT NULL AUTO_INCREMENT,
                        ID_CATEGORIA int NOT NULL,
                        TITULO varchar(256) NOT NULL,
                        DESCRICAO varchar(256) NOT NULL,
                        CONCLUIDA char(1) NOT NULL,
                        DATA_CRIACAO datetime NOT NULL,
                        DATA_CONCLUSAO datetime DEFAULT NULL,
                        PRIMARY KEY (ID_TAREFA),
                        KEY TAREFA_categoria_FK (ID_CATEGORIA),
                        CONSTRAINT TAREFA_categoria_FK FOREIGN KEY (ID_CATEGORIA) REFERENCES categoria (ID_CATEGORIA)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;