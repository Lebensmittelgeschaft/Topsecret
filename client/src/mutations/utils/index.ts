import { commitMutation } from 'react-relay';
import { MutationConfig } from 'relay-runtime';
import relayEnviroment from '../../relayEnviroment';

/* tslint:disable:no-any */
export type CurryMutationExecuter = (addedOptions: Partial<MutationConfig<any>>) => void;
export type MutationExecuter = (options: Partial<MutationConfig<any>>) => CurryMutationExecuter;

/**
 * Helper function for currying mutation options in other functions
 * 
 * @param options - options for the mutation as declared in MutationConfig
 * @returns CurryMutationExecuter function for currying other options for inline function in components 
 */
export const runMutation: MutationExecuter = (options: MutationConfig<any>) => {
    return function(addedOptions: Partial<MutationConfig<any>>) {
        commitMutation(relayEnviroment, { ...options, ...addedOptions });
    };
};