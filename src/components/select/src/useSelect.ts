import { ElSelect } from "element-ui/types/select"
import { h, ref, SetupContext } from "vue"
import { Select } from "element-ui"
import { SelectProps } from "./selectProps"
import { renderSelectOptions } from '../../../utils/renderSelectOptions'
import { generateProps } from "../../../utils/generateProps"
import { generateEmits } from "../../../utils/generateEmits"

const propNames = ['name', 'id', 'value', 'autocomplete', 'automaticDropdown', 'size', 'disabled', 'clearable', 'filterable', 'allowCreate', 'loading', 'popperClass', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'multiple', 'multipleLimit', 'placeholder', 'defaultFirstOption', 'reserveKeyword', 'valueKey', 'collapseTags', 'popperAppendToBody' ]
const emitNames = ['input', 'change', 'visibleChange', 'blur', 'clear']

export function useSelect(props: SelectProps, context: SetupContext<{}>) {
  const elSelect = ref<ElSelect | null>(null)
  const on = generateEmits(context.emit, emitNames)
  const setRef = function(el: ElSelect) {
    elSelect.value = el
  } as unknown as string

  return {
    expose: {
      focus() {
        elSelect.value?.focus()
      },
      blur() {
        elSelect.value?.blur()
      },
      get elSelect() {
        return elSelect.value
      }
    },
    render: () => h(Select, {
      ref: setRef,
      props: generateProps(props, propNames),
      on
    }, [
      context.slots?.prefix && h('slot', { slot: 'prefix' }, context.slots.prefix()),
      context.slots?.empty && h('slot', { slot: 'empty' }, context.slots.empty()),
      ...renderSelectOptions(props, context)!,
    ])
  }
}