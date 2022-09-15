import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"
import { GlobalFormProps } from "../../../components/config-provider/src/configProviderProps"
import { generateEmits } from "../../../utils/generateEmits"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"

const propNames = ['model', 'rules', 'labelSuffix', 'statusIcon', 'showMessage', 'disabled', 'validateOnRuleChange', 'hideRequiredAsterisk']
const globalPropNames = ['labelPosition', 'labelWidth', 'inline', 'inlineMessage', 'size']
const emitNames = ['validate']

export function useForm(
  props: FormProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<FormProps, GlobalFormProps>
) {
  const { handleProps } = options || {}
  const { elForm, validate, validateField, clearValidate } = useElForm()
  
  const createProps = useComponentProps(props, 'form', { propNames, globalPropNames, handleProps })
  const on = generateEmits(context.emit, emitNames)
  const setRef = function(el: ElForm) {
    elForm.value = el
  } as unknown as string

  console.log('createProps')
  console.log(createProps())

  return {
    expose: {
      validate,
      validateField,
      clearValidate,
      get elForm() { return elForm.value }
    },
    render: () => h(Form, {
      ref: setRef,
      props: createProps(),
      on,
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
}