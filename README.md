📚 Exercícios Práticos


🔍 Exercício 1 - GET com Route Parameter

Método: GET

Endpoint: http://localhost:3000/users/1

Objetivo: Buscar um usuário específico pelo ID



🔍 Exercício 2 - GET com Query Parameters

Método: GET

Endpoint: http://localhost:3000/users/age-range?min=18&max=30

Objetivo: Filtrar usuários por faixa etária


➕ Exercício 3 - POST com Validações

Método: POST

Endpoint: http://localhost:3000/posts

Body:

json
{
    "title": "Meu Post",
    "content": "Conteúdo do post...",
    "authorId": 1
}



✏️ Exercício 4 - PUT (Atualização Completa)

Método: PUT

Endpoint: http://localhost:3000/users/1

Body:

json
{
    "name": "Nome Completo",
    "email": "novo@email.com",
    "role": "admin",
    "age": 30
}



🎯 Exercício 5 - PATCH (Atualização Parcial)

Método: PATCH

Endpoint: http://localhost:3000/posts/1

Body:

json
{
    "title": "Título Atualizado"
}



🗑️ Exercício 6 - DELETE com Autorização

Método: DELETE

Endpoint: http://localhost:3000/posts/1

Header: User-Id: 1

Objetivo: Remover post com verificação de autorização



🧹 Exercício 7 - DELETE Condicional
Método: DELETE

Endpoint: http://localhost:3000/users/cleanup-inactive?confirm=true

Objetivo: Remover usuários inativos com confirmação








