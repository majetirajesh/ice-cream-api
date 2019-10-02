import HttpStatus from 'http-status-codes';
import * as searchService from '../services/searchService';
import BusinessDetails from '../models/businessDetails';

export async function search(req, res, next) {
  const responseData = await searchService.searchBusinessDetails("ice cream", "alpharetta,georgia,usa");

  console.log("dataaaaaaa" + responseData);
    res.status(HttpStatus.OK).json({ data: convert(responseData) });
}

function convert(yelpResponse){
  let response = new Array();
  yelpResponse.businesses.forEach(business => {
     let businessDetailsObj = new BusinessDetails(business.name, business.location.city, business.review_count );
     response.push(businessDetailsObj);
  });
  return response;
}
