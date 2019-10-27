const {forwardTo} = require('prisma-binding');
const shortid = require('short-id');


const Mutation = {

    async createURL(parent,args,ctx,info){

        // Convering the longURL into lower case
        args.data.longURL = args.data.longURL.toLowerCase();

        // Adding http at the beginning if the user forgots to enter
        if(!args.data.longURL.startsWith("http")){
                if(args.data.longURL.startsWith("ftp")){
                    throw new Error("FTP url is not allowed");
                }
                args.data.longURL = "http://" + args.data.longURL;
        }

        // Checking if the url is valid
        try{
            const myUrl = new URL(args.data.longURL);
            if(!myUrl.host.endsWith(".com")){
                throw new Error("Invlaid URL Entered. Only alphabet url is valid");
            }
        }catch(err){
            throw new Error("Invalid URL");
        }
        
        
        // Querying if the URL already exists

        let res_URL = await ctx.db.query.uRL({
            where:{
                longURL:args.data.longURL
            }
        },
         info);

         if(res_URL){
             return res_URL;
         }

        //  Creating the short url code
        const shortURLcode = shortid.generate();

        // Checking if the short url is already in use
        res_URL = await ctx.db.query.uRL({
            where:{
                shortURLcode
            }
        },info);

        if(res_URL){
            return res_URL;
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