<template>
  <div class="slot-component">
    <div>
      <h3>Children Part: default slot</h3>
      <slot>
        <div style="color: blue">children component default</div>
      </slot>
    </div>

    <div style="margin-top: 16px">
      <h3 v-if="content">Content Part: slot string</h3>
      <h3 v-else-if="$slots.content">Content Part: slot component</h3>
      <slot name="content">
        <span style="color: blue">{{ content }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlotComponent",
  props: {
    content: String,
  },
};
</script>

<style>
.slot-component {
  padding: 16px;
  margin-bottom: 8px;
  border: 2px solid #999;
  border-radius: 4px;
}
</style>
