// env var. Example to set it, execute in command line: REACT_APP_TRAVEL_BID=http://alberto.localhost.run yarn start
const keyValue = process.env.REACT_APP_HOTELS_COMBINED_KEY_VALUE;
export const HOTELS_COMBINED_KEY_VALUE = keyValue || '';

const url = process.env.REACT_APP_TRAVEL_BID || '';
export const HOTELS_COMBINED_BASE_URL = url + '/hotelscombined-sandbox';
export const HOTELS_COMBINED_BASE_URL_PUBLIC = url + '/hotelscombined';
export const TRAVEL_BID_GRAPHQL_URL = url + '/graphql';
