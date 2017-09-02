import * as React from "react";
import { observer } from 'mobx-react'
import { Slider } from "@blueprintjs/core";
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import { Ingredient } from '../../interfaces';

const ANIMATION_TIME = 500;

@observer
export default class IngredientList extends React.Component<{ appState: any }, any> {
  constructor (props: any) {
    super(props);
    this.onChangePercentage = this.onChangePercentage.bind(this);
    this.changePercentage = this.changePercentage.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.state = { ingredientIdLeaving: '' };
  }

 
  //hack I can't call a mobx action from anonimus functions
  changePercentage = (ingredientId: number, value: number) => {
    this.props.appState.changePercentage(ingredientId, value);
  }
  
  removeIngredient = (ingredientId: number) => {
    this.setState({ingredientIdLeaving: ingredientId});
    setTimeout(() => {
      this.props.appState.removeIngredient(ingredientId);
      this.setState({ingredientIdLeaving: ''});
    }
    ,500);
  }
  
  onChangePercentage = (ingredientId: number) => {
    return (value: number) => this.changePercentage(ingredientId, value);
  }
  
  render () {
    const { ingredientList } = this.props.appState;
    const ingredientCard = ingredientList.map((ingredient: Ingredient, key: number) => 
      <div key={key} className={this.state.ingredientIdLeaving === ingredient.id? 
        'ella-md-ingredient-item-leave ella-md-ingredient-item-leave-active' : ''}>
        <div className="pt-callout modifier ellamd-callout">
          <div className="ellamd-remove-ingredient" onClick={() => this.removeIngredient(ingredient.id)}>
            <span className="pt-icon-standard pt-icon-cross pt-align-right"></span>
          </div>
          <h5>{ingredient.name}</h5>
          {ingredient.description}
          <div>
              {ingredient.featureNames.map((name,key) =>
                <span className="pt-tag pt-intent-success ellamd-tag" key={key}>{name}</span>
              )}
          </div>
          <div className="ellamd-slide">
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
      </div>
    );
    
    return <div className="ellamd-card">
      
      <div className="pt-card pt-elevation-1 ellamd-ingredient-list">
        <div>
          <h5><a href="#">Ingredient List</a></h5>
        </div>
        {ingredientCard}
      </div>
    </div>
  }
}