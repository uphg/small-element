import { VNodeData } from "vue";
import { ConfigPropertyName } from "../shared/configPropertyMap";
import { useGlobalProps } from "./useGlobalProps"
import { withDefaultProps } from "../utils/withDefaultProps";
import { ObjectLike } from "../types/object-like";
import pick from "../utils/pick";
import { ElInputNumber, ElSwitch, ElUpload, ElCalendar } from "../types/element-components";
import { ElInput } from "element-ui/types/input";
import { ElSelect } from "element-ui/types/select";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { ElRadioGroup } from "element-ui/types/radio-group";
import { ElSlider } from "element-ui/types/slider";
import { ElTimeSelect } from "element-ui/types/time-select";
import { ElTimePicker } from "element-ui/types/time-picker";
import { ElDatePicker } from "element-ui/types/date-picker";

type ComponentPropsOptions<Props, GlobalProps> = {
  propNames: string[];
  globalPropNames: string[];
  handleProps?: HandleProps<Partial<Props>, GlobalProps>
}

export type UseComponentParamsOptions<Props, GlobalProps> = {
  handleProps?: HandleProps<Props, GlobalProps>,
  setRef?: SetRef,
  status?: 0 | 1,
  on?: VNodeData['on']
}

export interface HandleProps<Props, GlobalProps> {
  (props: Props, globalProps: GlobalProps | undefined, _options: { propNames: string[], globalPropNames: string[]}): () => Props
}

export interface SetRef {
  (el: ElRadioGroup | ElCheckboxGroup | ElInput | ElInputNumber | ElSelect | ElCalendar | ElSwitch | ElSlider | ElTimeSelect | ElTimePicker | ElDatePicker | ElUpload): void
}

export function useComponentProps<Props extends ObjectLike, GlobalProps extends ObjectLike>(
  props: Props,
  configPropertyName: ConfigPropertyName,
  options: ComponentPropsOptions<Props, GlobalProps>
) {
  const { propNames, globalPropNames, handleProps } = options || {}
  const globalProps = useGlobalProps<GlobalProps>(configPropertyName)

  const createProps = typeof handleProps === 'function'
    ? handleProps(props, globalProps, { propNames, globalPropNames })
    : () => ({ ...pick(props, propNames), ...withDefaultProps(props, globalProps, globalPropNames) }) as (Props | GlobalProps)
  return { createProps, globalProps }
}