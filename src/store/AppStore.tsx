import {observable, computed} from 'mobx';
import { User, Formulation, Ingredient, FormulationIngredient } from '../interfaces';

const baseUrl = 'https://testellamd-be.herokuapp.com';

export class AppState {
	@observable user: User;
	@observable selectedFormula: Formulation;
	@observable ingredientList: Array<Ingredient>;
	@observable fullIngredientList: Array<Ingredient>;
	@observable formulationList: Array<Formulation>;

	constructor() {
		this.user = {
			fullName: '',
			address: '',
			dataOfBirth: ''
		};
		this.formulationList = [];
		this.fullIngredientList = [];
		this.ingredientList = [];
		fetch(`${baseUrl}/v1/formulations`,
		{
			method: 'GET'
		})
		.then((res) => res.json())
		.then((formulations : Array<Formulation>) => {
			this.formulationList = formulations;
		});

		fetch(`${baseUrl}/v1/ingredients`,
		{
			method: 'GET'
		})
		.then((res) => res.json())
		.then((formulations : Array<Ingredient>) => {
			this.fullIngredientList = formulations;
		});
	}

	changePerson(key: string, value: string): void {
		this.user[key] = value;
	}

	selectFormula(formula: Formulation): void {
		this.selectedFormula = formula;
		this.ingredientList = this.selectedFormula.formulationIngredients.map((formulationIngredient) => {
			const ingredient = this.fullIngredientList.find((ingredient) => ingredient.id === formulationIngredient.ingredientId);
			ingredient['percentage'] = formulationIngredient.percentage;
			return ingredient;
		}
		);
	}

	removeIngredient(ingredientId: number) {
		const ingredientIndex = this.ingredientList.findIndex((ingredient) => ingredient.id === ingredientId);
		this.ingredientList.splice(ingredientIndex, 1);
	}

	changePercentage(ingredientId:number, percentage: number) {
		const ingredientIndex = this.ingredientList.findIndex((ingredient) => ingredient.id === ingredientId);
		if (this.totalPercentage + percentage - this.ingredientList[ingredientIndex].percentage <= 100) {
			this.ingredientList[ingredientIndex] = { ...this.ingredientList[ingredientIndex] , percentage };
		}
	}

	addIngredientToFormula(ingredient: Ingredient): void {
		this.ingredientList.unshift({ ...ingredient, percentage: ingredient.minimumPercentage });
	}

	@computed get notUsedIngredients() : Array<Ingredient> {
		return this.fullIngredientList
		.filter((ingedient) =>  
			this.ingredientList.findIndex((ingredientUsed) => ingredientUsed.id === ingedient.id) == -1
		);
	}

	@computed get totalPercentage() : number{
		let sum = 0;
		this.ingredientList
		.forEach((ingredient) =>  {
			sum = sum + ingredient.percentage
		});
		return Math.round(sum*100)/100;
	}

}
