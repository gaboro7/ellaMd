import {observable, action} from 'mobx';
import { User, Formulation, Ingredient } from '../interfaces';

export class AppState {	
	@observable user: User;
	@observable selectedFormula: Formulation;
	@observable ingredientList: Array<Ingredient>; 
	@observable formulationList: Array<Formulation>; 

	constructor() {
		this.ingredientList = [];
		this.user = {
			fullName: '',
			address: '',
			dataOfBirth: ''
		};
		this.formulationList = [];
		fetch('http://localhost:3000/v1/formulations',
		{
			method: 'GET'
		})
		.then((res) => res.json())
		.then((formulations : Array<Formulation>) => { 
			this.formulationList = formulations;
		});
	}

	changePerson(key: string, value: string): void {
    this.user[key] = value;
	}
	
	selectFormula(formula: Formulation): void {
		this.selectedFormula = formula;
	}

	addMedicineToFormula(medicine: Ingredient): void {
		this.ingredientList.push(medicine)
	}

}
