import * as React from "react";
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { DatePicker } from '@blueprintjs/datetime';

import "!style-loader!css-loader!sass-loader!./styles.scss";

import Header from '../Header';
import UserForm from '../UserForm';



export default class MainContainer extends React.Component<{ person: any }, undefined> {
	render() {
		return <div>
			<Header/>
			<UserForm person={this.props.person}/>
			<DevTools/>
		</div>;
	}
}
