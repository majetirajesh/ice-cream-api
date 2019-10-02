import Boom from '@hapi/boom';
import axios from 'axios';

const YELP_FUSTION_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';
const API_TOKEN = 'Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx';
const YELP_LIMIT = 5;

export function searchBusinessDetails(term, location) {
  try{
    return axios.get(`${YELP_FUSTION_SEARCH_URL}?term=${term}&location=${location}&limit=${YELP_LIMIT}`,{ headers: {"Authorization" : `Bearer ${API_TOKEN}`} }) .then((response) => {
      return response.data;
    });
  } catch (e) {
    console.error(e);
    throw Boom.notFound('User not found');
  }
}
