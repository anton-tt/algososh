import { BASE_URL, SLASH, STACK, BASIC_INPUT, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ALL, BASIC_CIRCLE, DEFAULT_COLOR, 
    CHANGING_COLOR } from "../../src/constants/const";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
  
describe("Проверка компонента Стек", function() {
  
  beforeEach(() => {
    cy.visit(`${BASE_URL}${SLASH}`);
    cy.get(`[data-test=${STACK}]`).click();
    cy.contains("Стек");
    cy.get(`[data-test=${BASIC_INPUT}]`).as("input");
    cy.get(`[data-test=${ADD_ELEMENT}]`).as("add");
    cy.get(`[data-test=${DELETE_ELEMENT}]`).as("delete");
    cy.get(`[data-test=${DELETE_ALL}]`).as("clear");
  });
  
  it("кнопки блокированы при пустом инпуте", () => {
    cy.get('@input').should("be.empty");
    cy.get("@add").should("be.disabled");
    cy.get("@delete").should("be.disabled");
    cy.get("@clear").should("be.disabled");
  });

  it("добавление и удаление элемента в стек", () => {
    cy.get("@input").type("01");
    cy.get("@add").click().should("be.disabled");
    cy.get("@input").should("be.empty");

    cy.get(BASIC_CIRCLE).eq(0).as("firstElement");
    cy.get("@firstElement").should("have.css", "border-color", CHANGING_COLOR).contains("01");
    cy.get("@firstElement").should("have.css", "border-color", DEFAULT_COLOR).contains("01");

    cy.get("@input").type("02");
    cy.get("@add").click().should("be.disabled");

    cy.get("@delete").click();
    cy.contains("02").should("not.exist");
    cy.get("@delete").click();
    cy.contains("01").should("not.exist");
  });

  it("удаление всех элементов из стека", () => {
    cy.get("@input").type("AA");
    cy.get("@add").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@input").type("BB");
    cy.get("@add").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@input").type("CC");
    cy.get("@add").click();
    cy.get("@clear").click();

    cy.contains("AA").should("not.exist");
    cy.contains("BB").should("not.exist");
    cy.contains("CC").should("not.exist");
    cy.get(BASIC_CIRCLE).should("have.length", 0);
  });
      
}); 