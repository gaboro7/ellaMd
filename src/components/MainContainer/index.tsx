import * as React from "react";
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { DatePicker } from '@blueprintjs/datetime';
import * as jsPDF from 'jspdf';

import Header from '../Header';
import UserForm from '../UserForm';
import FormulaFinder from '../FormulaFinder';
import IngredientList from '../IngredientList';
import {AppState} from '../..';
import * as html2canvas from 'html2canvas';

@observer
export default class MainContainer extends React.Component<{appState: AppState}, {}> {
	constructor (props: any) {
		super(props);
		window['html2canvas'] = html2canvas;
		this.exportToPdf = this.exportToPdf.bind(this);
  }
	exportToPdf = () => {
		
		this.props.appState.changeToPdf();
		setTimeout(() => {
			var pdf = new jsPDF('p','pt','a4', true);
			const source = window.document.getElementById("to-pdf-print");
			pdf.addHTML(source, function() {
					//pdf.save('web.pdf');
				pdf.output('dataurlnewwindow');
			});
			this.props.appState.changeToPdf();
		},0);
	}
 
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
							<button onClick={this.exportToPdf} className="pt-button pt-minimal pt-icon-download">Download PDF</button>
							<button onClick={() => window.print()} className="pt-button pt-minimal pt-icon-print">Print Formulation</button>
						</div>
					</nav>
				</div>
				<div className="list-wrapper">
					<IngredientList appState={appState}/>
				</div>
			</div>
		</div>;
	}
}
