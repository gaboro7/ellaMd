import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainContainer from './components/MainContainer'
import { AppState } from './store/AppStore';
export { AppState } from './store/AppStore'; // lazy

const appState =  new AppState();

class App extends React.Component<{appState: AppState}, {}> {
	render() {
		return (
			<MainContainer appState={this.props.appState}/>
		);
	}
};

ReactDOM.render(<App appState={new AppState()}/>, document.getElementById('root'));
