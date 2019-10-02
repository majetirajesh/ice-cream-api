import Boom from '@hapi/boom';
import axios from 'axios';

const YELP_FUSTION_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';
const YELP_REVIEWS_URL = 'https://api.yelp.com/v3/businesses/';
const API_TOKEN = 'Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx';
const YELP_LIMIT = 5;

/**
 * makes request to yelp to search the businesses based on the term & location
 */
export function searchBusinessDetails(term, location) {
  try {
    return axios.get(`${YELP_FUSTION_SEARCH_URL}?term=${term}&location=${location}&limit=${YELP_LIMIT}`, { headers: { "Authorization": `Bearer ${API_TOKEN}` } }).then((response) => {
      return response.data;
    });
  } catch (e) {
    console.error(e);
    throw Boom.notFound('User not found');
  }
}

/**
 * make requests to yelp to get reviews of provided businesses
 */
export function getAllReviews(businessIds) {
  const requestArray = new Array();

  businessIds.forEach(businessId => {
    requestArray.push(axios.get(`${YELP_REVIEWS_URL}${businessId}/reviews`, { headers: { "Authorization": `Bearer ${API_TOKEN}` } }));
  });
  
return axios.all(requestArray);
}
