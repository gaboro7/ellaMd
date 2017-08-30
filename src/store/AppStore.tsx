import {observable, action} from 'mobx';

class AppState {	
	@observable fullName: string;
	@observable address: string;
	@observable dataOfBirth: string;
	@observable selectedFormulaId: number;

	changePerson(key: string, value: string): void {
    this[key] = value;
	}
	
	selectFormula(formulaId: number): void {
		this.selectedFormulaId = formulaId;
	}

}

const appStateSingleton = new AppState();
export default appStateSingleton;
