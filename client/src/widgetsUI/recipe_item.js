import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = (item) => {
    return (
        <Link to={`/recipes/${item._id}`} className="recipe_item">
            <div className="recipe_header">
                <h2>{item.name}</h2>
            </div>
            <div className="recipe_items">
                <div className="recipe_chef">{item.chef}</div>

                <div className="recipe_bubble">
                    <strong>Price</strong> $ {item.price}
                </div>

                <div className="recipe_bubble">
                    <strong>Ingredients</strong> {item.ingredients}
                </div>

                <div className="recipe_bubble rating">
                    <strong>Rating</strong> {item.rating}
                </div>
            </div>
        </Link>
    );
};

export default RecipeItem;