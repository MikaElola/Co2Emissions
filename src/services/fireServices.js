import axios from 'axios'
import database from '../fire'

const getAllemissions = async () => {
    const url = database.options.databaseURL + '/co2/.json';
    const response = await axios.get(url)
  let allEmissions = []
  Object.values(response.data).forEach(elem => {
    allEmissions.push(elem)
  })
  console.log(allEmissions);
  return allEmissions
}

const getPopulation = async () => {
    const url = database.options.databaseURL + '/pop/.json';
    const response = await axios.get(url);
    let population = [];
    Object.values(response.data).forEach(elem => {
        population.push(elem)
    })
    return population;
}

export default { getAllemissions, getPopulation }
