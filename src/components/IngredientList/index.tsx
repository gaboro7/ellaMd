import * as React from "react";
import { observer } from 'mobx-react'
import { Slider } from "@blueprintjs/core";

import "!style-loader!css-loader!sass-loader!./styles.scss";

import { Ingredient } from '../../interfaces';

@observer
export default class IngredientList extends React.Component<{ appState: any }, any> {
  constructor (props: any) {
    super(props);
    this.ingredientCard = this.ingredientCard.bind(this);
    this.onChangePercentage = this.onChangePercentage.bind(this);
    this.changePercentage = this.changePercentage.bind(this);
  }



  ingredientCard = (ingredient: Ingredient, key: number) => {
    return <div key={key}>
      <div className="pt-callout modifier ellamd-callout">
        <h5>{ingredient.name}</h5>
         {ingredient.description}
         <div>
            {ingredient.featureNames.map((name,key) =>
              <span className="pt-tag pt-intent-success ellamd-tag" key={key}>{name}</span>
            )}
         </div>
         <Slider
            min={ingredient.minimumPercentage}
            max={ingredient.maximumPercentage}
            stepSize={0.01}
            onChange={this.onChangePercentage(ingredient.id)}
            showTrackFill={false}
            value={ingredient.percentage}
          />
      </div>

    </div>
  }


  changePercentage = (ingredientId: number, value: number) => {
    this.props.appState.changePercentage(ingredientId, value);
  }

  onChangePercentage = (ingredientId: number) => {
    return (value: number) => this.changePercentage(ingredientId, value);
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