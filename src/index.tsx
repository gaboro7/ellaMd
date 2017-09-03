import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainContainer from './components/MainContainer'
import PrintTemplate from './components/PrintTemplate'
import { AppState } from './store/AppStore';
export { AppState } from './store/AppStore'; // lazy

import "!style-loader!css-loader!sass-loader!./styles.scss";

const appState =  new AppState();
class App extends React.Component<{appState: AppState}, {}> {
	render() {
		return (
			<div>
				<div id="print-mount">
					<PrintTemplate appState={appState}/>
				</div>
				<div id="web-section">
					<MainContainer appState={this.props.appState}/>
				</div>
			</div>
		);
	}
};


ReactDOM.render(<App appState={appState}/>, document.getElementById('root'));
