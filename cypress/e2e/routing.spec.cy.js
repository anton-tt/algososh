import { BASE_URL, SLASH, STRING_PAGE, FIBONACCI_PAGE, SORTING_PAGE, STACK_PAGE, QUEUE_PAGE, 
    LIST_PAGE } from "../../src/constants/const";

describe("Проверка роутинга в приложении", function() {

  it("переход на главную страницу", () => {
    cy.visit(`${BASE_URL}${SLASH}`);
  });

  it("переход на страницу Строка", () => {
    cy.visit(`${BASE_URL}${STRING_PAGE}`);
  });

  it("переход на страницу Фибоначчи", () => {
    cy.visit(`${BASE_URL}${FIBONACCI_PAGE}`);
  });

  it("переход на страницу Сортировка", () => {
    cy.visit(`${BASE_URL}${SORTING_PAGE}`);
  });

  it("переход на страницу Стек", () => {
    cy.visit(`${BASE_URL}${STACK_PAGE}`);
  });

  it("переход на страницу Очередь", () => {
    cy.visit(`${BASE_URL}${QUEUE_PAGE}`);
  });

  it("переход на страницу Список", () => {
    cy.visit(`${BASE_URL}${LIST_PAGE}`);
  });

});     