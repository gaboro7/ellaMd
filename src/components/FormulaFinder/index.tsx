import * as React from "react";
import { observer } from 'mobx-react'
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import "!style-loader!css-loader!sass-loader!./styles.scss";

const TOP_100_FILMS = [{id: 1, name: "name 1"}, {id: 2, name: "name 2"}, {id: 3, name: "name 3"}];
const FormulaSelect = Select.ofType<any>();

@observer
export default class FormulaFinder extends React.Component<{ appState: any }, any> {
  constructor (props: any) {
    super(props)
    this.onSelectFormula = this.onSelectFormula.bind(this);
  }

  onSelectFormula(formula) {
    this.props.appState.selectFormula(formula.id);
  }

  render () {
    const {
      appState: {
        selectedFormulaId
      }
    } = this.props
    return <div className="usuer-information-card-container">
      <div className="pt-card pt-elevation-1">
        <h5><a href="#">Find your base formula</a></h5>
        <FormulaSelect
          items={TOP_100_FILMS}
          itemPredicate={(query: string, item: any, index: number): boolean => {
            return item.name.indexOf(query) !== -1;
          }}
          itemRenderer={(value) => {
            return <MenuItem 
              key={value.item.id}
              label={value.item.name}  
              onClick={value.handleClick}
              text={value.item.name}
            />;
          }}
          noResults={<MenuItem disabled text="No results." />}
          onItemSelect={this.onSelectFormula}
        >
            {/* children become the popover target; render value here */}
          <Button 
            text={
              selectedFormulaId ?
              TOP_100_FILMS.find((formula) => formula.id === selectedFormulaId).name :
              'Find your formula'
            } 
            rightIconName="double-caret-vertical" 
          />
        </FormulaSelect>
      </div>
    </div>
  }
}
