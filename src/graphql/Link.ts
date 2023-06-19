import {  extendType, nonNull,  objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
    name: "Link",
    definition(t){
        t.nonNull.int("id");
        t.nonNull.string("description");
        t.nonNull.string("url")
        t.field("postedBy", {   // 1
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        });
    }
});

let links: NexusGenObjects["Link"][]=[
    {
        id: 1,
        url: "www.howtograpql.com",
        description: "full stack tutorial for GRAPHQL"
    },
    {
        id: 2,
        url: "graphql.ord",
        description:"GRAPHQL official website"
    },
];

export const LinkQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   // 3
            type: "Link",
            resolve(parent, args, context, info) {    // 4
                return context.prisma.link.findMany();
            },
        });
    },
});

export const LinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Link",  
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const newLink = context.prisma.link.create({
                    data:{
                        description: args.description,
                        url: args.url
                    }
                })
                
                return newLink;
            },
        });
    },
});