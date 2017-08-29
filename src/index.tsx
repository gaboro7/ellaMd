import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainContainer from './components/MainContainer'
import appState from './store/AppStore';

class App extends React.Component<{appState: any}, any> {
	render() {
		return (
			<MainContainer person={this.props.appState.person}/>
		);
	}
};

ReactDOM.render(<App appState={appState}/>, document.getElementById('root'));
