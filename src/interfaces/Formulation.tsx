import FormulationIngredient from './FormulationIngredient';

export default interface Formulation {
  id?: number;
  name?: string;
  formulationIngredients?: Array<FormulationIngredient>;
}
