import React, { Component } from 'react';
import {Button} from '@material-ui/core/'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import request from "superagent";

class Upload extends Component {

  constructor(props){
    super(props)
    this.state = {currentInputValue: "" , tracks: []}
    this.updateInputValue = this.updateInputValue.bind(this);
    this.addTrackToList = this.addTrackToList.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  updateInputValue(event){
      console.log(event.target.value)
      this.setState({currentInputValue: event.target.value, tracks: this.state.tracks})
  }



  addTrackToList(acceptedFiles, rejectedFiles){
    var list = this.state.tracks
    acceptedFiles.forEach(element => {

      if(element !== ""){

        if(this.state.tracks.includes(element)){
          console.log("La valeur existe deja")
          return
        }
  
        list.push(element)
        this.setState(state => ({
          tracks:list
    
        }));
        console.log('Added item to track list')
        console.log(this.state.tracks)
      }
      else{
        console.log("Input is empty !")
      }
      
    });
    
    
  }

  uploadFiles(){
    const req = request.post('http://192.168.56.101:5000/track');
    const files = this.state.tracks
    files.forEach(file => {
      req.attach(file.name, file);
    });
    console.log("Uploading Files")
    req.end();
  }

  render() {
    return (

      <div>



<Dropzone onDrop={this.addTrackToList}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Dropzone>

        <ul>
        {this.state.tracks.map((track) =>
          <li key={track.name}>{track.name}</li>
             )}
        </ul>

        <Button onClick={this.uploadFiles}>Envoyer les fichiers</Button>



        

      </div>

    );
  }
}

export default Upload;
