describe("Note app", () => {
  beforeEach(function () {
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
});
