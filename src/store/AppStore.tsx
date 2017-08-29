import {observable, computed, asStructure} from 'mobx';

class UiState {
    @observable language = "en_US";
    @observable pendingRequestCount = 0;

    // asStructure makes sure observer won't be signaled only if the
    // dimensions object changed in a deepEqual manner
    @observable windowDimensions = asStructure({

    });

    constructor() {

    }

    @computed get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}

const singleton = new UiState();
export default singleton;
