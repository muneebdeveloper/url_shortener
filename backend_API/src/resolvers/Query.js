const {forwardTo} = require('prisma-binding');

const Query = {
    uRL:forwardTo('db')
};

module.exports = Query;