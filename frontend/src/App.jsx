import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://svwz1x1gr8.execute-api.us-east-1.amazonaws.com";
  // 1. Leer tareas (GET)
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Crear tarea (POST)
  const addTask = async () => {
    if (!newTask) return;
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title: newTask }),
      headers: { 'Content-Type': 'application/json' }
    });
    setNewTask('');
    fetchTasks();
  };

  // 3. Eliminar tarea (DELETE)
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  // 4. Actualizar tarea (PUT)
  const updateTask = async () => {
    if (!editingTask.title) return;
    await fetch(`${API_URL}/tasks/${editingTask.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: editingTask.title }),
      headers: { 'Content-Type': 'application/json' }
    });
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Gestor de Tareas - Juano</h1>
      
      <div className="input-group">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Nueva tarea..." 
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTask?.id === task.id ? (
              <>
                <input 
                  value={editingTask.title} 
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} 
                />
                <button onClick={updateTask}>Guardar</button>
                <button onClick={() => setEditingTask(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button onClick={() => setEditingTask(task)}>Editar</button>
                  <button className="btn-delete" onClick={() => deleteTask(task.id)}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;