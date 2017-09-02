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
					<UserForm appState={appState}/>
				</div>
				<div className="list-wrapper">
					<nav className="pt-navbar .modifier ella-md-card">
						<div className="pt-navbar-group pt-align-left">
							<div className="pt-navbar-heading">Find your Formulation</div>
							<FormulaFinder appState={appState}/>
						</div>
						<div className="pt-navbar-group pt-align-right">
							<div className="pt-navbar-heading">
								Total Percentage {appState.totalPercentage}%
							</div>
							<button className="pt-button pt-minimal pt-icon-print">Print Formulation</button>
						</div>
					</nav>
				</div>
				<div className="list-wrapper">
					<IngredientList appState={appState}/>
				</div>
			</div>
			<DevTools/>
		</div>;
	}
}
