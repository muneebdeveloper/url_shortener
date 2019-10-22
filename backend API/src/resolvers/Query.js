const {forwardTo} = require('prisma-binding');

const Query = {
    user:forwardTo('db')
};

module.exports = Query;