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

**A chave JWT_SECRET é seu segredo do JWT e é necessária para funcionamento da aplicação**

## Antes de iniciar

Instale as dependencias:

`npm i`

Crie o Banco de Dados e as tabelas:

`npm prestart`

Inicie a aplicação:

`npm run debug`

** A aplicação foi desenvolvida com fins educacionais e seu uso em produção não é recomendado **

Pronto! Agora é só testar todos os endpoints ^^

---

## Como utilizar a aplicação

Registre seu usuário através do endpoint POST `/user` com os dados no seguinte formato no corpo da requisição:

```
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

Você receberá um token na resposta da requisição que permitirá que você faça as outras ações permitidas pela API. Lembre-se de armazená-lo em algum lugar para enviá-lo sempre no campo 'authorization' no Header da sua requisição.

Depois de criado o usuário, você pode usar a rota POST `/login` para conseguir o token caso precise. Nesse caso basta enviar um email e senha válidos no corpo da requisição:
```
{
  "email": "email@mail.com",
  "password": "123456"
}
```

**LEMBRANDO QUE O TOKEN É OBRIGATÓRIO PARA TODOS OS MÉTODOS DA API A PARTIR DAQUI.**

### GET `/user` & `/user/:id`

Enviar uma requisição do tipo GET para a rota `/user` retorna um array com todos os usuários cadastrados no banco de dados

Enviar uma requisição do tipo GET para a rota`/user/:id` retorna um objeto com dados do usuário com aquele id especifico, caso exista

### POST `/categories`

Cadastre uma nova categoria para posts no banco de dados enviando um método post com o corpo da requisição no seguinte formato:
```
 {
   "name": "Inovação"
 }
```

### GET `/categories`

Enviar uma requisição do tipo GET para a rota `/categories` retorna um array com informações de todas as categorias.

### POST `/post`

Cadastre uma nova postagem no banco de dados enviando um método post com o corpo da requisição no seguinte formato:
```
{
  "title": "Latest updates, April 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

### GET `/post` & `/post/:id`

Enviar uma requisição do tipo GET para a rota `/post` retorna um array com todos os posts cadastrados no banco de dados
Enviar uma requisição do tipo GET para a rota`/post/:id` retorna um objeto com dados do post com aquele id especifico, caso exista

### PUT `/post/:id`

Enviar uma requisição do tipo PUT para a rota `/post/:id` permite que você edite o post com aquele id específico, caso exista.
O corpo da requisição deve seguir o seguinte padrão:
```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```
- As categorias do post não podem ser editadas.
- Só é possível editar posts criados pelo usuário logado.

### DELETE `/post/:id`

Enviar uma requisição do tipo DELETE para a rota `/post/:id` permite que você delete o post com aquele id específico, caso exista.
- Só é possível deletar posts criados pelo usuário logado.

### DELETE `/user/me`

Enviar uma requisição do tipo DELETE para a rota `/user/me` permite que você delete o usuário.
**⚠️ ATENÇÃO: ESSA AÇÃO APAGARÁ TODOS OS POSTS CADASTRADOS POR ESSE USUÁRIO E ESSA AÇÃO NÃO PODE SER DESFEITA ⚠️**

### GET `/post/search?q=:searchTerm`

Enviar uma requisição do tipo GET para a rota `/post/search?q=:searchTerm` retorna um array com todos os posts que tenham o termo pesquisado no `content`ou no `title`.
Caso a busca seja vazia, este endpoint trará o mesmo retorno do GET `/post`.
