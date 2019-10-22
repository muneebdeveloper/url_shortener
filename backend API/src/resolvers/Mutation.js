const {forwardTo} = require('prisma-binding');

const Mutation = {

    createUser:forwardTo('db')

};

module.exports = Mutation;