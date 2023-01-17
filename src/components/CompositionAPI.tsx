import {
  defineComponent,
  ref,
  onMounted,
  onUpdated,
  computed,
  watchEffect,
  inject,
} from "vue"
import "./index.css"
import { JSXSlot } from "./JSXSlot"

export const CompositionComp = defineComponent({
  components: {
    JSXSlot,
  },
  props: {
    defaultValue: Number,
    // decrease: Function,
  },
  // 定义接收的函数 props
  // emits: ["increase", "decrease"],
  emits: {
    // 校验
    "count-increase": (value: number) => true,
    "count-decrease": null,
  },
  setup(props, context) {
    const { expose, emit, attrs } = context

    // 1. ref
    const count = ref(props.defaultValue || 0)

    // 2. reactive
    const doubleCount = computed(() => count.value * 2)

    const stop = watchEffect((onCleanup) => {
      console.log(`watchEffect: ${count.value}, ${doubleCount.value}`)
    }, {})

    const inc = () => {
      count.value++
      emit("count-increase", count.value)
    }

    const dec = () => {
      count.value--
      emit("count-decrease", count.value)
    }

    const reset = () => {
      count.value = 0
    }

    // 3. expose & ref
    expose({ count })
    const jsxSlot = ref<typeof JSXSlot | null>(null)

    // 4. hooks
    onMounted(() => {
      console.log("onMounted,", jsxSlot.value?.callback())
    })

    onUpdated(() => {
      console.log("onUpdated")
    })

    // 5. provide & inject
    const globalState: any = inject("globalState")

    return () => (
      <>
        <div class="composition-comp">
          <div class="count">
            <div>count {count.value}</div>
            <div>double count: {doubleCount.value}</div>
            <div>{globalState.foo}</div>
          </div>

          <div class="action">
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>

        <JSXSlot ref={jsxSlot}>
          <div style="color: red">children component by user</div>
        </JSXSlot>
      </>
    )
  },
})
