import axios from "axios";

const getCountries = async() => {
    const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return response.data;
}

const getCountry = async (name) => {
    const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
    return response.data;
}

export default {
    getCountries,
    getCountry
}