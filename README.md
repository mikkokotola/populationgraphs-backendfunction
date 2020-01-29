# Population graphs - backend cloud function
Backend cloud function that fetches and serves World Bank population data in JSON format.

## Deployed version
One instance of backend is deployed as a cloud function at https://europe-west1-world-bank-data.cloudfunctions.net/world-bank-fetcher/.

## Frontend
Source for frontend is at https://github.com/mikkokotola/populationgraphs.

One instance of frontend is deployed at https://world-bank-data.appspot.com.

## REST API endpoints
The calls to the REST API are of the format https://europe-west1-world-bank-data.cloudfunctions.net/world-bank-fetcher/country/:countryCode/indicator/:indicatorCode.

Example call to fetch population data of Finland: https://europe-west1-world-bank-data.cloudfunctions.net/world-bank-fetcher/country/FIN/indicator/SP.POP.TOTL.

## Country codes
The country codes are [ISO3 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3).

## Indicator codes
Indicator codes are [World bank indicator codes](https://datahelpdesk.worldbank.org/knowledgebase/articles/201175-how-does-the-world-bank-code-its-indicators). Currently the only supported indicator is the total population time series of a country: SP.POP.TOTL.

## How to install to Google Cloud
- Register a Google cloud platform account - see https://developers.google.com/maps/gmp-get-started
- Create a cloud function in Google cloud and select Nodejs 8 as the language
- Insert the contents of function.js as the code, insert contents of package.json

## How it works
The backend function fetches data from the World bank API (see link below under "Data") and serves it as JSON. For local frontend development, this kind of proxy backend is necessary due to World Bank CORS policy.

## Data
Data from the World Bank (CC BY 4.0). See https://datahelpdesk.worldbank.org/knowledgebase/topics/125589.
