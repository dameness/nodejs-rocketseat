# App

Aplicativo similar ao GymPass

## RFs (Requisitos funcionais)

Deve ser possível...

- [ ] cadastrar-se;
- [ ] autenticar-se;
- [ ] obter o perfil de um usuário logado;
- [ ] obter o número de check-ins realizados pelo usuário logado;
- [ ] que o usuário obtenha seu histórico de check-ins;
- [ ] que o usuário busque academias próximas;
- [ ] que o uuário busque academias pelo nome;
- [ ] que o usuário realize check-in em uma academia;
- [ ] validar o check-in de um usuário;
- [ ] cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) de uma academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
