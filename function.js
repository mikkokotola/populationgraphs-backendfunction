const request = require('request-promise-native');
const { pathToRegexp, match, parse, compile } = require('path-to-regexp');

exports.getWorldBankData = async (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        var pathVars = extractPathParams(req);
        if (pathVars == null || !pathVars[1] || !pathVars[2]) {
            console.log('Invalid request path');
            res.status(422).json({status: 422, message: 'Invalid request path: valid address example /country/FIN/indicator/SP.POP.TOTL'}).send();
            return;
        }
        
        var countryCode = pathVars[1];
        var indicatorCode = pathVars[2];

        if (!validateCountryCode(countryCode)) {
            console.log('Invalid countryCode: ' + countryCode);
            res.status(422).json({status: 422, message: 'Country code malformed. Valid example: FIN'}).send();
            return;
        }
    
        if (!validateIndicator(indicatorCode)) {
            console.log('Invalid indicatorCode: ' + indicatorCode);
            res.status(422).json({status: 422, message: 'Indicator code malformed. Valid example: SP.POP.TOTL'}).send();
            return;
        }
        
        var data;
        try {
            data = await fetchPopulationData(countryCode, indicatorCode);
        } catch(error) {
            console.log(error);
        }
        res.json(data);
    }
};

function extractPathParams (req) {
    var keys = [];
    var re = pathToRegexp('/country/:countryCode/indicator/:indicatorCode', keys, {strict: true});
    var pathVars = re.exec(req.path);
    if (pathVars) {
        console.log(JSON.stringify(pathVars));
        return pathVars;
    } else {
        return null;
    }
}

function validateCountryCode(input) {
    if(input.match(/^[a-zA-Z]+$/)){
        return true;
    }
    else{
        return false;
    }
}

function validateIndicator(input) {
    if(input.match(/^[a-zA-Z]+.[a-zA-Z]+.[a-zA-Z]+$/)){
        return true;
    }
    else{
        return false;
    }
}

async function fetchPopulationData(countryCode, indicatorCode) {
    console.log('Within fetchPopulationData')
    var requestSettings = {
      method: 'GET',
      url: 'https://api.worldbank.org/v2/country/' + countryCode + '/indicator/' + indicatorCode + '?format=json',
      encoding: 'utf8'    
    };
    var populationdata = await request(requestSettings, function (error, response, body) {
      console.log('Got response from API. Status code: ' + response.statusCode);
      
      if (!error && response.statusCode == 200) {
        return body;
      }
    });
    return (populationdata);
}