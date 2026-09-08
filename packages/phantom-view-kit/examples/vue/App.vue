<script setup lang="ts">
import { onMounted, ref } from "vue";
import { bindTheme, defineAll, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";

defineAll();

interface Request {
  id: string;
  method: string;
  path: string;
}

const props = defineProps<{ requests: Request[] }>();
const selected = ref<string | null>(null);

onMounted(() => bindTheme());

function onSelect(event: CustomEvent<RowDetail>) {
  selected.value = event.detail.value;
}
</script>

<template>
  <phantom-empty-state
    v-if="props.requests.length === 0"
    icon="icons/bruno.png"
    heading="No requests here"
    description="Open a folder with .bru files, or write your first request."
  >
    <phantom-button variant="prominent" @click="$emit('new-request')">New request</phantom-button>
  </phantom-empty-state>

  <template v-else>
    <phantom-header heading="Requests">
      <phantom-badge>{{ props.requests.length }}</phantom-badge>
    </phantom-header>

    <phantom-scroll style="flex: 1 1 auto">
      <phantom-list @phantom-select="onSelect">
        <phantom-row
          v-for="request in props.requests"
          :key="request.id"
          :value="request.id"
          :selected="request.id === selected"
        >
          <phantom-badge :tone="request.method === 'GET' ? 'accent' : 'success'">{{ request.method }}</phantom-badge>
          <span>{{ request.path }}</span>
        </phantom-row>
      </phantom-list>
    </phantom-scroll>
  </template>
</template>
