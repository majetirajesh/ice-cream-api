import HttpStatus from 'http-status-codes';
import * as searchService from '../services/searchService';
import BusinessDetails from '../models/businessDetails';
import Review from '../models/review';

/**
 * returns top 5 ice cream shops
 */
export async function search(req, res, next) {
  const responseData = await searchService.searchBusinessDetails("ice cream", "alpharetta,georgia,usa");
  const reviewsData = await searchService.getAllReviews(getAllBusinessIds(responseData));

  res.status(HttpStatus.OK).json({ businesses: convert(responseData, reviewsData) });
}

/**
 * converts the yelp responses to this api response 
 */
function convert(yelpResponse, reviewsResponse) {
  const response = new Array();
  let index = 0;

  yelpResponse.businesses.forEach(business => {
    const reviews = new Array();

    reviewsResponse[index++].data.reviews.forEach(review => {
      reviews.push(new Review(review.user.name, review.text));
    })
    const businessDetailsObj = new BusinessDetails(business.name, business.location.display_address, reviews);

    response.push(businessDetailsObj);
  });
  
return response;
}

/**
 * to get all business ids from yelp business search response
 */
function getAllBusinessIds(yelpResponse) {
  const response = new Array();

  yelpResponse.businesses.forEach(business => {
    response.push(business.id);
  });
  
return response;
}
