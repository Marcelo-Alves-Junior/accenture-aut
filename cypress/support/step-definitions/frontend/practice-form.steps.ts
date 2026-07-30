import {
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";

Given(
    "que acesso a página DemoQA",
    () => {
        cy.visit("/");
    },
);

When(
    "seleciono a opção Forms",
    () => {
        cy.get(".card").contains("Forms").click();
    },
)

When(
    "acesso o submenu Practice Form",
    () => {
        cy.get(".element-list").contains("Practice Form").click();
    },
)

When(
    "preencho todo o formulário com dados válidos",
    () => {
        cy.get("#firstName").type("Marcelo");
        cy.get("#lastName").type("Alves Junior");
        cy.get("#userEmail").type("marcelo.alves@teste.com");
        cy.get("#genterWrapper").contains("Male").click();
        cy.get("#userNumber").type("47991409528");
        cy.get("#dateOfBirthInput").click();        
        cy.get(".react-datepicker__year-select").select("1991");
        cy.get(".react-datepicker__month-select").select("November");
        cy.get(".react-datepicker__day--003.react-datepicker__day--weekend").click();
        cy.get("#subjectsInput").type("Science{enter}");
        cy.get("#hobbiesWrapper").contains("Music").click();        
        cy.get("#hobbiesWrapper").contains("Reading").click();
        cy.get("#uploadPicture").selectFile("cypress/fixtures/arquivo-upload.txt");
        cy.get("#currentAddress").type("Rua do QA , 251");
        cy.get("#state").click().type("NCR{enter}");
        cy.get("#city").click().type("Delhi{enter}");
        cy.get("#submit").click();
    },
);

Then(
    "o popup de confirmação deve ser exibido",
    () => {
        cy.get("#example-modal-sizes-title-lg").should("contain.text","Thanks for submitting the form",);
    },
);

When(
    "fecho o popup de confirmação",
    () => {
        cy.get("#closeLargeModal").scrollIntoView().should("be.visible").click({ force: true });      
    }
);

Then(
    "o popup de confirmação não deve mais estar visível",
    () => {
        cy.get(".modal-content").should("not.exist");
    },
);