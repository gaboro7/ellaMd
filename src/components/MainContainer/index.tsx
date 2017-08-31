import * as React from "react";
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { DatePicker } from '@blueprintjs/datetime';

import "!style-loader!css-loader!sass-loader!./styles.scss";

import Header from '../Header';
import UserForm from '../UserForm';
import FormulaFinder from '../FormulaFinder';
import {AppState} from '../..';

@observer
export default class MainContainer extends React.Component<{appState: AppState}, {}> {
	render() {
		const { appState } = this.props;
		return <div>
			<Header/>
			<UserForm appState={appState}/>
			<FormulaFinder appState={appState}/>		
			<DevTools/>
		</div>;
	}
}
