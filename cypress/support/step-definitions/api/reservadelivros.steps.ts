import {
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";

let user: string;
let password: string;
let userId: string;
let token: string;
let isbns: string[];

Given(
    "que criei um usuário com dados válidos",
    () => {
        user = `marceloQA${Date.now()}`;
        password = "Teste@123456";
        
        return cy.request({
            method: "POST",
            url: "/Account/v1/User",
            body: {
                userName: user,
                password: password,
            },
        }).then((resposta) => {
            expect(resposta.status).to.equal(201);
            userId = resposta.body.userID;
        });
    },
);

Given(
    "gerei um token de autenticação com sucesso",
    () => {
        return cy.request({
            method: "POST",
            url: "/Account/v1/GenerateToken",
            body: {
                userName: user,
                password: password,
            },
            failOnStatusCode: false,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200);
            token = resposta.body.token;
        });
    },
);

Given(
    "confirmei que o usuário está autorizado",
    () => {
        return cy.request({
            method: "POST",
            url: "/Account/v1/Authorized",
            body: {
                userName: user,
                password: password,
            },
            failOnStatusCode: false,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.equal(true);
        });
    },
);

When(
    "consulto a listagem de livros disponíveis",
    () => {
        return cy.request({
            method: "GET",
            url: "/BookStore/v1/Books",
            failOnStatusCode: false,
        }).then((resposta) => {
            isbns = resposta.body.books
            .slice(0, 2)
            .map(
                (livro: { isbn: string }) =>
                    livro.isbn,
            );

            expect(isbns)
            .to.have.length(2);
        });
    },
);

When(
    "adiciono dois livros ao usuário",
    () => {
        const livros = isbns.map((isbn) => {
            return {
                isbn: isbn,
            };
        });

        return cy.request({
            method: "POST",
            url: "/BookStore/v1/Books",

            headers: {
                Authorization: `Bearer ${token}`,
            },
            
            body:{
                userId: userId,
                collectionOfIsbns: livros,
            },
            
            failOnStatusCode: false,
        }).then((resposta) => {
            expect(resposta.status).to.equal(201);
        });
    },
);
  

Then(
  "os detalhes do usuário devem constar os dois livros",
  () => {
    return cy.request({
      method: "GET",
      url: `/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resposta) => {
        const isbnsRetornados =
        resposta.body.books.map(
          (livro: { isbn: string }) =>
            livro.isbn,
        );

      expect(isbnsRetornados)
        .to.have.members(isbns);
    });
  },
);