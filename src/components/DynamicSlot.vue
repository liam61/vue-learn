<template>
  <div class="dynamic-slot">
    <ul class="dynamic-slot-list" v-if="list">
      <li class="item" v-for="(item, i) in list" :key="i">
        <div>{{ item }} - {{ i }}</div>
      </li>
    </ul>

    <ul class="dynamic-slot-list" v-if="objList">
      <li class="item obj" v-for="(item, i) in objList" :key="item.id">
        <div>{{ item.label }} - {{ i }}</div>
        <div class="item-value">
          <!-- default value template -->
          <slot :name="`item-${item.id}`" :item="item" :value="item.value">
            <span class="item-value-info">default template:</span>
            <span>{{ item.value }}({{ item.id }})</span>
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DynamicSlot",
  props: {
    list: Array,
    objList: Array,
  },
};
</script>

<style>
.dynamic-slot-list {
  width: 80%;
  margin: 0 auto 16px;
  border: 2px solid #999;
  padding: 8px;
}

.item {
  list-style-type: none;
  height: 28px;
  line-height: 28px;
  background-color: burlywood;
  margin: 8px;
}

.item.obj {
  height: 80px;
  line-height: 40px;
}

.item-value {
  color: #eee;
}

.item-value-info {
  margin-right: 8px;
}
</style>
