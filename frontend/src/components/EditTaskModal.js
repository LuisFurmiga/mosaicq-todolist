// frontend/src/components/EditTaskModal.js

import React, { useState, useEffect } from "react";
import "./EditTaskModal.css";

function EditTaskModal({ isOpen, onClose, task, onUpdateTask }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("pendente");

    // Quando abrir o modal, preenche os campos com os dados da tarefa
    useEffect(() => {
        if (task) {
            setTitulo(task.titulo);
            setDescricao(task.descricao);
            setStatus(task.status);
        }
    }, [task]);

    const handleSave = () => {
        onUpdateTask({ ...task, titulo, descricao, status });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Tarefa</h2>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="em progresso">Em Progresso</option>
                    <option value="concluída">Concluída</option>
                </select>
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}

export default EditTaskModal;
