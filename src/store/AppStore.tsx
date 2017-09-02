import {observable, action} from 'mobx';
import { User, Formulation, Ingredient, FormulationIngredient } from '../interfaces';

const baseUrl = 'https://testellamd-be.herokuapp.com';

export class AppState {
	@observable user: User;
	@observable selectedFormula: Formulation;
	@observable ingredientList: Array<Ingredient>;
	@observable fullIngredientList: Array<Ingredient>;
	@observable formulationList: Array<Formulation>;

	constructor() {
		this.ingredientList = [];
		this.user = {
			fullName: '',
			address: '',
			dataOfBirth: ''
		};
		this.formulationList = [];
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
	  this.ingredientList[ingredientIndex] = { ...this.ingredientList[ingredientIndex] , percentage };
	}

	addMedicineToFormula(medicine: Ingredient): void {
		this.ingredientList.push(medicine)
	}

}
