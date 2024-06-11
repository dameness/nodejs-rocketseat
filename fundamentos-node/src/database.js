import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(id, title, description) {
    const rowIndex = this.#database['tasks'].findIndex((row) => row.id === id);
    if (rowIndex > -1 && (title || description)) {
      const actualDate = new Date().toUTCString();

      if (title) {
        this.#database['tasks'][rowIndex].title = title;
      }
      if (description) {
        this.#database['tasks'][rowIndex].description = description;
      }

      this.#database['tasks'][rowIndex].updated_at = actualDate;

      this.#persist();
    }
  }

  patchTask(id) {
    const rowIndex = this.#database['tasks'].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      const actualDate = new Date().toUTCString();

      if (this.#database['tasks'][rowIndex].completed_at === null)
        this.#database['tasks'][rowIndex].completed_at = actualDate;
      else this.#database['tasks'][rowIndex].completed_at = null;

      this.#database['tasks'][rowIndex].updated_at = actualDate;

      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
