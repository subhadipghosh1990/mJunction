import React,{useEffect} from 'react';
import {connect} from 'react-redux';

//css
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

//components
import Header from './component/header/Header';
import Splash from './component/splash/Splash';
import Landing from './component/landing/Landing';
import Uploader from './component/Uploader/Uploader';

function App (props) {

  //console.log(props);

  useEffect(()=>{
    console.log(props);
  })

  return (

    <BrowserRouter>

    <div className="App">
      <Header/>

      <Switch>
        <Route exact path="/"><Splash/></Route>
        <Route path="/Landing"><Landing/></Route>
        <Route path="/Uploader"><Uploader/></Route>
        
      </Switch>
    </div>

    </BrowserRouter>
  );

}




const subscribe = (state) => {
  return state;
}

const dispatcher = (dispatch) => {
  return {
      alert: () => {
          dispatch({type:"alert"})
      },
      fireImg: () => {
          dispatch({type:"fireImg"})
      }
  }
}

export default connect(subscribe,dispatcher)(App);
