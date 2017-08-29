import * as React from "react";
import { DateInput } from '@blueprintjs/datetime';

import "!style-loader!css-loader!sass-loader!./styles.scss";

export default function() {
  return <div className="usuer-information-card-container">
    <div className="pt-card pt-elevation-1">
      <h5><a href="#">User Information</a></h5>
      <div className="pt-form-group">
        <label className="pt-label">
          Complete Name
          <span className="pt-text-muted">(required)</span>
        </label>
        <div className="pt-form-content">
          <input className="pt-input input-width"  placeholder="Complete Name" type="text" dir="auto" />
        </div>
      </div>
      <div className="pt-form-group">
        <label className="pt-label" htmlFor="example-form-group-input-a">
          Adrress
          <span className="pt-text-muted">(required)</span>
        </label>
        <div className="pt-form-content">
          <input className="pt-input input-width"  placeholder="Address" type="text" dir="auto" />
        </div>
      </div>
      <div className="pt-form-group">
        <label className="pt-label" htmlFor="example-form-group-input-b">
          Date of Birth
          <span className="pt-text-muted">(required)</span>
        </label>
        <div className="pt-form-content">
          <div className="pt-input-group">
            <DateInput/>
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
