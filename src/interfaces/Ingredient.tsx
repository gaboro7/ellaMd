export default interface Ingredient {
  id?: number;
  name?: string;
  minimumPercentage: number;
  maximumPercentage: number;
  description: string;
  classes: Array<string>;
}
