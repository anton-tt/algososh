import { BASE_URL, SLASH, STACK, STACK_INPUT, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ALL, CIRCLE_BASIC, DEFAULT_COLOR, 
    CHANGING_COLOR, MODIFIED_COLOR } from "../../src/constants/const";
  
  describe("Проверка компонента Стек", function() {
  
    beforeEach(() => {
      cy.visit(`${BASE_URL}${SLASH}`);
      cy.get(`[data-test=${STACK}]`).click();
      cy.contains("Стек");
      cy.get(`[data-test=${STACK_INPUT}]`).as("input");
      cy.get(`[data-test=${ADD_ELEMENT}]`).as("add");
      cy.get(`[data-test=${DELETE_ELEMENT}]`).as("delete");
      cy.get(`[data-test=${DELETE_ALL}]`).as("clear");
    });
   
    it("добавление и удаление элемента в стек", () => {
      cy.get("@input").type("01");
      cy.get("@add").click().should("be.disabled");
      cy.get("@input").should("be.empty");

      cy.get(CIRCLE_BASIC).eq(0).as("firstElement");
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
      cy.get("@input").type("01");
      cy.get("@add").click();
      cy.wait(500);
      cy.get("@input").type("02");
      cy.get("@add").click();
      cy.wait(500);
      cy.get("@input").type("03");
      cy.get("@add").click();
      cy.get("@clear").click();
      
      cy.contains("01").should("not.exist");
      cy.contains("02").should("not.exist");
      cy.contains("03").should("not.exist");
    });
      /*cy.get(CIRCLE_BASIC).eq(0).as("firstElement");
      cy.get(CIRCLE_BASIC).eq(1).as("secondElement");
      cy.get(CIRCLE_BASIC).eq(2).as("thirdElement");
      cy.get(CIRCLE_BASIC).eq(3).as("fourthElement");
  
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
      cy.get("@fourthElement").should("have.css", "border-color", MODIFIED_COLOR).contains("к");*/
    
      
  }); 