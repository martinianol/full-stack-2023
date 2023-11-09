describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Test Mosby",
      username: "test",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#note-input").type("another note cypress");
        cy.contains("save").click();
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    });
  });
});
