describe("Bloglist App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // I need to create a new user
    const newUser = {
      username: "tester",
      name: "Test Mosby",
      password: "1234",
    };
    cy.request({
      method: "POST",
      url: "http://localhost:3003/api/users",
      body: newUser,
    });
    cy.visit("http://localhost:5173");
  });

  it("Shows blogs title", () => {
    cy.contains("blogs");
  });

  describe("Login", function () {
    it("Login form is shown", () => {
      cy.contains("log in to the application");
    });
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();

      cy.contains("Test Mosby logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("incorrect");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      //cy.contains("wrong credentials");
    });
  });
});
