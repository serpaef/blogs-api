WIP...

# blogs-api

Projeto desenvolvido durante o módulo de back-end do curso de desenvolvimento web da Trybe. A API trata-se de um sistema de gerenciamento de vendas construido em NodeJs usando o ORM Sequelize, onde é possível criar, visualizar, deletar e atualizar usuários, categorias e postagens de um blog.
---

## Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

Para a API funcionar corretamente, na raiz do projeto crie um arquivo `.env` com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
JWT_SECRET=meusegredosupersecreto
```
