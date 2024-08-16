# App

Aplicativo similar ao GymPass

## RFs (Requisitos funcionais)

Deve ser possível...

- [x] cadastrar-se;
- [x] autenticar-se;
- [x] obter o perfil de um usuário logado;
- [x] obter o número de check-ins realizados pelo usuário logado;
- [x] que o usuário obtenha seu histórico de check-ins;
- [x] que o usuário busque academias próximas (até 10km);
- [x] que o uuário busque academias pelo nome;
- [x] que o usuário realize check-in em uma academia;
- [x] validar o check-in de um usuário;
- [x] cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) de uma academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
