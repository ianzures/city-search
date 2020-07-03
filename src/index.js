import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.body.style = 'background: #ffffcc;';

const headBox = {
    paddingTop: '3%',
    paddingBottom: '2%',
    paddingLeft: '10%',
    backgroundColor: '#ff0066',
}

const title = {
    fontSize: '300%',
    fontFamily: "Times New Roman",
    fontWeight: 'bold',
    color: '#ffffcc'
}

const search = {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px'
}

const result = {
    marginTop: '3%',
    marginLeft: '30%',
    marginRight: '30%',
    paddingLeft: '2%',
    paddingBottom: "2%",
    paddingRight: "2%",
    borderStyle: 'solid',
    borderRadius: '10px',
    backgroundColor: '#fdfcfc',
    wordWrap: "normal",
    fontFamily: "Times New Roman",
}

const cellTitle = {
    fontSize: "120%",
    fontFamily: "Times New Roman",
    textDecoration: "underline"
}

export default class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            formatted: ''
        };
    }


    handleSubmit = event => {

        event.preventDefault();

        // Set zipCodes to an empty list, so that the zip codes of the previous search a no longer displayed. 
        this.setState({ zipCodes: [] });

        // Concatonate input to url and ...
        axios.get("http://ctp-zip-api.herokuapp.com/city/" + this.state.name).then(result => {

            /* Convert the array of zip codes into a string. It is likely that we will exceed a reasonable number of strings to 
               display seperately. Displaying a single string that wraps around will take up much less space on the page.*/
            let str = '';
            result.data.forEach(zip => str += (zip + ', '));

            // Two characters need to be removed from the string, an extraneous comma and the space that follows.
            this.setState({ formatted: str.substring(0, str.length - 2) });

            // If call to axios.get() fails, alert user that their input was invalid. 
        }).catch(function (err) {
                alert("Invalid city name.");
            }
        );  
        
    }

    handleChange = event => {
        // Call to API only accepts names in all caps.
        let formated = event.target.value.toUpperCase();
        this.setState({ name: formated });
    }

    render() {
        return (
            <React.Fragment>

                {/* Box containing the name of the page */}
                <div style={headBox}>

                    {/* Page title */}
                    <div style={title}> City Search </div>
                </div>

                {/* User input */}
                <form onSubmit={this.handleSubmit}>
                    <label style={search} > Enter city name: 
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                </form>

                <div style={result}>
                    <p style={cellTitle}>Zip codes associated with this city : </p><br></br>
                    {this.state.formatted}
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <CitySearch />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
