import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe, clearNewRecipe } from '../../actions';

class AddRecipe extends Component {
    
    state = {
        formdata:{
            name:'',
            chef:'',
            instructions:'',
            ingredients:'',
            rating:'1',
            price:''
        }
    }

    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
    }
        newFormdata[name] = event.target.value

        this.setState({
            formdata : newFormdata
        })
    }

    showNewRecipe = (recipe) => (
        recipe.post ?
            <div className="conf_link">
                This recipe sounds delicious! <Link to={`/recipes/${recipe.recipeId}`}>
                    Click this link to see your recipe
                </Link>
            </div>
        :null
    )

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addRecipe({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewRecipe())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a Recipe</h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter name"
                            value={this.state.formdata.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter chef - mom's recipes were always the best"
                            value={this.state.formdata.chef}
                            onChange={(event)=>this.handleInput(event,'chef')}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.instructions}
                        onChange={(event)=>this.handleInput(event,'instructions')}
                    />

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter number of ingredients"
                            value={this.state.formdata.ingredients}
                            onChange={(event)=>this.handleInput(event,'ingredients')}
                        />
                    </div>

                    <div className="form_element">
                        <select 
                            value={this.state.formdata.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Estimated Price"
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        />
                    </div>

                    <button type="submit">
                        Add Recipe
                    </button>
                {
                    this.props.recipes.newrecipe ?
                        this.showNewRecipe(this.props.recipes.newrecipe)
                    :null
                }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        recipes:state.recipes
    }
}


export default connect(mapStateToProps)(AddRecipe);