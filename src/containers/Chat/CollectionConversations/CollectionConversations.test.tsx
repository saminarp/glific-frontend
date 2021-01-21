import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';
import CollectionConversations from './CollectionConversations';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SEARCH_QUERY } from '../../../graphql/queries/Search';

const cache = new InMemoryCache({ addTypename: false });
cache.writeQuery({
  query: SEARCH_QUERY,
  variables: {
    filter: { searchGroup: true },
    messageOpts: { limit: 50 },
    contactOpts: { limit: 50 },
  },
  data: {
    search: [
      {
        group: {
          id: '2',
          label: 'Default Group',
        },
        contact: null,
        messages: [
          {
            id: '1',
            body: 'Hey there whats up?',
            insertedAt: '2020-06-25T13:36:43Z',
            location: null,
            receiver: {
              id: '1',
            },
            sender: {
              id: '2',
            },
            tags: [
              {
                id: '1',
                label: 'important',
                colorCode: '#00d084',
              },
            ],
            type: 'TEXT',
            media: null,
            errors: null,
          },
        ],
      },
    ],
  },
});

const client = new ApolloClient({
  cache: cache,
  assumeImmutableResults: true,
});

afterEach(cleanup);
const groupConversation = (
  <ApolloProvider client={client}>
    <Router>
      <CollectionConversations groupId={2} />
    </Router>
  </ApolloProvider>
);

test('it should render <CollectionConversations /> component correctly', async () => {
  const { container } = render(groupConversation);
  await waitFor(() => {
    expect(container).toBeInTheDocument();
  });
});
