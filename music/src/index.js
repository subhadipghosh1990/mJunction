import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//compressor
import imageCompression from 'browser-image-compression';

//redux imports
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';



//firebase imports
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';


import axios from 'axios'

const firebaseConfig = {
    apiKey: "AIzaSyBcAtSKk-Cl2CXYGUAE6yyFRrph-_7haNA",
    authDomain: "instaclone-c4311.firebaseapp.com",
    databaseURL: "https://instaclone-c4311.firebaseio.com",
    projectId: "instaclone-c4311",
    storageBucket: "instaclone-c4311.appspot.com",
    messagingSenderId: "304668589489",
    appId: "1:304668589489:web:b2ec36baf152301a"
};





  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


//actions
let checkImgFireBase = {type:"fireImg"}

let updateStateNow = (e,f) => {
  return {
    type:"updateState",
    payload:[e,f]
  }
}






let iState = {
    name:"Subhadip",
    imgList:[],
    musicList:[],
    user:"subhadipghosh215@gmail.com",
    firebaseSongsList:[]
}

let alerter = {type:"Alert"}

const reducer = (state=iState,action) => {


  switch (action.type) {
    case "alert":
      alert("Working!");
      break;


      case "1stUpdate":
        //console.log(action.payload)
        return{
          ...state,
          firebaseSongsList:action.payload
        }
      break;

      case "firebaseListUpdate":

      //console.log(action.payload);

      return{
        ...state,
        firebaseSongsList:action.payload
      }

      break;

    case "changeName":
      return {
        ...state,
        name:action.payload
      }
      break;    

        break;
  }

  
    return state;
}

const frstUpdate = () => {

  let songList = [];

  firebase.database().ref('songs').on('child_added', async(e)=>{
      //console.log(e.val());
      if(e.val() != null){
          await songList.push(e.val());
          //console.log(songList);
          //this.props.firebaseListUpdate(songList);
          store.dispatch({type:"1stUpdate", payload:songList})
      }
      else{
          songList=[];
          //console.log(songList);
          //this.props.firebaseListUpdate(songList);
          store.dispatch({type:"1stUpdate", payload:songList})
      }
      
  })
}

frstUpdate();

const store = createStore(reducer, applyMiddleware(ReduxThunk));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
