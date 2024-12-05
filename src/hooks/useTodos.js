import { useState, useEffect } from 'react';
import { db } from '../lib/db';

export function useTodos(archived = false) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, [archived]);

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await db.getTodos(archived);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(todo) {
    try {
      await db.addTodo(todo);
      await loadTodos();
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  }

  async function updateTodo(id, updates) {
    try {
      await db.updateTodo(id, updates);
      await loadTodos();
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  }

  async function deleteTodo(id) {
    try {
      await db.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  }

  async function archiveTodo(id) {
    try {
      await db.archiveTodo(id);
      await loadTodos();
    } catch (err) {
      setError('Failed to archive todo');
      console.error(err);
    }
  }

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    archiveTodo,
    refresh: loadTodos
  };
}
