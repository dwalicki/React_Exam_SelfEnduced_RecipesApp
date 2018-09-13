import React from 'react';
import { Switch, Route} from 'react-router-dom';

import RecipeView from './components/Recipes';
import Home from './components/Home/home';
import Login from './containers/Admin/login';
import Logout from './components/Admin/logout'
import User from './components/Admin';
import AddRecipe from './containers/Admin/add';
import UserPosts from './components/Admin/userPosts';
import EditRecipe from './containers/Admin/edit';
import Register from './containers/Admin/register';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/login" exact component={Auth(Login,false)}/>
                <Route path="/user" exact component={Auth(User,true)}/>
                <Route path="/user/add" exact component={Auth(AddRecipe,true)}/>
                <Route path="/user/register" exact component={Auth(Register,true)}/>
                <Route path="/recipes/:id" exact component={Auth(RecipeView,null)}/>
                <Route path="/user/edit-post/:id" exact component={Auth(EditRecipe,true)}/>
                <Route path="/user/user-recipes" exact component={Auth(UserPosts,true)}/> 
                <Route path="/user/logout" exact component={Auth(Logout,true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;