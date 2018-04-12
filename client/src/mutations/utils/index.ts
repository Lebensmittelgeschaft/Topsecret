import { commitMutation } from 'react-relay';
import { MutationConfig } from 'relay-runtime';
import relayEnviroment from '../../relayEnviroment';

export const runMutation = (
    mutation: MutationConfig<any>['mutation'],
    successFunc: MutationConfig<any>['onCompleted'],
    variables?: MutationConfig<any>['variables'],
    failedFunc?: MutationConfig<any>['onError'],
    optimisticResult?: MutationConfig<any>['optimisticResponse'],
    optimisticUpdater?: MutationConfig<any>['optimisticUpdater'],
    localUpdater?: MutationConfig<any>['updater']
) => {
    commitMutation(
        relayEnviroment,
        {
            mutation,
            variables: variables || {},
            onCompleted: successFunc,
            onError: failedFunc,
            optimisticResponse: optimisticResult,
            optimisticUpdater,
            updater: localUpdater
        }
    );
};

/* tslint:disable:no-any */
export const bindParams = (fn: Function , ...boundArgs: any[]) => {
    return function(...args: any[]) {
        return fn(...args, ...boundArgs);
    }
}