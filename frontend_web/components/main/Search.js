import React,{Component} from 'react';
import gql from 'graphql-tag';
import {ApolloConsumer} from 'react-apollo';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './Search.css';


const CREATE_SHORT_URL_MUTATION = gql`
    mutation CREATE_SHORT_URL_MUTATION($longURL:String!){
        createURL(data:{longURL:$longURL}){
            shortURLcode
            longURL
        }
    }
`;


class Search extends Component{

    state={
        longURL:'',
        loading:false,
        errorDialog:false,
        errorMessage:"Something went wrong"
    }

    inputChangeHandler = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    formSubmitHandler = async (client,e)=>{

        e.preventDefault();

        this.setState({
            loading:true
        });

        try{
            let res = await client.mutate({
                mutation:CREATE_SHORT_URL_MUTATION,
                variables:{
                    longURL:this.state.longURL
                }
            });
            this.props.URLdetails(res.data.createURL.shortURLcode,res.data.createURL.longURL);
            this.setState({
                loading:false
            })

        }catch(err){
            this.setState({
                loading:false,
                errorDialog:true,
                errorMessage:"something went wrong"
            })
        }

    }

    render(){

        const {
            longURL,
            loading,
            errorDialog,
            errorMessage
            } = this.state;
        return(
            <>
            <ApolloConsumer>
                {
                    (client)=>{
                        return(
                                <div className={styles.searchDiv}>
                                <form onSubmit={(e)=>this.formSubmitHandler(client,e)}>
                                    <input 
                                        type="text"
                                        className={styles.searchInput}
                                        value={longURL}
                                        name="longURL"
                                        onChange={this.inputChangeHandler}
                                        autoFocus                  
                                    />
                                    {
                                        loading ? (
                                            <div className={styles.loadingDiv} >
                                                <CircularProgress 
                                                    size={45}   
                                                />
                                            </div>
                                        ):(
                                        <Button 
                                            variant="contained"
                                            size="large"
                                            className={styles.button}
                                            type="submit"
                                            disabled={longURL?false:true}
                                        >
                                            Submit
                                            </Button>
                                        )
                                    }
                                    </form>
                                </div>
                            
                        );
                    }
                }
            </ApolloConsumer>
            <Dialog open={errorDialog} onClose={()=>this.setState({errorDialog:false})}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{errorMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={()=>this.setState({errorDialog:false})}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            </>
        );
    }
}


export default Search;