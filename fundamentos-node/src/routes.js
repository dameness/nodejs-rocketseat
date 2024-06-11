import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const db = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) return res.writeHead(406).end();

      const actualDate = new Date().toUTCString();

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: actualDate,
        updated_at: actualDate,
      };

      db.insert('tasks', task);

      res.end(201);
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = db.select('tasks');
      res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { title, description } = req.body;
      const { id } = req.params;

      if (!title && !description) return res.writeHead(406).end();

      db.update(id, title, description);

      res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      db.delete('tasks', id);

      res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      db.patchTask(id);

      res.writeHead(204).end();
    },
  },
];
