import { Machine, assign } from 'xstate';

export const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      data: null,
      error: null,
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading',
        },
      },
      loading: {
        invoke: {
          src: 'fetchData',
          onDone: { target: 'resolved', actions: ['setdata'] },
          onError: { target: 'rejected', actions: ['seterror'] },
        },
      },
      resolved: {
        initial: 'unknown',
        on: {
          FETCH: 'loading',
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
      rejected: {
        on: {
          FETCH: 'loading',
        },
      },
    },
  },
  {
    actions: {
      setdata: assign((_, event) => ({
        data: event.data,
      })),
      seterror: assign((_, event) => ({
        error: event.data,
      })),
    },
    guards: {
      hasData: (context) => {
        return context?.data?.length > 0;
      },
    },
  },
);
