import * as React from 'react';
import { observer } from 'mobx-react'

import {AppState} from '../..';

@observer
export default class PrintTemplate extends React.Component<{appState: AppState}, {}>  {
  render() {
    const {
      user:{
        fullName,
        address,
        dateOfBirth
      },
      selectedFormula,
      ingredientList
    } = this.props.appState;
    return (
      <div id="react-print">
        <h5>EllaMD Formulation</h5>
        <div className="print-card">
          <h5>Patient Information</h5>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>
                    Full Name:
                  </label>
                </td>
                <td>
                  {fullName}
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Address:
                  </label>
                </td>
                <td>
                  {address}
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Date Of Birth:
                  </label>
                </td>
                <td>
                  {dateOfBirth.toISOString().substring(0, 10)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="print-card">
          <h5>Ingredient List</h5>
          <div>
            <table>
              <thead>
                <tr>
                  <th><label>Ingredient Name</label></th>
                  <th><label>Percentage</label></th>
                </tr>
              </thead>
              <tbody>
                {ingredientList.map((ingredient, key) => 
                <tr key={key}>
                  <td>
                    {ingredient.name}
                  </td>   
                  <td>
                    {ingredient.percentage}%
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
			</div>
    );
  }
};