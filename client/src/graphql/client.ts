// client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Your LeetCode session token and CSRF token
const sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTE2MjIwMTAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4MzhjMTNlMDU2NzJjZGU2NWJlMTMxN2ZlNDE3NjZhN2QxZjQ1NzM5OGU3NWMyZDdkMmM0ZmZiZmU2NjFlZGU4IiwiaWQiOjExNjIyMDEwLCJlbWFpbCI6InM0MDAzOTA5QHN0dWRlbnQucm1pdC5lZHUuYXUiLCJ1c2VybmFtZSI6IlBhbm55YVRyZWhhbiIsInVzZXJfc2x1ZyI6IlBhbm55YVRyZWhhbiIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNvbS91c2Vycy9hdmF0YXJzL2F2YXRhcl8xNzAxNjk1Njc4LnBuZyIsInJlZnJlc2hlZF9hdCI6MTcyMDc4NTk5NSwiaXAiOiIyMDAxOjQ0Nzk6NDAwMzozNjAwOmE3Yjo0N2JmOjM5Y2U6ZDdkYiIsImlkZW50aXR5IjoiMTIwZjA2N2MxNmIzMmJlNjU5ZTAxODBiMzFlNjI4NDEiLCJzZXNzaW9uX2lkIjo2NTY3NTg2MCwiZGV2aWNlX3dpdGhfaXAiOlsiNzI4MzM5ZWFhYTIwZmI2NmFiNWFjMmMzMjc3ZjQ3NTEiLCIyMDAxOjQ0Nzk6NDAwMzozNjAwOmE3Yjo0N2JmOjM5Y2U6ZDdkYiJdfQ.XAi6OacTfHqHwbgxSB8YOiSwjKkQP06k4Zl-X1eSvUQ'; // your session token here
const csrfToken = 'JSya8KteoqbAzM2I9fz6yaRVGehgEDLQ0si13MwAYgv7Kdm5ypwJzd3AyWqudl06'; // your CSRF token here

// Create an HttpLink
const httpLink = new HttpLink({
  uri: '/api', // This will be proxied to the actual GraphQL endpoint
});

// Use setContext to add the session token and CSRF token to headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'Origin': 'https://leetcode.com',
      'Cookie': `LEETCODE_SESSION=${sessionToken}`,
      'X-Csrftoken': csrfToken,
      'Authorization': `Bearer ${sessionToken}`
    }
  };
});

// Combine authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;