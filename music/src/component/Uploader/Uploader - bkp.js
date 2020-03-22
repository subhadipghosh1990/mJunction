import React, {useState,useEffect} from 'react';

import {connect} from 'react-redux';
//compressor
import imageCompression from 'browser-image-compression';


//firebase imports
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

import Landing from '../landing/Landing';
import { render } from 'react-dom';

// const Uploader = (props) => {

class Uploader extends React.Component{

    constructor(props){
        super(props);
        this.state={
            uploadFormData : {
                imgUrl:{},
                audUrl:{},
                songName:"",
                artistName:"",
                artistDescription:"" 
            },
            firebaseSongsList:[]

        }



        //refs

        this.imgRef = React.createRef();
        this.audUrl = React.createRef();
        this.songName = React.createRef();
        this.artistName = React.createRef();
        this.artistDescription = React.createRef();

        this.uploaderForm = React.createRef();
    }


    componentDidMount(){
        //console.log(this.props);
    }


    upldImg = (event) => {
        event.preventDefault();

        let uploadFormData = this.state.uploadFormData;

        uploadFormData.imgUrl = this.imgRef.current.files[0];
        uploadFormData.audUrl = this.audUrl.current.files[0];
        uploadFormData.songName = this.songName.current.value;
        uploadFormData.artistName = this.artistName.current.value;
        uploadFormData.artistDescription = this.artistDescription.current.value;

        let numOfSongs = this.imgRef.current.files.length;

        console.log(numOfSongs)


        // //console.log(uploadFormData);

        

        let th = this;       


        if(uploadFormData.imgUrl){
            var imageFile = uploadFormData.imgUrl;
              var tarName = imageFile.name;  
              var storageRef = firebase.storage().ref("images/"+tarName);
  
              var options = {
                maxSizeMB: .1,
                maxWidthOrHeight: 400,
                useWebWorker: true
              }
  
            imageCompression(imageFile, options)
            .then(function (compressedFile) {
  
                //upload task

                let firebaseSongObj={
                    imgUrl:"",
                    audUrl:"",
                    songName:"",
                    artistName:"",
                    artistDescription:""
                  }

                
                let upload = storageRef.put(compressedFile);
                  upload.on('state_changed', (snapshot)=>{
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Upload is ' + progress + '% done');          
                  }, (err)=>{
                    //console.log(err)
                  }, ()=>{

                    //109 - 171


                    // for(var i = 0; i < numOfSongs; i++){

                    // }
  
                    upload.snapshot.ref.getDownloadURL().then(function(downloadURLImg) {
                      //console.log(downloadURLImg);         
                      firebaseSongObj.imgUrl = downloadURLImg;                        
                      //console.log(firebaseSongObj);
                    });


                    //song upload
                    
                    // var audtar = uploadFormData.audUrl;
                    var audtar = th.audUrl.current.files[0];

                    var audTarName = audtar.name;   
                    var storageRef = firebase.storage().ref("music/"+audTarName);
            
                    let audUpload = storageRef.put(audtar);
            
                    audUpload.on('state_changed', (snapshot)=>{
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Aud Upload is ' + progress + '% done');         
                    }, err => {
            
                    }, ()=> {
                    audUpload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        //console.log(downloadURL);
                        firebaseSongObj.audUrl = downloadURL;

                        firebaseSongObj.songName = th.songName.current.value;
                        firebaseSongObj.artistName = th.artistName.current.value;
                        firebaseSongObj.artistDescription = th.artistDescription.current.value;

                        //console.log(firebaseSongObj);

                        firebase.database().ref('songs').push(firebaseSongObj)
                        document.getElementById("upldrFrm").reset();

                        //th.props.upldSongs(firebaseSongObj);

                    });
                    })

                    let songList = [];

                    firebase.database().ref('songs').on('child_added', async (e)=>{
                        //console.log(e.val());
                        if(e.val()){
                           await songList.push(e.val());
                            //console.log(songList);
                            th.props.firebaseListUpdate(songList);
                            
                            

                        }
                        else{
                            songList=[];
                            //console.log(songList);
                            th.props.firebaseListUpdate(songList);
                        }
                        
                    })

  
                  })
            })
            .catch(function (error) {
              //console.log(error.message);
            });
          }
        //image upload
  
  
        
        

    }


    list = () => {
        console.log(this.audUrl.current.files[0]);
    }

    
    render(){
        return(
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <form onSubmit={event => this.upldImg(event)} ref={this.uploaderForm} id="upldrFrm">
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <input id="" ref={this.songName} className="form-control" type="text" placeholder="songName"/>
                                    </div>
                                    <div className="col-6 form-group">
                                        <input id="" ref={this.artistName} className="form-control" type="text" placeholder="artistName" />
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="imgFile" ref={this.imgRef} className="form-control" type="file"/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="audUrl" ref={this.audUrl} onChange={this.list} className="form-control" type="file" multiple/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <textarea className="form-control" ref={this.artistDescription}>

                                        </textarea>
                                    </div>
                                    <div className="col-12 form-group">
                                        <button className="btn btn-success">Upload image</button>
                                    </div>                                
                                </div>
                            </form>


                            <Landing/>
                            

                        </div>
                    </div>
                </div>
            </section>
        )
       }

    

   
}


const subscribe = (state) => {
    return state;
}


const dispatcher = (dispatch) => {
    return {
        firebaseListUpdate : (list) => {
            dispatch({type:"firebaseListUpdate", payload:list})
        }
    }
}

export default connect(subscribe, dispatcher)(Uploader);
