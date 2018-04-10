// @flow
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import { GRAPHQL_SERVER_ADDRESS } from './config';

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
    return fetch(GRAPHQL_SERVER_ADDRESS, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        })
    }).then(response => response.json());
});

const enviroment = new Environment({ network, store });

export default enviroment;
