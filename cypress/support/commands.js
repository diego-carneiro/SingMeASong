//Test creation a new recommendation
Cypress.Commands.add("createRecommendationTest", (recommendation) => {
  cy.visit("http://localhost:3000/");

  cy.get('input[placeholder="Name"]').type(recommendation.name);
  cy.get('input[placeholder="https://youtu.be/..."]').type(
    recommendation.youtubeLink
  );

  cy.intercept("POST", "http://localhost:5000/recommendations").as(
    "createRecommendations"
  );

  cy.get("button").click();

  cy.wait("@createRecommendations");
});

//Test alert error of a repeated name for a creation try
Cypress.Commands.add("alertTest", () => {
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Error creating recommendation!");
  });
});

//Test increase counter button functionality
Cypress.Commands.add("increaseTest", (recommendation) => {
  cy.contains(recommendation.name)
    .get("article")
    .first()
    .within(() => {
      cy.get("div:last-of-type").should("not.be.undefined").first();
    });

  cy.contains(recommendation.name)
    .get("article")
    .first()
    .find("svg")
    .first()
    .click();

  cy.reload();

  cy.contains(recommendation.name)
    .get("article")
    .within(() => {
      cy.get("div:last-of-type").should("not.be.undefined").first();
    });
});

//Test decrease counter button functionality
Cypress.Commands.add("decreaseTest", (recommendation) => {
  cy.contains(recommendation.name)
    .get("article")
    .within(() => {
      cy.get("div:last-of-type").should("not.be.undefined").first();
    });

  cy.contains(recommendation.name)
  .get("article")
  .first()
  .find("svg")
  .first()
  .click();

  cy.reload();

  cy.contains(recommendation.name)
    .get("article")
    .within(() => {
      cy.get("div:last-of-type").should("not.be.undefined").first();
    });
});
