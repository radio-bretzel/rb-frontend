import React, { Component } from 'react';
import Upload from './Upload';
import Drawer from './Drawer';
import { SnackbarProvider } from 'notistack';


class Page extends Component{

    constructor(props){
        super(props)
        this.state = {currentTab : 1}
    }

    handleTabChange(tabInt){
        console.log(tabInt)
        this.setState({currentTab : tabInt})
        console.log(this.state)
    }

    render(){

        return (
            <SnackbarProvider maxSnack={10}>

            <div>

                <Drawer handleTabChange={this.handleTabChange.bind(this)} />
                <Upload tab={this.state.currentTab} />
                

            </div>
            </SnackbarProvider>

        )
    }

}

export default Page;