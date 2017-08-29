import {observable, computed, asStructure} from 'mobx';

interface Person {
	fullName?: string;
	address?: string;
	dataOfBirth?: string
}

class AppState {
  @observable person:  Person = {};
}

const appStateSingleton = new AppState();
export default appStateSingleton;
