const hasApikey = (req, res, next) => {
    const apiKey = req.query.api_key;
    const ourApiKey = "your_apikey"

    if(!apiKey) {
        return res.status(401).json({message: "No apikey present"})
    }

    if(apiKey !== ourApiKey) {
        return res.status(401).json({message: "Api key not correct"})
    }

    next();
}

exports.hasApikey = hasApikey