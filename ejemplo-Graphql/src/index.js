import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './graphql/schema'
 

const yoga = createYoga({ schema })
 

const server = createServer(yoga)
 

server.listen(3000, () => {
  console.info('Server is running on http://localhost:3000/graphql')
})