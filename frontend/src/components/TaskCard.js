// frontend/src/components/TaskCard.js

import React from 'react';
import './TaskCard.css';
import editIcon from '../assets/icons/edit.svg';
//import editIcon from '../assets/icons/edit.png';
import deleteIcon from '../assets/icons/delete.svg';
//import deleteIcon from '../assets/icons/delete.png';

function TaskCard({ task, onEdit, onDelete }) {
    function capitalizeStatus(status) {
        return status.replace(/\b\w/g, char => char.toUpperCase());
    }

    return (
        <div className="task-card">
            <h3>{task.titulo}</h3>
            <p>{task.descricao}</p>
            <p><strong>Status:</strong> {capitalizeStatus(task.status)}</p>
            <div className="task-actions">
                <button className="edit" onClick={() => onEdit && onEdit(task)}>
                    <img src={editIcon} alt="Editar" className="icon" />
                </button>
                <button className="delete" onClick={() => onDelete(task.id)}>
                    <img src={deleteIcon} alt="Excluir" className="icon" />
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
