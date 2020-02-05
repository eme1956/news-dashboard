module.exports = (req, res, next) => {
    if (
        req.header('Authorization') &&
        req.header('Authorization') === process.env.API_KEY
    ) {
        next();
    } else {
        res.write(401, {
            'WWW-Authenticate': 'Provide API KEY'
        });
        res.end('');
    }
};
