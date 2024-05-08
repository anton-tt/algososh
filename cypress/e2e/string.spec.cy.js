import { BASE_URL, SLASH, RECURSION, BASIC_INPUT, BASIC_BUTTON, BASIC_CIRCLE, DEFAULT_COLOR, 
  CHANGING_COLOR, MODIFIED_COLOR } from "../../src/constants/const";

describe("Проверка компонента Строка", function() {

  beforeEach(() => {
    cy.visit(`${BASE_URL}${SLASH}`);
    cy.get(`[data-test=${RECURSION}]`).click();
    cy.contains("Строка");
    cy.get(`[data-test=${BASIC_INPUT}]`).as("input");
    cy.get(`[data-test=${BASIC_BUTTON}]`).as("button");
  });
 
  it("при пустом инпуте кнопка добавления недоступна", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("символ");
    cy.get("@button").should("not.be.disabled");
  });

  it("переворачивание строки", () => {
    cy.get("@input").type("клоп");
    cy.get("@button").click().should("be.disabled");
    cy.get("@input").should("be.empty");

    cy.get(BASIC_CIRCLE).eq(0).as("firstElement");
    cy.get(BASIC_CIRCLE).eq(1).as("secondElement");
    cy.get(BASIC_CIRCLE).eq(2).as("thirdElement");
    cy.get(BASIC_CIRCLE).eq(3).as("fourthElement");

    cy.get("@firstElement").should("have.css", "border-color", CHANGING_COLOR).contains("к");
    cy.get("@secondElement").should("have.css", "border-color", DEFAULT_COLOR).contains("л");
    cy.get("@thirdElement").should("have.css", "border-color", DEFAULT_COLOR).contains("о");
    cy.get("@fourthElement").should("have.css", "border-color", CHANGING_COLOR).contains("п");

    cy.get("@firstElement").should("have.css", "border-color", MODIFIED_COLOR).contains("п");
    cy.get("@secondElement").should("have.css", "border-color", CHANGING_COLOR).contains("л");
    cy.get("@thirdElement").should("have.css", "border-color", CHANGING_COLOR).contains("о");
    cy.get("@fourthElement").should("have.css", "border-color", MODIFIED_COLOR).contains("к");

    cy.get("@firstElement").should("have.css", "border-color", MODIFIED_COLOR).contains("п");
    cy.get("@secondElement").should("have.css", "border-color", MODIFIED_COLOR).contains("о");
    cy.get("@thirdElement").should("have.css", "border-color", MODIFIED_COLOR).contains("л");
    cy.get("@fourthElement").should("have.css", "border-color", MODIFIED_COLOR).contains("к");
  });
    
}); 