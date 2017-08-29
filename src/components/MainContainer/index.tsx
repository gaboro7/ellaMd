import * as React from "react";
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { DatePicker } from '@blueprintjs/datetime';

import "!style-loader!css-loader!sass-loader!./styles.scss";

import Header from '../Header';
import UserForm from '../UserForm';


export interface AppProps {
}

export default class MainContainer extends React.Component<AppProps, undefined> {
	render() {
		return <div>
			<Header/>
			<UserForm/>
			<DevTools/>
		</div>;
	}
}
