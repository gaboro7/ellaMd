import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer'

class App extends React.Component<{}, {}> {
	render() {
		return (
			<MainContainer/>
		);
	}
};

ReactDOM.render(<App/>, document.getElementById('root'));
