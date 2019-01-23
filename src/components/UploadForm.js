import React, { Component } from 'react';
import {Button} from '@material-ui/core/'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import request from "superagent";
import { withSnackbar } from 'notistack';

import '../css/Upload.css'


class UploadForm extends Component {

  constructor(props){
    super(props) 
    this.state = {currentInputValue: "" , tracks: [], supportedTypes:["audio/mp3"]}
    this.updateInputValue = this.updateInputValue.bind(this);
    this.addTrackToList = this.addTrackToList.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }



  updateInputValue(event){
      console.log(event.target.value)
      this.setState({currentInputValue: event.target.value, tracks: this.state.tracks})
  }

  trunctateToMB(integer){
    var value = integer/1024
    value = value / 1024 * 10
    value = Math.trunc(value)
    return value / 10

}







  addTrackToList(acceptedFiles, rejectedFiles){
    var list = this.state.tracks
    const { enqueueSnackbar } = this.props;

    acceptedFiles.forEach(element => {

      if(element !== ""){

        if(!this.state.supportedTypes.includes(element.type)){
          console.log("Item not supported")
          enqueueSnackbar("Format de fichier non pris en charge : "+element.name, { variant: 'warning',autoHideDuration : 4000 })
          return
        }
  

        for(var i = 0; i<list.length; i++){
          if(list[i].name === element.name){
            console.log("Item already exist")
            enqueueSnackbar("Musique "+element.name+" deja présente", { variant: 'warning' ,autoHideDuration : 4000 })
            return
          }
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
    const { enqueueSnackbar } = this.props;
    const req = request.post('http://192.168.56.101:5000/track');
    const files = this.state.tracks
    
    if(files.length === 0){
      enqueueSnackbar("Veuillez selectionner au moins un fichier", { variant: 'error' ,autoHideDuration : 4000 })
      return
    }
    files.forEach(file => {
      req.attach(file.name, file);
    });
    console.log("Uploading Files")
    enqueueSnackbar("Envoi des fichiers en cours, merci de patienter", { variant: 'info' ,autoHideDuration : 4000 })
    req.end((err,res)=>{
      if(err){
        enqueueSnackbar("Echec de l'envoi des fichiers", { variant: 'error' ,autoHideDuration : 4000 })
      }
      else{
        enqueueSnackbar("Envoi des fichiers reussi !", { variant: 'success' ,autoHideDuration : 4000 })
      }
    });
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
                  <p>Glissez vos fichier ici</p> :
                  <p>Cliquer pour choisir des fichiers a envoyer ou faites les glisser ici</p>
              }
            </div>
          )
        }}
      </Dropzone>

        <ul>
        {this.state.tracks.map((track) =>
          <li key={track.name}>{track.name} : {this.trunctateToMB(track.size)}MB</li>
             )}
        </ul>

        <Button onClick={this.uploadFiles}>Envoyer les fichiers</Button>
        </div>
      

    );
  }
}

export default withSnackbar(UploadForm);

