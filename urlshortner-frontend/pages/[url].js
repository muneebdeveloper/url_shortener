import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Main from '../components/main/index';
import CircularProgress from '@material-ui/core/CircularProgress';



const URL_QUERY = gql`
query URL_QUERY($shortURLcode:String!){
  uRL(where:{shortURLcode:$shortURLcode}){
    longURL
  }
}
`;


const URLPage = (props)=>{
  
    return(
        <Query 
      query={URL_QUERY} 
      variables={{shortURLcode:props.query.url}}
      onCompleted={
        (data)=>{
          if(data.uRL){
            window.location.replace(data.uRL.longURL);
          }else{
            window.location.replace(window.location.origin);
        }
      }
    }
    >
      {
        ({data,loading})=>{

          if(loading || data.uRL){
            return(
              <div className="loadingpage">
                <CircularProgress size={70} />
              </div>
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


export default URLPage;