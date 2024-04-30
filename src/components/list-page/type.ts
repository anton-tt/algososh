import { ElementStates } from "../../types/element-states";
import { TDataStructureElement } from "../../types/structure-element";

export type TContainerElement = {
  value: string;
  state: ElementStates;
  topCircle?: boolean;
  bottomCircle?: boolean;
  optionalCircle?: TDataStructureElement;
};  