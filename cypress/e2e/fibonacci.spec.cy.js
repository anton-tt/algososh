import { BASE_URL, SLASH, FIBONACCI, BASIC_INPUT, BASIC_BUTTON, BASIC_CIRCLE, 
    DEFAULT_COLOR } from "../../src/constants/const";

describe("Проверка компонента Фибоначчи", function() {

  beforeEach(() => {
    cy.visit(`${BASE_URL}${SLASH}`);
    cy.get(`[data-test=${FIBONACCI}]`).click();
    cy.contains("Фибоначчи");
    cy.get(`[data-test=${BASIC_INPUT}]`).as("input");
    cy.get(`[data-test=${BASIC_BUTTON}]`).as("button");
  });

  it("при пустом инпуте кнопка добавления недоступна", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("19");
    cy.get("@button").should("not.be.disabled");
  });

  it("генерация чисел", () => {
    cy.get("@input").type("5");
    cy.get("@button").click().should("be.disabled");
    cy.get("@input").should("be.empty");

    cy.get(BASIC_CIRCLE).eq(0).should("have.css", "border-color", DEFAULT_COLOR).contains("1");
    cy.get(BASIC_CIRCLE).eq(1).should("have.css", "border-color", DEFAULT_COLOR).contains("1");
    cy.get(BASIC_CIRCLE).eq(2).should("have.css", "border-color", DEFAULT_COLOR).contains("2");
    cy.get(BASIC_CIRCLE).eq(3).should("have.css", "border-color", DEFAULT_COLOR).contains("3");
    cy.get(BASIC_CIRCLE).eq(4).should("have.css", "border-color", DEFAULT_COLOR).contains("5");
    cy.get(BASIC_CIRCLE).eq(5).should("have.css", "border-color", DEFAULT_COLOR).contains("8");
  });

});