import { Machine, assign } from 'xstate';

export const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      data: undefined,
      error: undefined,
    },
    states: {
      idle: {
        on: {
          FETCH: 'pending',
        },
      },
      pending: {
        id: 'fetchData',
        invoke: {
          src: 'fetchData',
          onDone: { target: 'resolved', actions: ['setdata'] },
          onError: { target: 'rejected', actions: ['seterror'] },
        },
      },
      resolved: {
        initial: 'unknown',
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
        on: {
          FETCH: 'pending',
        },
      },
      rejected: {
        on: {
          FETCH: 'pending',
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
      hasData(context) {
        return context.data && context.data.length > 0;
      },
    },
  },
);
