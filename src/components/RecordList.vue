<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-8 text-gray-100 leading-8">
      <template v-if="state.matches('pending')">
        <pre>Loading...</pre>
      </template>
      <template v-if="state.matches('successful.withData')">
        <ul class="list-disc">
          <li v-for="result of state.context.results" :key="result.id">
            <Record :items="result" />
          </li>
        </ul>
      </template>
      <template v-if="state.matches('successful.withoutData')">
        <pre>No data available.</pre>
      </template>
      <template v-if="state.matches('failed')">
        <pre>{{ state.context.message }}</pre>
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
