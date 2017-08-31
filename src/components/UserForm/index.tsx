import * as React from "react";
import { DateInput } from '@blueprintjs/datetime';
import { observer } from 'mobx-react'

import "!style-loader!css-loader!sass-loader!./styles.scss";

@observer
export default class UserForm extends React.Component<{ appState: any }, any> {
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
    return <div className="usuer-information-card-container">
      <div className="pt-card pt-elevation-1">
        <h5><a href="#">User Information</a></h5>
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
            />
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="example-form-group-input-a">
            Adrress
            <span className="pt-text-muted">(required)</span>
          </label>
          <div className="pt-form-content">
            <input
              className="pt-input input-width"
              placeholder="Address"
              type="text"
              dir="auto"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="example-form-group-input-b">
            Date of Birth
            <span className="pt-text-muted">(required)</span>
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <DateInput
                onChange={(newDate) => this.updateProperty('dataOfBirth', newDate)}
              />
            </div>
          </div>
        </div>
        <button type="button" className="pt-button pt-intent-success">
          Next step
          <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
        </button>
      </div>
    </div>
  }
}
