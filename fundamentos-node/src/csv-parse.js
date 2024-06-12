import fs from 'node:fs';
import { parse } from 'csv-parse';

const path = new URL('.', import.meta.url).pathname;

const csvParse = async () => {
  const parser = fs
    .createReadStream(`${path}/fs_read.csv`)
    .pipe(parse({ from_line: 2 }));

  for await (const record of parser) {
    const body = JSON.stringify({
      title: record[0],
      description: record[1],
    });

    await fetch(`http://localhost:3333/tasks`, {
      method: 'POST',
      body,
    });
  }
};

await csvParse();
