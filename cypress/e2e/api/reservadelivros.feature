# language: pt

@api
Funcionalidade: Reserva de livros via API

  Cenário: Criar um usuário, gerar token, autorizar e adicionar dois livros
    Dado que criei um usuário com dados válidos
    E gerei um token de autenticação com sucesso
    E confirmei que o usuário está autorizado
    Quando consulto a listagem de livros disponíveis
    E adiciono dois livros ao usuário
    Então os detalhes do usuário devem constar os dois livros