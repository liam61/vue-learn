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

export const CompositionComp = defineComponent({
  setup(props, context) {
    const { expose } = context

    // 1. ref
    const count = ref(+props.defaultValue || 0)

    // 2. reactive
    const doubleCount = computed(() => count.value * 2)

    const stop = watchEffect(onCleanup => {
      console.log(`watchEffect: ${count.value}, ${doubleCount.value}`)
    }, {})

    const inc = () => {
      count.value++
    }

    const dec = () => {
      count.value--
    }

    const reset = () => {
      count.value = 0
    }

    // 3. hooks
    onMounted(() => {
      console.log("onMounted")
    })

    onUpdated(() => {
      console.log("onUpdated")
    })

    // 4. expose
    expose({ compositionCount: count })

    // 5. provide & inject
    const globalState = inject("globalState")

    // TODO: slot
    return () => (
      <div className="composition-comp">
        <div className="count">
          <div>count {count.value}</div>
          <div>double count: {doubleCount.value}</div>
          <div>{globalState.foo}</div>
        </div>

        <div className="action">
          <button onClick={inc}>+</button>
          <button onClick={dec}>-</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    )
  },
})
