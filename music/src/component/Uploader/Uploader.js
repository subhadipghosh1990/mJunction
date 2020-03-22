import React from 'react';

import {connect} from 'react-redux';
//compressor
import imageCompression from 'browser-image-compression';


//firebase imports
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

import Landing from '../landing/Landing';

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
            firebaseSongsList:[],
            songsNameList:[],
            uploadSingle:false,
            uploadAlbum:false,

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


    upldAlbum = (event) =>{
        event.preventDefault();


        

        console.log(this.imgRef.current.files[0]);

        let albumLength = this.audUrl.current.files.length;

        let firebaseSongObj={
            imgUrl:"",
            audUrl:"",
            songName:"",
            artistName:"",
            artistDescription:""
          }


          let th = this;
        
        if(this.imgRef.current.files){


            var imageFile = this.imgRef.current.files[0];
            var tarName = this.imgRef.current.files[0].name;  
            var storageRef = firebase.storage().ref("images/"+tarName);

            var options = {
                maxSizeMB: .1,
                maxWidthOrHeight: 400,
                useWebWorker: true
            }
            imageCompression(imageFile, options)
            .then(function (compressedFile) {
                let upload = storageRef.put(compressedFile);
                  upload.on('state_changed', (snapshot)=>{
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Upload is ' + progress + '% done');          
                  }, (err)=>{
                    //console.log(err)
                  }, ()=>{
                    upload.snapshot.ref.getDownloadURL().then(function(downloadURLImg) {
                    //console.log(downloadURLImg);         
                        firebaseSongObj.imgUrl = downloadURLImg;                        
                        console.log(firebaseSongObj);



                            
                            let songsNameList = th.state.songsNameList;
                            console.log(songsNameList);


                            songsNameList.map((e,i)=>{


                                var storageRef = firebase.storage().ref("music/"+th.audUrl.current.files[i].name);
                                var audTarName = e;   
                                var storageRef = firebase.storage().ref("music/"+audTarName);
                                let audUpload = storageRef.put(th.audUrl.current.files[i]);

                                
                                firebaseSongObj.artistName = th.artistName.current.value;
                                firebaseSongObj.artistDescription = th.artistDescription.current.value;

                                console.log(firebaseSongObj);

                                let tt = 0

                                audUpload.on('state_changed', (snapshot)=>{
                                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                },(err) => {

                                }, ()=>{
                                    tt++;
                                    console.log(tt)
                                    audUpload.snapshot.ref.getDownloadURL().then((audDownloadUrl)=>{

                                        console.log(audDownloadUrl);
                                        firebaseSongObj.audUrl = audDownloadUrl; 
                                        firebaseSongObj.songName = audTarName;
                                        console.log(firebaseSongObj);
                                        

                                        firebase.database().ref('songs').push(firebaseSongObj)


                                        
                                    })

                                    

                                })


                                

                                

                            })                    



                    });

                    

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
           
                //return uploadToServer(compressedFile); // write your own logic
              })
              .catch(function (error) {
                console.log(error.message);
              });


              


        }
        


        


    }


    list = () => {
        console.log(this.audUrl.current.files.length);

        let songsNameList = this.state.songsNameList;

        for(var i = 0; i < this.audUrl.current.files.length; i++){
            //console.log(this.audUrl.current.files[i].name);
            songsNameList.push(this.audUrl.current.files[i].name.replace(".mp3",""));
        }


        
        this.setState({
            songsNameList:songsNameList
        })


    }


    reset = (event) => {
        event.preventDefault();
        document.getElementById("upldrFrmAlbm").reset();
    }


    uploadAlbumShow = () => {
        this.setState({
            uploadAlbum:true,
            uploadSingle:false
        })
    }
    
    uploadSingleShow = () => {
        this.setState({
            uploadAlbum:false,
            uploadSingle:true
        })
    }


    render(){
        return(
            <section className="d-flex align-items-center uploaderSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 fullvh d-flex align-items-center" onClick={this.uploadSingleShow}>
                        <img className="backGroundImg" src={require('../../images/singleUpload.jpg')} alt="#"/>

                        <h4 className={!this.state.uploadSingle ? "d-block uploaderTag" : "d-none uploaderTag"}>Upload Singles</h4>

                            <form className={this.state.uploadSingle ? "d-block" : "d-none"} onSubmit={event => this.upldImg(event)} ref={this.uploaderForm} id="upldrFrm">
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <input id="" ref={this.songName} className="form-control" type="text" placeholder="songName"/>
                                    </div>
                                    <div className="col-6 form-group">
                                        <input id="" ref={this.artistName} className="form-control" type="text" placeholder="artistName" />
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="imgFile" ref={this.imgRef} className="form-control" type="file" required/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="audUrl" ref={this.audUrl} onChange={this.list} className="form-control" type="file" required/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <textarea className="form-control" ref={this.artistDescription}>

                                        </textarea>
                                    </div>
                                    <div className="col-12 form-group">
                                        <button className="btn btn-success">Upload Song</button>
                                    </div>                                
                                </div>
                            </form>


                            
                            

                        </div>


                        <div className="col-6 fullvh d-flex align-items-center" onClick={this.uploadAlbumShow}>
                        <img className="backGroundImg" src={require('../../images/albumUpload.jpg')} alt="#"/>
                        <h4 className={!this.state.uploadAlbum ? "d-block uploaderTag" : "d-none uploaderTag"}>Upload Album</h4>
                            <form className={this.state.uploadAlbum ? "d-block" : "d-none"} onSubmit={event => this.upldAlbum(event)} ref={this.uploaderForm} id="upldrFrmAlbm">
                                <div className="row">
                                    <div className="col-12 form-group">
                                        <input id="" ref={this.artistName} className="form-control" type="text" placeholder="artistName" />
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="imgFile" ref={this.imgRef} className="form-control" type="file" required/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <input id="audUrl" ref={this.audUrl} onChange={this.list} className="form-control" type="file" multiple required/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <textarea className="form-control" ref={this.artistDescription}>

                                        </textarea>
                                    </div>
                                    <div className="col-12 form-group">
                                        <button className="btn btn-success">Upload Album</button> 
                                        <a className="btn btn-primary ml-3" href="#" onClick={(event)=>this.reset(event)}>Reset</a>
                                    </div>                                
                                </div>
                            </form>


                            
                            

                        </div>


                        {/* <Landing/> */}
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
