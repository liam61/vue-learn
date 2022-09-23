<template>
  <img alt="Vue logo" src="./assets/vue.svg" />

  <h1>Demo1</h1>

  <SlotComponent content="content string by user" />

  <SlotComponent>
    <!-- <template> -->
    <div style="color: red">children component by user</div>
    <!-- </template> -->

    <template #content>
      <span style="color: red">content component by user</span>
    </template>
  </SlotComponent>

  <h1>Demo2</h1>

  <DynamicSlot :list="list" />

  <DynamicSlot :objList="objList">
    <template #item-22="{ item, value }">
      <span style="margin-right: 8px">custom: {{ item.id }}</span>
      <span style="color: red">custom: {{ value }}</span>
    </template>

    <template #[`item-${dynamicId}`]="{ item }">
      <span style="color: blue">custom: {{ item.value }}</span>
    </template>
  </DynamicSlot>

  <CompositionComp />
</template>

<script>
import { provide } from 'vue';
import HelloWorldVue from "./components/HelloWorld.vue";
import SlotComponent from "./components/SlotComponent";
import DynamicSlot from "./components/DynamicSlot";
import { CompositionComp } from "./components/CompositionAPI";

export default {
  name: "App",
  components: {
    HelloWorld: HelloWorldVue,
    SlotComponent,
    DynamicSlot,
    CompositionComp,
  },
  data() {
    return {
      list: ["aa", "bb", "cc", "dd"],
      objList: [
        { id: 11, label: "aa", value: "one" },
        { id: 22, label: "bb", value: "two" },
        { id: 33, label: "cc", value: "three" },
        { id: 44, label: "dd", value: "four" },
      ],
      dynamicId: "44",
    };
  },
  method() {
    return {
      getDynamicId() {
        return "item-44";
      },
    };
  },
  setup() {
    provide('globalState', { foo: 'foo', bar: true })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
