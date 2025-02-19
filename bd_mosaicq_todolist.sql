-- Script para criação do banco de dados e tabelas no PostgreSQL

-- Criar a tabela de usuários
CREATE TABLE usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Criar a tabela de tarefas
CREATE TABLE tarefas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) CHECK (status IN ('pendente', 'em progresso', 'concluída')) DEFAULT 'pendente',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    usuario_id UUID NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criar índice para otimizar buscas por usuário
CREATE INDEX idx_tarefas_usuario_id ON tarefas(usuario_id);

-- Criar um trigger para atualizar `updatedAt` automaticamente ao modificar a linha
CREATE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tarefas
BEFORE UPDATE ON tarefas
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();
