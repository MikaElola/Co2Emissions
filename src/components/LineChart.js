import React, { Component } from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLineChart: "",
      capita: "",
    }
  };

  /* addData = () => {
     data.datasets.push()
   }*/

  componentDidMount = async () => {
    var co2Data = await this.props.updateList();
    //tehä myDatasta array johon heitellä noi propsina tulevat objektit ja sitte lukee myDataa nii saadaa monta käppyrää??
    let years = Object.keys(this.props.specificCo2[0]);
    /* nyt tulee appin kautta
    const flattenedArray = [].concat(...Object.values(this.props.countryList));  
    let co2Data = Object.values(flattenedArray);
    */
    var filtyears = years.filter((item) => item !== "Country" && item !== "FIELD3" && item !== "FIELD4");

    if (this.props.renderCase === "perCapita") {
      let capitaData = this.props.perCapita.map((a) => a);
      var data = {
        labels: filtyears,
        datasets: [{
          "label": this.props.specificCo2[0].Country,
          "data": capitaData,
          "fill": false,
          "borderColor": "rgba(67, 87, 173, 1.0)",
          "lineTension": 0.3,
        }],
      }
    } else {
      var data = {
        labels: filtyears,
        datasets: [{

        }],
      }
      // uniikki väri... let color = Math.floor(Math.random() * 255);
      let colorArray = [
        ["#4357AD", false], ["#48A9A6", false], ["#100034", false], ["#D4B483", false], ["#D4B483", false],
        ["#D4510C", false], ["#70EBA6", false], ["#435761", false], ["#7058A6", false]
      ]
      co2Data.forEach(function (objektit, i) {
        let color;
        while (true) {
          var test = colorArray[parseInt(Math.random() * 6)];
          if (!test[1]) {
            color = test[0];
            colorArray[colorArray.indexOf(test)][1] = true;
            break;
          }
        }
        data.datasets.push({
          "label": co2Data[i].Country,
          "data": Object.values(co2Data[i]),
          "fill": false,
          "borderColor": color,
          "lineTension": 0.3,
        })
      })
      data.datasets.shift()
    }
    let options = {
      legend: {
        labels: {
          fontColor: 'rgba(16, 0, 52, 1.0)',
          fontSize: 15
        }
      },
      scales: {
        xAxes: [{
          ticks: {

            callback: function (value, index, values) {
              if (value % 2 == 0) {
                return value
              } else {
                return null
              }
            }
          }
        }]
      },
      title: {
        display: false,
        text: "Co2 Emissions",
        fontSize: 50,
        fontColor: 'rgba(16, 0, 52, 1.0)',
      },
    }
    var ctx = document.getElementById("myChart");
    this.setState({
      myLineChart: new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.specificCo2 !== this.props.specificCo2 || prevProps.perCapita !== this.props.perCapita) {
      console.log("DidUpdate called...")
      this.state.myLineChart.destroy();
      this.componentDidMount();
    }
  }

  render() {

    return (
      <div className="LineChart">
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default LineChart;
