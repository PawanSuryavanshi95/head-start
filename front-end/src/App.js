import React,{ Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/screens/Home';
import Navbar from './components/Navbar';
import Posts from './components/screens/Posts';
import Profile from './components/screens/Profile';
import Footer from './components/Footer';
import SignIn from './components/screens/SignIn';
import RegisterPerson from './components/screens/register/RegisterPerson';
import RegisterFirm from './components/screens/register/RegisterFirm';
import Register from './components/screens/register/Register';
import CreateEmployer from './components/screens/register/CreateEmployer';
import CreateJobOffer from './components/screens/CreateJobOffer';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path='/posts' component={Posts}/>
              <Route exact path='/profile/:userName' component={Profile}/>
              <Route path='/profile/:userName/create' component={CreateJobOffer}/>
              <Route path="/signin" component={SignIn}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/register/1" component={CreateEmployer}/>
              <Route path="/register/:reg_id/person" component={RegisterPerson}/>
              <Route path="/register/:reg_id/firm" component={RegisterFirm}/>
              <Route path="/register/:reg_id" component={RegisterPerson}/>
            </Switch>   
            <Footer/>
      </BrowserRouter>
    )
  }
}

export default App;
