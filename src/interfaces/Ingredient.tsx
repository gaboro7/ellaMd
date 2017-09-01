export default interface Ingredient {
  id?: number;
  name?: string;
  minimumPercentage: number;
  maximumPercentage: number;
  percentage: number;
  description: string;
  featureNames: Array<string>;
}
