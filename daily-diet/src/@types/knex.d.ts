import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string;
      name: string;
      description: string;
      time: string;
      isOnDiet: boolean;
      user_id: string;
    };
    users: {
      id: string;
      name: string;
      email: string;
      session_id?: string;
    };
  }
}
