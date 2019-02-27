import React, { Component } from 'react';
import './App.css';
import LineChart from './components/LineChart';
import fireServices from './services/fireServices';

class App extends Component {
  constructor() {
    super()
    this.state = {
      userSearch: '',
      co2: [],
      pop: [],
      specificCo2: [],
      specificPop: [],
      perCapita: [],
      renderCase: "",
      countryList: [],
    }
  }
  componentDidMount = async () => {
    const co2 = await fireServices.getAllemissions();
    const pop = await fireServices.getPopulation();
    this.setState({ co2, pop });

  }

  inputChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //haetaan kokonais array:stä halutun maan speksit ja asetetaan omiin arrayihin.
  search = () => { //tähä joku if/else samojen haun estämiseks
    var userCo2 = this.state.userSearch;
    userCo2 = userCo2.charAt(0).toUpperCase() + userCo2.slice(1);
    this.setState({
      specificCo2: this.state.co2.filter(co2 => co2.Country === userCo2),
      specificPop: this.state.pop.filter(pop => pop.Country === userCo2),
      renderCase: "co2",
    });
    this.updateList(userCo2)
  };


  //tehää userin hauista jo valmiiks array mikä passataan chartille
  updateList = (userCo2) => {
    let country = this.state.co2.filter(co2 => co2.Country === userCo2)
    this.setState({
      countryList: [...this.state.countryList, country]
    })
    if (userCo2 === undefined) {
      userCo2 = this.state.specificCo2[0].Country
    }
    let flattenedArray = [].concat(...Object.values(this.state.countryList));
    const co2Data = Object.values(flattenedArray);
    return co2Data;
  }

  perCapita = () => {
    //lasketaan päästöt asukaslukuun nähden ja asetetaan perCapita stateen  
    //nyt ei kato onko dataa vai ei, vaan jos on nullia jossain niin "NaN"
    if (this.state.renderCase === "perCapita") {
      return;
    }
    this.setState({
      renderCase: "perCapita",
    });
    for (let index = 1960; index < 2018; index++) { //vähä purkkaa toi index atm
      const population = parseInt(this.state.specificPop[0][index]);
      const emission = parseFloat(this.state.specificCo2[0][index]);
      const capita = (emission / population * 1000).toFixed(2);
      this.setState(previousState => ({
        perCapita: [...previousState.perCapita, capita]
      }));

    }

  }


  render() {


    return (
      <div className="App">
        <header>
          <h1>Co2 Emissions</h1>
          <p>Use the Search option below to compare co2 emissions</p>
        </header>
        <input id="userSearch" type="text" placeholder="Search" name="userSearch" onChange={this.inputChanged} value={this.props.userSearch}></input>
        <button className="button search" onClick={this.search} >Etsi</button>
        <button className="button searchCapita" disabled={!this.state.renderCase} onClick={this.perCapita} >Per Capita</button>
        {this.state.specificCo2.length !== 0
          ? <div className="ChartContainer">
            <LineChart updateList={this.updateList} countryList={this.state.countryList} renderCase={this.state.renderCase} specificCo2={this.state.specificCo2} specificPop={this.state.specificPop} perCapita={this.state.perCapita}></LineChart>
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
