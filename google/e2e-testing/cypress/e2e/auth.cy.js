describe("Visit /user", () => {
  beforeEach(function () {
    cy.loginByGoogleApi();
  });

  it("should log in without going through the home page to visit /user", () => {
    // Visitar directamente la página de usuario
    cy.visit("http://localhost:8080/user");
    cy.url().should("include", "/user");
    cy.contains("Usuario de Google").should("be.visible");
  });
});

describe("Login and redirect to /user", () => {
  it("should log in and redirect to /user", () => {
    // 1. Ir a la página de inicio
    cy.visit("http://localhost:8080/");

    // 2. Simular el inicio de sesión con Google (usando el comando customizado)
    cy.loginByGoogleApi();

    // 3. Verificar que el usuario haya sido redirigido a /user
    cy.url().should("include", "/user");

    // 4. Verificar que la página /user tenga contenido esperado (esto depende de tu aplicación)
    cy.contains("Usuario de Google").should("be.visible");
  });
});
