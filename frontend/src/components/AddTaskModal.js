// frontend/src/components/AddTaskModal.js

import React, { useState } from "react";
import "./AddTaskModal.css";

function AddTaskModal({ isOpen, onClose, onAddTask }) {
    const [titulo, setTitle] = useState("");
    const [descricao, setDescription] = useState("");
    const [status, setStatus] = useState("pendente");

    const handleAddTask = () => {
        if (!titulo.trim()) {
            alert("O título é obrigatório!");
            return;
        }
        onAddTask({ titulo, descricao, status });
        setTitle("");
        setDescription("");
        setStatus("pendente");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Adicionar Nova Tarefa</h2>
                <label>Título*</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título da tarefa"
                    required
                />

                <label>Descrição</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição da tarefa"
                />

                <label>Status*</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="em progresso">Em Progresso</option>
                    <option value="concluída">Concluída</option>
                </select>

                <div className="modal-buttons">
                    <button className="add-btn" onClick={handleAddTask}>Adicionar</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;
