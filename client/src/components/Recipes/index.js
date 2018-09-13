import React, { Component } from 'react';
import { getRecipeWithChef, clearRecipeWithChef } from '../../actions';
import { connect } from 'react-redux';

class RecipeView extends Component {

    componentWillMount(){
        this.props.dispatch(getRecipeWithChef(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearRecipeWithChef())
    }
    renderRecipe = (recipes) => (
        recipes.recipe ? 
            <div className="ri_container">
                <div className="ri_header">
                    <h2>{recipes.recipe.name}</h2>
                    <h5>{recipes.recipe.chef}</h5>
                    <div className="ri_chef">
                        <span>Rated by:</span> {recipes.chef.name} {recipes.chef.lastname}
                    </div>
                </div>
                <div className="ri_instructions">
                    {recipes.recipe.instructions}
                </div>
                <div className="ri_box">
                    <div className="left">
                        <div>
                            <span>Ingredients Total:</span> {recipes.recipe.ingredients}
                        </div>
                        <div>
                            <span>Price Estimate:</span> ${recipes.recipe.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{recipes.recipe.rating}/5</div>
                    </div>
                </div>
            </div>
        :null
    )

    render() {
        console.log('7777777',this.props)
        let recipes = this.props.recipes;

        return (
            <div>
                {this.renderRecipe(recipes)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        recipes:state.recipes
    }
}

export default connect(mapStateToProps)(RecipeView)