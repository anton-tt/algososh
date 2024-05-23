import { BASE_URL, SLASH, LIST, ADD_HEAD, ADD_TAIL, DEL_HEAD, DEL_TAIL, ADD_INDEX, DEL_INDEX, BASIC_INPUT, ADDITIONAL_INPUT, 
    BASIC_CIRCLE, EXPANDED_CIRCLE, SMALL_CIRCLE, DEFAULT_COLOR, CHANGING_COLOR, MODIFIED_COLOR } from "../../src/constants/const";
import { DELAY_IN_MS } from "../../src/constants/delays";
  
describe("Проверка компонента Связный список", function() {
  
  beforeEach(() => {
    cy.visit(`${BASE_URL}${SLASH}`);
    cy.get(`[data-test=${LIST}]`).click();
    cy.contains("Связный список");
    cy.get(`[data-test=${BASIC_INPUT}]`).as("inputValue");
    cy.get(`[data-test=${ADDITIONAL_INPUT}]`).as("inputIndex");
    cy.get(`[data-test=${ADD_HEAD}]`).as("addHead");
    cy.get(`[data-test=${ADD_TAIL}]`).as("addTail");
    cy.get(`[data-test=${DEL_HEAD}]`).as("deleteHead");
    cy.get(`[data-test=${DEL_TAIL}]`).as("deleteTail");
    cy.get(`[data-test=${ADD_INDEX}]`).as("addIndex");
    cy.get(`[data-test=${DEL_INDEX}]`).as("deleteIndex");
  });

  it("поведение кнопок при пустых инпутах", () => {
    cy.get("@inputValue").should("be.empty");
    cy.get("@inputIndex").should("be.empty");
    cy.get("@addHead").should("be.disabled");
    cy.get("@addTail").should("be.disabled");
    cy.get("@addIndex").should("be.disabled");
    cy.get("@deleteIndex").should("be.disabled");
    cy.get("@deleteHead").should("not.disabled");
    cy.get("@deleteTail").should("not.disabled");
  });

  it("отрисовка дефолтного списка", () => {
    cy.get(BASIC_CIRCLE).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(EXPANDED_CIRCLE).first().contains("head");
    cy.get(EXPANDED_CIRCLE).last().contains("tail");
  });

  it("добавление элемента в head", () => {
    cy.get(BASIC_CIRCLE).first().contains("100").should("not.exist");
    cy.get("@inputValue").type("100");
    cy.get("@addHead").click().should("be.disabled");
    cy.get("@inputValue").should("be.empty");

    cy.get(SMALL_CIRCLE).should("have.css", "border-color", CHANGING_COLOR).contains("100");
    cy.get(SMALL_CIRCLE).should("not.exist");
    cy.get(BASIC_CIRCLE).first().should("have.css", "border-color", MODIFIED_COLOR).contains("100");
    cy.get(BASIC_CIRCLE).first().should("have.css", "border-color", DEFAULT_COLOR).contains("100");
  });

  it("добавление элемента в tail", () => {
    cy.get(BASIC_CIRCLE).last().contains("101").should("not.exist");
    cy.get("@inputValue").type("101");
    cy.get("@addTail").click().should("be.disabled");
    cy.get("@inputValue").should("be.empty");

    cy.get(SMALL_CIRCLE).should("have.css", "border-color", CHANGING_COLOR).contains("101");
    cy.get(SMALL_CIRCLE).should("not.exist");
    cy.get(BASIC_CIRCLE).last().should("have.css", "border-color", MODIFIED_COLOR).contains("101");
    cy.get(BASIC_CIRCLE).last().should("have.css", "border-color", DEFAULT_COLOR).contains("101");
  });

  it("удаление элемента из head", () => {
    cy.get(BASIC_CIRCLE).first().contains("200").should("not.exist");
    cy.get("@inputValue").type("200");
    cy.get("@addHead").click().should("be.disabled");
    cy.get("@inputValue").should("be.empty");
    cy.get(BASIC_CIRCLE).first().should("have.css", "border-color", DEFAULT_COLOR).contains("200");

    cy.get("@deleteHead").click().should("be.disabled");
    cy.get(BASIC_CIRCLE).first().contains("200").should("not.exist");
  });

  it("удаление элемента из tail", () => {
    cy.get(BASIC_CIRCLE).first().contains("201").should("not.exist");
    cy.get("@inputValue").type("201");
    cy.get("@addHead").click().should("be.disabled");
    cy.get("@inputValue").should("be.empty");
    cy.get(BASIC_CIRCLE).first().should("have.css", "border-color", DEFAULT_COLOR).contains("201");

    cy.get("@deleteTail").click().should("be.disabled");
    cy.get(BASIC_CIRCLE).last().contains("201").should("not.exist");
  });

  it("добавление элемента по индексу", () => {
    cy.get(BASIC_CIRCLE).eq(2).as("thirdElement");
    cy.get("@thirdElement").contains("300").should("not.exist");
    cy.get("@inputValue").type("300");
    cy.get("@inputIndex").type("2");
    cy.get("@addIndex").click().should("be.disabled");
    cy.get("@inputValue").should("be.empty");

    cy.get(SMALL_CIRCLE).should("have.css", "border-color", CHANGING_COLOR).contains("300");
    cy.get(SMALL_CIRCLE).should("not.exist");
    cy.get("@thirdElement").should("have.css", "border-color", MODIFIED_COLOR).contains("300");
    cy.get("@thirdElement").should("have.css", "border-color", DEFAULT_COLOR).contains("300");
  });

  it("удаление элемента по индексу", () => {
    cy.get(BASIC_CIRCLE).eq(2).as("thirdElement");
    cy.get("@thirdElement").contains("301").should("not.exist");
    cy.get("@inputValue").type("301");
    cy.get("@inputIndex").type("2");
    cy.get("@addIndex").click().should("be.disabled");
    cy.wait(DELAY_IN_MS);
    cy.get("@inputValue").should("be.empty");
    cy.get("@thirdElement").should("have.css", "border-color", DEFAULT_COLOR).contains("301");
    cy.wait(DELAY_IN_MS);
    
    cy.get("@inputIndex").type("2");
    cy.get("@deleteIndex").click();
    cy.get("@deleteIndex").should("be.disabled");
    cy.get(SMALL_CIRCLE).should("have.css", "border-color", CHANGING_COLOR).contains("301");
    cy.get(SMALL_CIRCLE).should("not.exist");
    cy.get("@thirdElement").contains("301").should("not.exist");
  });

});   