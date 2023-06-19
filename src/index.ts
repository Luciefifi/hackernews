import { ApolloServer } from "apollo-server";
import {schema} from './schema';
import { context } from "./context";

export const server = new ApolloServer({
    schema,
    context,
});
const port = 5000;
server.listen({port}).then(({url}) =>{
    console.log(`server ready at ${url}`)
})