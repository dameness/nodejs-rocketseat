import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string;
      name: string;
      description: string;
      time: string;
      isOnDiet: boolean;
      session_id?: string;
    };
  }
}
