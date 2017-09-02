import * as React from "react";
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { DatePicker } from '@blueprintjs/datetime';

import "!style-loader!css-loader!sass-loader!./styles.scss";

import Header from '../Header';
import UserForm from '../UserForm';
import FormulaFinder from '../FormulaFinder';
import IngredientList from '../IngredientList';
import {AppState} from '../..';

@observer
export default class MainContainer extends React.Component<{appState: AppState}, {}> {
	render() {
		const { appState } = this.props;
		return <div>
			<Header/>
			<div className="wrapper">
				<div className="list-wrapper">	
					<FormulaFinder appState={appState}/>		
					<UserForm appState={appState}/>
				</div>
				<div className="list-wrapper">
					<IngredientList appState={appState}/>
				</div>
			</div>
			<DevTools/>
		</div>;
	}
}
