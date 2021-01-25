<template>
  <div class="bg-pink-500 text-gray-900">
    <template v-if="state.matches('pending')">
      <pre>Loading...</pre>
    </template>
    <template v-if="state.matches('successful.withData')">
      <figure class="w-12 h-auto">
        <img :src="state.context.results" alt="" />
      </figure>
    </template>
    <template v-if="state.matches('successful.withoutData')">
      <pre>No data available.</pre>
    </template>
    <template v-if="state.matches('failed')">
      <pre>{{ state.context.message }}</pre>
    </template>
    {{ title }}
    {{ releaseDate }}
  </div>
</template>

<script>
import { ref } from 'vue';

import { useMachine } from '@xstate/vue';
import { fetchMachine } from '@/machines/fetch';

export default {
  name: 'Record',
  props: {
    items: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const releaseDate = ref(props.items['first-release-date']);
    const title = ref(props.items.title);

    const { state, send } = useMachine(fetchMachine, {
      services: {
        fetchData: fetch(
          `/.netlify/functions/load-coverart/?id=${props.items.id}`,
        )
          .then((res) => res.json())
          .then((images) => {
            return images[0]['image'];
          }),
      },
    });

    send({ type: 'FETCH' });

    return {
      releaseDate,
      state,
      send,
      title,
    };
  },
};
</script>
