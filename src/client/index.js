import range from 'lodash/range';
import omit from 'lodash/omit';
import uuid from 'uuid/v4';

import {
    HOTELS_COMBINED_AFFILIATE_ID,
    HOTELS_COMBINED_KEY_VALUE,
    HOTELS_COMBINED_BASE_URL,
    HOTELS_COMBINED_BASE_URL_PUBLIC,
    TRAVEL_BID_GRAPHQL_URL,
} from '../.env.js';

/** @var {string} - HotelsCombined needs a persistent session id for a user. */
const SESSION_ID = uuid();

const stringifyQueryParams = getParams => (
    Object.keys(getParams)
        .map(key => `${key}=${getParams[key]}`)
        .join('&')
)

export const sendBookingDetails = ({
    hotelId,
    maxPrice,
    checkin,
    checkout,
    rooms,
}) => (
    fetch(`${TRAVEL_BID_GRAPHQL_URL}`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            query: `
                mutation BookRoom($input: BookInput!) {
                    book(input: $input) {
                        id
                    }
                }
            `,
            variables: {
                input: {
                    hotelId,
                    checkinDate: checkin.toISOString(),
                    checkoutDate: checkout.toISOString(),
                    rooms: rooms.split(',').length, // 3,2:1 --> 2 rooms
                    guests: rooms.split(/,|:/) // 3,2:1 --> 6 guests
                        .map(v => parseInt(v, 10))
                        .reduce((memo, current) => memo + current, 0),
                    price: maxPrice,
                },
            },
        }),
    })
        .then(response => response.json())
);

export const fetchPlaceSuggestions = value => {
    const searchTerm = encodeURIComponent(value).replace(/%20/g, '+');
    const getParams = {
        search: searchTerm,
        limit: 5,
        apiKey: HOTELS_COMBINED_KEY_VALUE,
        languageCode: 'ES',
    };

    const URL = `${HOTELS_COMBINED_BASE_URL_PUBLIC}/AutoUniversal.ashx`;

    return fetch(`${URL}?${stringifyQueryParams(getParams)}`)
        .then(response => response.json())
        .then(places => places.map(place => ({
            ...omit(place, ['n', 'k', 's']),
            name: place.n,
            key: place.k,
            isSearchable: place.s,
        })))
        .then(places => places.filter(places => places.isSearchable));
};

export const fetchHotelsThatMatchCriteria = ({
    destination,
    checkin,
    checkout,
    rooms,
    maxPrice,
    starRating,
}) => {
    const getParams = {
        destination, // EntityKey
        checkin: checkin.format('YYYY-MM-DD'), // yyyy-MM-dd
        checkout: checkout.format('YYYY-MM-DD'), // yyyy-MM-dd
        rooms, // RoomRequest[]
        languageCode: 'ES',
        maxPrice,
        starRating: range(starRating, 6).reduce((memo, number) => `${memo}|${number}`),
        radius: 1000, // meters
        apiKey: HOTELS_COMBINED_KEY_VALUE,
        sessionID: SESSION_ID,
    };

    const queryParmsString = stringifyQueryParams(getParams);

    return doSearchHotels(queryParmsString);
};

const doSearchHotels = queryParmsString => (
    fetch(`${HOTELS_COMBINED_BASE_URL}/hotels?${queryParmsString}`, {
        headers: new Headers({
            'Accept': 'application/json',
        })
    })
        .then(response => response.json())
        .then(response => (
            response.isComplete === false
                ? doSearchHotels(queryParmsString)
                : response
        ))
);