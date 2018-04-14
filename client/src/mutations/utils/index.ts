import { commitMutation } from 'react-relay';
import { MutationConfig } from 'relay-runtime';
import relayEnviroment from '../../relayEnviroment';

/* tslint:disable:no-any */
export type MutationExecuter = (options: Partial<MutationConfig<any>>) => void;

export const runMutation: MutationExecuter = (options: MutationConfig<any>) => {
    commitMutation(relayEnviroment, { ...options });
};