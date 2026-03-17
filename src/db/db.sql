CREATE DATABASE IF NOT EXISTS api_contatos;

USE api_contatos;

CREATE TABLE IF NOT EXISTS contatos (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(100)  NOT NULL,
    telefone VARCHAR(20)   NULL,
    email    VARCHAR(100)  NULL
);