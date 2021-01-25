<template>
  <main id="main" tabindex="-1">
    <RecordList />
  </main>
</template>

<script>
import RecordList from '@/components/RecordList.vue';

export default {
  name: 'Home',
  components: {
    RecordList,
  },
};
</script>
