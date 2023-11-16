describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Test Mosby",
      username: "test",
      password: "1234",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  it("front page can be opened", () => {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("front page contains random text", function () {
    cy.contains("wtf is this app?").should("not.exist");
  });

  it("login form can be opened", function () {
    cy.contains("Login").click();
  });

  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("1234");
    cy.get("#login-button").click();

    cy.contains("Test Mosby logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    cy.contains("Matti Luukkainen logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      /* cy.contains("Login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.get("#login-button").click(); */

      cy.login({ username: "test", password: "1234" }); //using a command from support
      cy.createNewNote({ content: "first note", important: false });
      cy.createNewNote({ content: "second note", important: false });
      cy.createNewNote({ content: "third note", important: false });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    it("one of those can be made important", function () {
      // cy.contains("second note").contains("make important").click();
      // cy.contains("second note").contains("make not important");

      // cy.contains("second note").parent().find("button").click();
      // cy.contains("second note")
      //   .parent()
      //   .find("button")
      //   .should("contain", "make not important");

      cy.contains("second note").parent().find("button").as("theButton");
      cy.get("@theButton").click();
      cy.get("@theButton").should("contain", "make not important");
    });

    /* describe("and a note exists", function () {
      beforeEach(function () {
        // cy.contains("new note").click();
        // cy.get("#note-input").type("another note cypress");
        // cy.contains("save").click();
        cy.createNewNote({ content: "another note cypress", important: true });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    }); */
  });
});
