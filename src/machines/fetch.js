import { Machine, assign } from 'xstate';

export const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      results: [],
      message: '',
    },
    states: {
      idle: {
        on: {
          FETCH: 'pending',
        },
      },
      pending: {
        invoke: {
          src: 'fetchData',
          onDone: { target: 'successful', actions: ['setResults'] },
          onError: { target: 'failed', actions: ['setMessage'] },
        },
      },
      failed: {
        on: {
          FETCH: 'pending',
        },
      },
      successful: {
        initial: 'unknown',
        on: {
          FETCH: 'pending',
        },
        states: {
          unknown: {
            always: [
              {
                target: 'withData',
                cond: 'hasData',
              },
              {
                target: 'withoutData',
              },
            ],
          },
          withData: {},
          withoutData: {},
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((_, event) => ({
        results: event.data,
      })),
      setMessage: assign((_, event) => ({
        message: event.data,
      })),
    },
    guards: {
      hasData: (context) => {
        return context.results && context.results.length > 0;
      },
    },
  },
);
