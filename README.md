# Desafio API
## A parte visual foi criada apenas para facilitar o teste do projeto.
![SITE](https://i.imgur.com/ITk3z0Y.png)

## Instalação:
- Faça o download e instalação do [node](https://nodejs.org/en/).
- Clique em **iniciar.cmd** para executar.

## Rotas da API:
| URL | Método | Descrição |
| --- | --- | --- |
| http://localhost:30/api/templates | GET | Exibir os dados de todos os gabaritos de provas |
| http://localhost:30/api/templates/id | GET | Exibir os dados do gabarito de uma prova expecífica |
| http://localhost:30/api/templates | POST | Adicionar novo gabarito |
| http://localhost:30/api/templates/id | PUT | Alterar gabarito |
| http://localhost:30/api/templates/id | DELETE | Remover gabarito |
|  |  |  |
|  |  |  |
| http://localhost:30/api/responses | GET | Exibir os dados de todas as respostas |
| http://localhost:30/api/responses/id | GET | Exibir os dados de uma resposta expecífica |
| http://localhost:30/api/responses | POST | Adicionar uma nova resposta |
| http://localhost:30/api/responses/id | PUT | Alterar uma resposta |
| http://localhost:30/api/responses/id | DELETE | Remover uma resposta |
|  |  |  |
|  |  |  |
| http://localhost:30/api/students | GET | Exibir os dados de todos os alunos |
| http://localhost:30/api/students/id | GET | Exibir os dados de um aluno expecífico |
| http://localhost:30/api/students | POST | Adicionar um novo aluno |
| http://localhost:30/api/students/id | PUT | Alterar um aluno |
| http://localhost:30/api/students/id | DELETE | Remover um aluno |
|  |  |  |
|  |  |  |
| http://localhost:30/api/approved | GET | Lista de alunos aprovados |
|  |  |  |
|  |  |  |
| http://localhost:30/api/grades/:id | GET | Exibir somente a nota final do aluno |
