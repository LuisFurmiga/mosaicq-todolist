// backend/src/tests/tarefa.test.js

const request = require("supertest");
const { app, server } = require("../../app"); // Importando a aplicação Express
const { sequelize } = require("../config/database"); // Importa a conexão do banco de dados

let token;

// Antes de rodar os testes, autentica um usuário e obtém um token JWT
beforeAll(async () => {
    const res = await request(app)
        .post("/login")
        .send({ email: "usuario@email.com", senha: "Senha!123" });

    token = res.body.token; // Guarda o token JWT para os próximos testes
});

describe("Testes da API de Tarefas", () => {
    let tarefaId;

    test("Deve criar uma nova tarefa", async () => {
        const res = await request(app)
        .post("/tarefas")
        .set("Authorization", `Bearer ${token}`)
        .send({
            titulo: "Nova Tarefa",
            descricao: "Descrição da tarefa de teste",
            status: "pendente"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        tarefaId = res.body.id;
    });

    test("Deve listar todas as tarefas do usuário logado", async () => {
        const res = await request(app)
        .get("/tarefas")
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Deve atualizar uma tarefa existente", async () => {
        const res = await request(app)
        .put(`/tarefas/${tarefaId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ titulo: "Tarefa Atualizada" });

        expect(res.statusCode).toBe(200);
        expect(res.body.titulo).toBe("Tarefa Atualizada");
    });

    test("Deve excluir uma tarefa", async () => {
        const res = await request(app)
        .delete(`/tarefas/${tarefaId}`)
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    });
});

// Depois de todos os testes, fecha a conexão do banco
afterAll(async () => {
    await sequelize.close();
    server.close();
});

