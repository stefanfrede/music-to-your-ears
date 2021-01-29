<template>
  <div class="col-span-1 bg-gray-100 text-gray-900 rounded-lg shadow p-6">
    <figure class="flex items-center space-x-4 lg:space-x-6">
      <template v-if="state.matches('loading')">
        <RecordArt class="animate-pulse" />
      </template>
      <template v-if="state.matches('resolved.withData')">
        <img
          :src="state.context.data"
          class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
          alt=""
        />
      </template>
      <template v-if="state.matches('resolved.withoutData')">
        <RecordArt />
      </template>
      <template v-if="state.matches('failed')">
        <RecordArt :status="error" />
      </template>
      <figcaption class="font-medium text-lg leading-6 space-y-1">
        <h3>{{ title }}</h3>
        <p class="text-gray-500">{{ releaseDate }}</p>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import { ref } from 'vue';

import { useMachine } from '@xstate/vue';
import { fetchMachine } from '@/machines/fetch';

import RecordArt from '@/components/RecordArt.vue';

export default {
  name: 'Record',
  components: {
    RecordArt,
  },
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
