const {forwardTo} = require('prisma-binding');
const validUrl = require('valid-url');
const shortid = require('short-id');

const Mutation = {

    async createURL(parent,args,ctx,info){

        if(!args.data.longURL.startsWith("http")){
            if(!args.data.longURL.startsWith("www")){
                args.data.longURL = "http://www." + args.data.longURL; 
            }else{
                args.data.longURL = "http://" + args.data.longURL;
            }
        }

        // Check if the url is valid
        if(!validUrl.isUri(args.data.longURL)){
            throw new Error("Entered URL is invalid");
        }

        // Querying if the URL already exists

        let URL = await ctx.db.query.uRL({
            where:{
                longURL:args.data.longURL
            }
        },
         info);

         if(URL){
             return URL;
         }

        //  Creating the short url code
        const shortURLcode = shortid.generate();

        // Checking if the short url is already in use
        URL = await ctx.db.query.uRL({
            where:{
                shortURLcode
            }
        },info);

        if(URL){
            return URL;
        }

        return ctx.db.mutation.createURL({
            data:{
                longURL:args.data.longURL,
                shortURLcode
            }
        },info);

    }

};

module.exports = Mutation;