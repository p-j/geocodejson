export const defaultResponse = {
  results: [
    {
      address_components: [
        {
          long_name: '1600',
          short_name: '1600',
          types: ['street_number'],
        },
        {
          long_name: 'Amphitheatre Pkwy',
          short_name: 'Amphitheatre Pkwy',
          types: ['route'],
        },
        {
          long_name: 'Mountain View',
          short_name: 'Mountain View',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Santa Clara County',
          short_name: 'Santa Clara County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'California',
          short_name: 'CA',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '94043',
          short_name: '94043',
          types: ['postal_code'],
        },
      ],
      formatted_address: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
      geometry: {
        location: {
          lat: 37.4224764,
          lng: -122.0842499,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 37.4238253802915,
            lng: -122.0829009197085,
          },
          southwest: {
            lat: 37.4211274197085,
            lng: -122.0855988802915,
          },
        },
      },
      place_id: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA',
      plus_code: {
        compound_code: 'CWC8+W5 Mountain View, California, United States',
        global_code: '849VCWC8+W5',
      },
      types: ['street_address'],
    },
  ],
  status: 'OK',
}

export const viewportBiasingResponse = {
  results: [
    {
      address_components: [
        {
          long_name: 'Winnetka',
          short_name: 'Winnetka',
          types: ['neighborhood', 'political'],
        },
        {
          long_name: 'Los Angeles',
          short_name: 'LA',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Los Angeles County',
          short_name: 'Los Angeles County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'California',
          short_name: 'CA',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Winnetka, Los Angeles, CA, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 34.2355209,
            lng: -118.5534191,
          },
          southwest: {
            lat: 34.1854649,
            lng: -118.588536,
          },
        },
        location: {
          lat: 34.2048586,
          lng: -118.5739621,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 34.2355209,
            lng: -118.5534191,
          },
          southwest: {
            lat: 34.1854649,
            lng: -118.588536,
          },
        },
      },
      place_id: 'ChIJ0fd4S_KbwoAR2hRDrsr3HmQ',
      types: ['neighborhood', 'political'],
    },
  ],
  status: 'OK',
}

export const regionBiasingResponse = {
  results: [
    {
      address_components: [
        {
          long_name: 'Toledo',
          short_name: 'Toledo',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Toledo',
          short_name: 'TO',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Castile-La Mancha',
          short_name: 'CM',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Spain',
          short_name: 'ES',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Toledo, Spain',
      geometry: {
        bounds: {
          northeast: {
            lat: 39.88605099999999,
            lng: -3.9192423,
          },
          southwest: {
            lat: 39.8383676,
            lng: -4.0796176,
          },
        },
        location: {
          lat: 39.8628316,
          lng: -4.027323099999999,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 39.88605099999999,
            lng: -3.9192423,
          },
          southwest: {
            lat: 39.8383676,
            lng: -4.0796176,
          },
        },
      },
      place_id: 'ChIJ8f21C60Lag0R_q11auhbf8Y',
      types: ['locality', 'political'],
    },
  ],
  status: 'OK',
}

export const componentFilteringResponse = {
  results: [
    {
      address_components: [
        {
          long_name: 'Santa Cruz de Tenerife',
          short_name: 'Santa Cruz de Tenerife',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Santa Cruz de Tenerife',
          short_name: 'TF',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Canary Islands',
          short_name: 'CN',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Spain',
          short_name: 'ES',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Santa Cruz de Tenerife, Spain',
      geometry: {
        bounds: {
          northeast: {
            lat: 28.487616,
            lng: -16.2356646,
          },
          southwest: {
            lat: 28.4280248,
            lng: -16.3370045,
          },
        },
        location: {
          lat: 28.4636296,
          lng: -16.2518467,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 28.487616,
            lng: -16.2356646,
          },
          southwest: {
            lat: 28.4280248,
            lng: -16.3370045,
          },
        },
      },
      place_id: 'ChIJcUElzOzMQQwRLuV30nMUEUM',
      types: ['locality', 'political'],
    },
  ],
  status: 'OK',
}

export const zeroResultResponse = {
  results: new Array<any>(),
  status: 'ZERO_RESULTS',
}

export const filterOnlyReponse = {
  results: [
    {
      address_components: [
        {
          long_name: 'Annankatu',
          short_name: 'Annankatu',
          types: ['route'],
        },
        {
          long_name: 'Helsinki',
          short_name: 'HKI',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Finland',
          short_name: 'FI',
          types: ['country', 'political'],
        },
        {
          long_name: '00101',
          short_name: '00101',
          types: ['postal_code'],
        },
      ],
      formatted_address: 'Annankatu, 00101 Helsinki, Finland',
      geometry: {
        bounds: {
          northeast: {
            lat: 60.168997,
            lng: 24.9433353,
          },
          southwest: {
            lat: 60.16226160000001,
            lng: 24.9332897,
          },
        },
        location: {
          lat: 60.1657808,
          lng: 24.938451,
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: 60.168997,
            lng: 24.9433353,
          },
          southwest: {
            lat: 60.16226160000001,
            lng: 24.9332897,
          },
        },
      },
      place_id: 'ChIJARW7C8sLkkYRgl4je4-RPUM',
      types: ['route'],
    },
  ],
  status: 'OK',
}

export const partialMatchResponse = {
  results: [
    {
      address_components: [
        {
          long_name: 'High Street',
          short_name: 'High St',
          types: ['route'],
        },
        {
          long_name: 'Hastings',
          short_name: 'Hastings',
          types: ['postal_town'],
        },
        {
          long_name: 'East Sussex',
          short_name: 'East Sussex',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'England',
          short_name: 'England',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United Kingdom',
          short_name: 'GB',
          types: ['country', 'political'],
        },
        {
          long_name: 'TN34 3EY',
          short_name: 'TN34 3EY',
          types: ['postal_code'],
        },
      ],
      formatted_address: 'High St, Hastings TN34 3EY, UK',
      geometry: {
        bounds: {
          northeast: {
            lat: 50.8601041,
            lng: 0.5957329,
          },
          southwest: {
            lat: 50.8559061,
            lng: 0.5906163,
          },
        },
        location: {
          lat: 50.85830319999999,
          lng: 0.5924594,
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: 50.8601041,
            lng: 0.5957329,
          },
          southwest: {
            lat: 50.8559061,
            lng: 0.5906163,
          },
        },
      },
      partial_match: true,
      place_id: 'ChIJ-Ws929sa30cRKgsMNVkPyws',
      types: ['route'],
    },
  ],
  status: 'OK',
}
