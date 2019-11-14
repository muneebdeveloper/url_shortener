import React,{Component} from 'react';
import Typist from 'react-typist';

import Search from './Search';
import styles from './Search.css';

class Main extends Component{

    state={
        shortURL:'',
        longURL:''
    }

    render(){
        return(
            <>
                <div className="upperhead">
                    <Typist cursor={{ show:false,hideWhenDone: true }}>
                        <h1 className={styles.headingH1}> URL Shortner by Muneeb Akhlaq </h1>
                        {/* <Typist.Backspace count={18} delay={200} />
                        <h1> Muneeb Developer </h1> */}
                    </Typist>
                    <Search 
                        URLdetails={(shortURL,longURL)=>this.setState({shortURL,longURL})}
                    />
                </div>
                {
                    this.state.shortURL && (
                        <div style={{gridColumn:"2/10",textAlign:"center"}}>
                            <a 
                            style={{color:"gray"}}
                            href={`${window.location.origin}/${this.state.shortURL}`}
                            target="_blank"
                            ><h1>{`${window.location.origin}/${this.state.shortURL}`}</h1></a>                        
                        </div>
                    )
                }
            </>
        );
    }
}

export default Main;