describe("Searchbar Input", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Test Case 1 : Test for App Load
  it("should visit the homepage", () => {
    // The page is loaded and has the search bar component
    cy.focused().should("have.class", "input-search"); //checking if the element with the class name exists
  });

  // Test Case 2 : Test for Sound button Component
  it("should have the sound button", () => {
    cy.get(".sound-btn"); //checking if the element with the class name exists
    cy.get(".sound-btn").click(); //checking if the button plays sound
    cy.wait(5000);
    cy.get(".sound-btn").click(); //checking if the button stops playing sound
    cy.wait(5000);
  });

  // Test Case 3 : Test for Searchbar Component
  it("should type into the input field and give results", () => {
    cy.get(".input-search").type("Luke"); //searching for query
    cy.get(".search__searchbox__results"); // search results should appear
    cy.get(".character__name").should("have.text", "Luke Skywalker"); //should show luke skywalker in the results
  });

  // Test Case 4 : Test for Search Results Components
  it("should redirect to character page on click", () => {
    cy.get(".input-search").type("Luke"); //searching for query
    cy.get(".search__searchbox__results"); // search results should appear
    cy.get(".character__name").should("have.text", "Luke Skywalker"); //should show luke skywalker in the results

    cy.get(".search__searchbox__results")
      .click()
      .location("pathname")
      .should("eq", "/person/Luke-Skywalker"); //checks if clicking on the search result redirects to the character page
  });

  // Test Case 5: Test for Content on the Character page
  it("should load the character details", () => {
    cy.get(".input-search").type("Luke"); //searching for query
    cy.get(".search__searchbox__results"); // search results should appear
    cy.get(".character__name").should("have.text", "Luke Skywalker"); //should show luke skywalker in the results

    cy.get(".search__searchbox__results")
      .click()
      .location("pathname")
      .should("eq", "/person/Luke-Skywalker");
    cy.wait(1000);
    cy.get(".character-name").should("have.text", "Luke Skywalker");
  });

  //Test Case 6 : Test for Back button on the Character page
  it("should go back to home page when go back button is clicked", () => {
    cy.get(".input-search").type("Luke"); //searching for query
    cy.get(".search__searchbox__results"); // search results should appear
    cy.get(".character__name").should("have.text", "Luke Skywalker"); //should show luke skywalker in the results

    cy.get(".search__searchbox__results")
      .click()
      .location("pathname")
      .should("eq", "/person/Luke-Skywalker");
    cy.wait(1000);
    cy.get(".backButton").click().location("pathname").should("eq", "/"); //checks if clicking on the back button redirects to home page
  });
});
