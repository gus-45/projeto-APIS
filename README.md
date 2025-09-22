Exercício 1: GET com Route Parameter
GET http://localhost:3000/users/1

Exercício 2: GET com Query Parameters
GET http://localhost:3000/users/age-range?min=18&max=30

Exercício 3: POST com Validações
POST http://localhost:3000/posts

json
{
    "title": "Meu Post",
    "content": "Conteúdo do post...",
    "authorId": 1
}
Exercício 4: PUT - Atualização Completa
PUT http://localhost:3000/users/1

json
{
    "name": "Nome Completo",
    "email": "novo@email.com",
    "role": "admin",
    "age": 30
}
Exercício 5: PATCH - Atualização Parcial
PATCH http://localhost:3000/posts/1

json
{
    "title": "Título Atualizado"
}
Exercício 6: DELETE com Autorização
DELETE http://localhost:3000/posts/1
Header: User-Id: 1

Exercício 7: DELETE Condicional
DELETE http://localhost:3000/users/cleanup-inactive?confirm=true

Rotas Auxiliares
Listar usuários: GET http://localhost:3000/users

Resetar dados: GET http://localhost:3000/users/reset
