<template>
  <svg
    title="logo"
    class="w-16 h-16 lg:w-20 lg:h-20 text-gray-900"
    :class="textColor"
    aria-labelledby="fab5-record"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <title id="fab5-record">Record</title>
    <path
      d="M256 152a104 104 0 1 0 104 104 104 104 0 0 0-104-104zm0 128a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-272C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a128 128 0 1 1 128-128 128 128 0 0 1-128 128z"
      fill="currentColor"
    />
  </svg>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'RecordArt',
  props: {
    status: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
  },
  setup(props) {
    const textColor = ref(
      props.status === 'error' ? 'text-red-600' : 'text-gray-900',
    );

    return { textColor };
  },
};
</script>
