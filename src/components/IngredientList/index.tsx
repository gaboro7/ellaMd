import * as React from "react";
import { observer } from 'mobx-react'
import { Slider, Button, Dialog } from "@blueprintjs/core";
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Ingredient } from '../../interfaces';
import {AppState} from '../..';

const ANIMATION_TIME = 300;

@observer
export default class IngredientList extends React.Component<{ appState: AppState }, any> {
  constructor (props: any) {
    super(props);
    this.onChangePercentage = this.onChangePercentage.bind(this);
    this.changePercentage = this.changePercentage.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.state = { ingredientIdLeaving: '', isOpen: false };
  }


  //hack I can't call a mobx action from anonimus functions
  private changePercentage = (ingredientId: number, value: number) => {
    this.props.appState.changePercentage(ingredientId, value);
  }

  private removeIngredient = (ingredientId: number) => {
    this.setState({ingredientIdLeaving: ingredientId});
    setTimeout(() => {
      this.props.appState.removeIngredient(ingredientId);
      this.setState({ingredientIdLeaving: ''});
    }
    , ANIMATION_TIME);
  }

  private addIngredient = (ingredient: Ingredient) => {
    if(this.state.ingredientIdLeaving == '') {
      this.setState({ingredientIdLeaving: ingredient.id});
      setTimeout(() => {
        this.props.appState.addIngredientToFormula(ingredient);
        this.setState({ingredientIdLeaving: ''});
      }
      , ANIMATION_TIME);
    }
  }

  private onChangePercentage = (ingredientId: number) => {
    return (value: number) => this.changePercentage(ingredientId, value);
  }

  private toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });

  render () {
    const { ingredientList, notUsedIngredients } = this.props.appState;
    const ingredientCard = ingredientList.map((ingredient: Ingredient, key: number) =>
      <div key={key} className={this.state.ingredientIdLeaving === ingredient.id?
        'ella-md-ingredient-item-leave ella-md-ingredient-item-leave-active' :
        'ella-md-ingredient-item-enter ella-md-ingredient-item-enter-active'}>
        <div className="pt-callout modifier ellamd-callout">
          <div className="ellamd-remove-ingredient" onClick={() => this.removeIngredient(ingredient.id)}>
            <span className="pt-icon-standard pt-icon-cross"></span>
          </div>
          <h5>{ingredient.name}</h5>
          {ingredient.description}
          <div>
            {ingredient.featureNames.map((name,key) =>
              <span className="pt-tag pt-intent-success ellamd-tag" key={key}>{name}</span>
            )}
          </div>
          <div className="ellamd-slide">
            <div>
              Percentage:
            </div>
            <div>
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
      </div>
    );

    const dialog = (
      <div>
        <Dialog
          isOpen={this.state.isOpen}
          onClose={this.toggleDialog}
          title="Add a new ingredient"
        >
          <div className="pt-dialog-body ella-md-dialog">
            {notUsedIngredients.map((ingredient, key) =>
              <div key={key} className={this.state.ingredientIdLeaving === ingredient.id?
                'ella-md-ingredient-item-leave ella-md-ingredient-item-leave-active' : ''}>
                <div className="pt-callout modifier ellamd-callout">
                  <h5>{ingredient.name}</h5>
                  <div className="ellamd-add-ingredient" onClick={() => this.addIngredient(ingredient)}>
                    <span className="pt-icon-standard pt-icon-add ellamd-big-icon"></span>
                  </div>
                  {ingredient.description}
                  <div>
                    {ingredient.featureNames.map((name,key) =>
                      <span className="pt-tag pt-intent-success ellamd-tag" key={key}>{name}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>);

    return <div className="ellamd-card">
      <div className="pt-card pt-elevation-1 ellamd-ingredient-list">
        {dialog}
        <div>
          <h5><a href="#">Ingredient List</a></h5>
          <div className="ellamd-add-ingredient" onClick={this.toggleDialog}>
            <span className="pt-icon-standard pt-icon-add ellamd-big-icon"></span>
          </div>
        </div>
        {(ingredientList.length === 0) &&
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-folder-open"></span>
            </div>
            <h4 className="pt-non-ideal-state-title">This list is empty</h4>
            <div className="pt-non-ideal-state-description">
              You can add new ingredients to the list finding
              your formulation clicking on "Find your Formulation" or add new ingredients clicking on
              <span className="pt-icon-standard pt-icon-add example-icon"/>
            </div>
          </div>
        }
        {ingredientCard}
      </div>
    </div>
  }
}