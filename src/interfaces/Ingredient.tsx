export default interface Ingredient {
  id?: number;
  name?: string;
  minimumPercentage: number;
  maximumPercentage: number;
  description: string;
  featuresNames: Array<string>;
}
