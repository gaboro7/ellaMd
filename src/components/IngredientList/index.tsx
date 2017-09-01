import * as React from "react";
import { observer } from 'mobx-react'

import "!style-loader!css-loader!sass-loader!./styles.scss";

import { Ingredient } from '../../interfaces';

@observer
export default class IngredientList extends React.Component<{ appState: any }, any> {
  constructor (props: any) {
    super(props)
  }

  ingredientCard = (ingredient: Ingredient, key: number) => {
    return <div key={key}>
      {ingredient.name}
    </div>
  }

  render () {
    const { ingredientList } = this.props.appState;
    return <div className="usuer-information-card-container">
      <div className="pt-card pt-elevation-1">
        <h5><a href="#">Ingredient List</a></h5>
        {ingredientList.map((ingredient: Ingredient, key: number) => 
          this.ingredientCard(ingredient, key)
        )}
      </div>
    </div>
  }
}