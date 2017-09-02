import * as React from "react";
import { observer } from 'mobx-react'
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";

import { AppState } from '../..';
import { Formulation } from '../../interfaces';

const FormulaSelect = Select.ofType<Formulation>();

@observer
export default class FormulaFinder extends React.Component<{appState: AppState}, {}> {
  constructor (props: any) {
    super(props)
    this.onSelectFormula = this.onSelectFormula.bind(this);
  }

  onSelectFormula(formula) {
    this.props.appState.selectFormula(formula);
  }

  render () {
    const {
      appState: {
        selectedFormula,
        formulationList
      }
    } = this.props
    return <div className="ellamd-card">
      <div className="pt-card pt-elevation-1 ellamd-find-formula">
        <h5><a href="#">Find formula</a></h5>
        <div className="pt-form-group">
          <label className="pt-label">
            Find a base formula.
          </label>
          <div className="pt-form-content">
            <FormulaSelect
              items={formulationList}
              itemPredicate={(query: string, item: Formulation, index: number): boolean => {
                return item.name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1;
              }}
              itemRenderer={(value) => {
                return <MenuItem 
                  key={value.item.id}
                  label={''}  
                  onClick={value.handleClick}
                  text={value.item.name}
                />;
              }}
              noResults={<MenuItem disabled text="No results." />}
              onItemSelect={this.onSelectFormula}
            >
              <Button 
                text={
                  selectedFormula && selectedFormula.id ?
                  formulationList.find((formula) => formula.id === selectedFormula.id).name :
                  'Find your formula'
                } 
                rightIconName="double-caret-vertical" 
                className=".pt-intent-success"
              />
            </FormulaSelect>
          </div>
        </div>
        
      </div>
    </div>
  }
}
