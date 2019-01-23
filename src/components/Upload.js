import React, { Component } from 'react';
import {Fab} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add"
import UploadForm from './UploadForm'
import '../css/Upload.css'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';



class Upload extends Component{

    constructor(props){
        super(props)
        this.state = {modalState : false}
    }

    handleOpenModal(){
        this.setState({modalState : true})
    }
    handleCloseModal(){
        this.setState({modalState : false})
    }

render(){
    if(this.props.tab !== 3){
        return null;
      }
    return(
        <div className="fixedbutton">
        <Fab onClick={this.handleOpenModal.bind(this)} color="primary" variant="extended" aria-label="Edit">
        <AddIcon />
        Ajouter une musique
      </Fab>
      <Dialog
          open={this.state.modalState}
          onClose={this.handleCloseModal.bind(this)}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Ajouter un fichier</DialogTitle>

        <DialogContent>
            <UploadForm/>
          </DialogContent>
      </Dialog>
      
        </div>

    )
}
    
}

export default withSnackbar(Upload);