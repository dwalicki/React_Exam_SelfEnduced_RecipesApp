import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipe, updateRecipe, clearRecipe, deleteRecipe } from '../../actions/index';

class EditBook extends PureComponent {

    state = {
        formdata:{
            _id:'this.props.match.params.id',
            name:'',
            chef:'',
            instructions:'',
            ingredients:'',
            rating:'',
            price:''
        }
    }

    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }

        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }


    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(updateRecipe(this.state.formdata))
    }

    deletePost = () => {
        this.props.dispatch(deleteRecipe(this.props.match.params.id))
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/user-recipes')
        },1000)
    }

    componentWillMount(){
        this.props.dispatch(getRecipe(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){

        let recipe = nextProps.recipes.recipe
        this.setState({
            formdata:{
                _id:recipe._id,
                name:recipe.name,
                chef:recipe.chef,
                instructions:recipe.instructions,
                ingredients:recipe.ingredients,
                price:recipe.price
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearRecipe())
    }

    render() {
        let recipes = this.props.recipes
        return (
            <div className="rl_container article">
                {
                    recipes.updateRecipe ?
                        <div className="edit_confirm">
                            post updated , <Link to={`/recipes/${recipes.recipe._id}`}>
                                Click to see your recipe
                            </Link>
                        </div>
                    :null
                }

                {
                    recipes.postDeleted ?
                        <div className="red_tag">
                            Post Deleted
                            {this.redirectUser()}
                        </div>
                    : null
                }

                <form onSubmit={this.submitForm}>
                    <h2>Edit Recipe</h2>

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
                            placeholder="Enter chef"
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
                            placeholder="Enter ingredients"
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
                            placeholder="Enter price"
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        />
                    </div>

                    <button type="submit">Edit recipe</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}
                        >
                            Delete review
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        recipes:state.recipes
    }
}

export default connect(mapStateToProps)(EditBook)