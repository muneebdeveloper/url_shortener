import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Router from 'next/router';
import redirect from 'nextjs-redirect';

import CircularProgress from '@material-ui/core/CircularProgress';

import Main from '../components/main/index';



const URL_QUERY = gql`
  query URL_QUERY($shortURLcode:String!){
    uRL(where:{shortURLcode:$shortURLcode}){
      longURL
    }
  }
`;



const HomePage = (props)=>{

  return(
    <Query 
      query={URL_QUERY} 
      variables={{shortURLcode:props.query.url?props.query.url:""}}
      onCompleted={
        async(data)=>{
          if(data.uRL){
            await window.location.replace(data.uRL.longURL);
          }
          
        }
      }
    >
      {
        ({data,loading})=>{

          if(loading || data.uRL){
            return(
              <CircularProgress size={70} />
            )
            }

          return(
                    <Main />
          )

        }
      }
    </Query>
  );
}

export default HomePage;