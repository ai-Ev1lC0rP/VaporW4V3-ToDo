import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:todo.db',
});

export async function initDB() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      due_date TIMESTAMP,
      priority TEXT DEFAULT 'medium',
      archived BOOLEAN DEFAULT FALSE,
      archived_at TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS subtasks (
      id TEXT PRIMARY KEY,
      todo_id TEXT,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (todo_id) REFERENCES todos(id)
    )
  `);
}

export async function getTodos(archived = false) {
  const { rows } = await client.execute({
    sql: 'SELECT * FROM todos WHERE archived = ? ORDER BY created_at DESC',
    args: [archived]
  });
  return rows;
}

export async function addTodo(todo) {
  await client.execute({
    sql: `INSERT INTO todos (id, text, due_date, priority) VALUES (?, ?, ?, ?)`,
    args: [todo.id, todo.text, todo.dueDate, todo.priority]
  });
}

export async function updateTodo(id, updates) {
  const sets = Object.entries(updates)
    .map(([key, _]) => `${key} = ?`)
    .join(', ');
  
  await client.execute({
    sql: `UPDATE todos SET ${sets} WHERE id = ?`,
    args: [...Object.values(updates), id]
  });
}

export async function deleteTodo(id) {
  await client.execute({
    sql: 'DELETE FROM todos WHERE id = ?',
    args: [id]
  });
}

export async function archiveTodo(id) {
  await client.execute({
    sql: `UPDATE todos SET archived = TRUE, archived_at = CURRENT_TIMESTAMP WHERE id = ?`,
    args: [id]
  });
}

export const db = {
  init: initDB,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  archiveTodo
};
