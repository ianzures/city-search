import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
/*
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
    marginTop: '.5%',
    marginLeft: '40%',
    marginRight: '40%',
    borderStyle: 'solid',
    borderRadius: '10px',
    backgroundColor: '#fdfcfc'
}

const cellTitle = {
    fontSize: "110%",
    fontFamily: "Times New Roman",
    marginLeft: '4%'
}

*/
export default class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCodes: [],
            name: '',
        };
    }


    handleSubmit = event => {

        event.preventDefault();

        // Set zipCodes to an empty list, so that the zip codes of the previous search a no longer displayed. 
        this.setState({ zipCodes: [] });

        // Concatonate input to url and place result in zipCodes array.
        axios.get("http://ctp-zip-api.herokuapp.com/city/" + this.state.name).then(result => {
            this.setState({ zipCodes: result.data });

            // If call to axios.get() fails, alert user that their input was invalid. 
        }).catch(function (err) {
                alert("Invalid city name.");
            }
        );


    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                {/*
                <div style={headBox}>

                    <div style={title}> City Search </div>

                </div>*/}

                {/* User input */}
                <form onSubmit={this.handleSubmit}>
                    <label > Enter city name:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                </form>
                {/*{this.state.zipCodes.map(x => <p>{x}</p>)}*/}

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
