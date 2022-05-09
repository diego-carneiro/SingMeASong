/// <reference types = "cypress" />

import recommendationBodyFactory from "./factories/recommendationFactory";

describe("Home page set of tests", () => {
  it("Must execute a recommendation successfully", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.contains(recommendation.name);

    cy.end();
  });

  it("Must return a conflict alert when registering an existing recommendation (repeated name)", () => {
    recommendationBodyFactory();

    cy.alertTest();

    cy.end();
  });

  it("Must return an alert when registering an invalid recommendation (empty input)", () => {
    cy.get("button").click();

    cy.visit("http://localhost:3000/");

    cy.alertTest();

    cy.end();
  });

  it("Must increase recommendation counter", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.increaseTest(recommendation);

    cy.end();
  });

  it("Must decrease recommendation counter", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.decreaseTest(recommendation);

    cy.end();
  });
});
