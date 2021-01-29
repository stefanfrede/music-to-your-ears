<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-8 text-gray-100 leading-8">
      <template v-if="state.matches('loading')">
        <pre>Loading...</pre>
      </template>
      <template v-if="state.matches('resolved.withData')">
        <ul
          class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
        >
          <li v-for="items of state.context.data" :key="items.id">
            <Record :items="items" />
          </li>
        </ul>
      </template>
      <template v-if="state.matches('resolved.withoutData')">
        <pre>No data available.</pre>
      </template>
      <template v-if="state.matches('failed')">
        <pre>{{ state.context.error }}</pre>
      </template>
    </div>
  </div>
</template>

<script>
import { useMachine } from '@xstate/vue';
import { fetchMachine } from '@/machines/fetch';

import Record from '@/components/Record.vue';

export default {
  name: 'RecordList',
  components: {
    Record,
  },
  setup() {
    const { state, send } = useMachine(fetchMachine, {
      services: {
        fetchData: fetch('/.netlify/functions/load-artists')
          .then((res) => res.json())
          .then(({ 'release-groups': records }) => {
            const maxDate = new Date('1970-05-08').getTime();

            return records.filter((record) => {
              return (
                new Date(record['first-release-date']).getTime() <= maxDate
              );
            });
          }),
      },
    });

    send({ type: 'FETCH' });

    return {
      state,
      send,
    };
  },
};
</script>
