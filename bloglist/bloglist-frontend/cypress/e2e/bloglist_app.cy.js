describe("Bloglist App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.contains("blogs");
    cy.contains("log in to the application");
  });
});
