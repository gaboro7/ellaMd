import * as React from "react";
import { DateInput } from '@blueprintjs/datetime';
import { observer } from 'mobx-react'

import {AppState} from '../..';

@observer
export default class UserForm extends React.Component<{ appState: AppState }, any> {
  constructor (props: any) {
    super(props)

    this.updateProperty = this.updateProperty.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  updateProperty (key, value) {
    this.props.appState.changePerson(key, value);
  }

  onChange (event) {
    this.updateProperty(event.target.name, event.target.value);
  }


  render () {
    const {
      user:{
        fullName,
        address,
        dateOfBirth
      }
    } = this.props.appState;
    return <div className="ellamd-card">
      <div className="pt-card pt-elevation-1 ellamd-user-information">
        <h5><a href="#">User Information</a></h5>
        <div className="ellamd-user-form">
          <div className="pt-form-group">
            <label className="pt-label">
              Complete Name
              <span className="pt-text-muted">(required)</span>
            </label>
            <div className="pt-form-content">
              <input
                className="pt-input input-width"
                placeholder="Complete Name"
                type="text"
                dir="auto"
                onChange={this.onChange}
                name="fullName"
                value={fullName}
              />
            </div>
          </div>
          <div className="pt-form-group">
            <label className="pt-label">
              Adrress
              <span className="pt-text-muted">(required)</span>
            </label>
            <div className="pt-form-content">
              <input
                className="pt-input input-width"
                placeholder="Address"
                type="text"
                dir="auto"
                name="address"
                onChange={this.onChange}
                value={address}
              />
            </div>
          </div>
          <div className="pt-form-group">
            <label className="pt-label">
              Date of Birth
              <span className="pt-text-muted">(required)</span>
            </label>
            <div className="pt-form-content">
              <div className="pt-input-group">
                <DateInput
                  onChange={(newDate) => this.updateProperty('dateOfBirth', newDate)}
                  value={dateOfBirth}
                  minDate={new Date('1901/01/01')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
