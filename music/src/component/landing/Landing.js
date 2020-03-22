import React from 'react';

import {connect} from 'react-redux';
import {Link} from "react-router-dom";


import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/database';

class Landing extends React.Component{

    constructor(props){

        super();

        this.state={
            imgList:[],
            firebaseSongsList:[],
            playing:false,
            selectedSong:""
        }
    }
    
    componentDidMount(){
        //console.log(this.props.name);
        //console.log(this.props.firebaseSongsList.length)
        
    }   

    selectedSong = (url) =>{
        this.setState({
            playing:true,
            selectedSong:url
        })
    }


    closePlayer = () => {
        this.setState({
            playing:false
        })
    }


    render(){

        return(

            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        {/* <Link to="/Uploader">Uploader</Link> */}
                        {/* <h4 onClick={()=> this.props.change("Kunal")}>{this.props.name}</h4> */}

                        <h4 className="display-4">Discover</h4>            


                        {/* {JSON.stringify(this.props.firebaseSongsList[0])} */}

                        {/* {JSON.stringify(this.props.firebaseSongsList)} */}

                        {/* {this.props.firebaseSongsList ? this.props.firebaseSongsList.length : 0} */}
                        {/* {this.props.firebaseSongsList.length} */}
                        {this.props.firebaseSongsList.length ? 

                        <ul className="songsChain pl-0">
                            {this.props.firebaseSongsList.map((e,i) => {
                                return (
                                    <li key={i} className="d-inline-block m-2" onClick={()=> this.selectedSong(e.audUrl)}>
                                        <div className="SongimgHolder"><img src={e.imgUrl} className="backGroundImg"/></div>
                                        {/* <ReactAudioPlayer src={e.audUrl} controls/> */}
                                        {/* <audio className="" src={e.audUrl} controls/> */}
                                        
                                        <h5 className="pt-2 m-0">{e.songName}</h5>
                                        <small>{e.artistName}</small>
                                        {/* <AudioPlayer
                                            // autoPlay
                                            src={e.audUrl}
                                            onPlay={e => console.log("onPlay")}
                                        /> */}
                                    </li>
                                )
                            })}
                        </ul>
                        : null}
                         
                            
                         {this.state.playing ? 
                            <div className="playing">
                                <button onClick={this.closePlayer}>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <AudioPlayer
                                    autoPlay
                                    src={this.state.selectedSong}
                                    // onPlay={e => console.log("onPlay")}
                                />                                
                                            
                            </div>
                         :null}
                        
                        
                        </div>
                    </div>
                </div>
            </section>
        )

    }
}


const subscribe = (state) => {
    //console.log(state);
    return state;   
}

const dispatcher = (dispatch) => {
    return {

    }
}


export default connect(subscribe, dispatcher)(Landing);
