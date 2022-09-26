import { defineComponent, ref } from "vue"
import "./index.css"

export const JSXSlot = defineComponent({
  slots: {},
  // expose: ["message"],
  setup(props, context) {
    const { expose, slots } = context
    // const slots = useSlots()

    const message = ref("Hello from JSXSlot")

    expose({
      message,
      callback() {
        return "Callback from JSXSlot"
      },
    })

    return () => (
      <div class="jsx-slot">
        <div>
          <h3>Children Part: default slot</h3>
          {slots.default ? (
            slots.default()
          ) : (
            <div style="color: blue">children component default</div>
          )}
        </div>

        {slots.content && (
          <div style="margin-top: 16px">
            <h3>Content Part: slot component</h3>
            {slots.content()}
          </div>
        )}
      </div>
    )
  },
})
