import { ExtractPropTypes, PropType } from "vue";
import { ScopedSlot } from "vue/types/vnode";
import { ButtonType } from "element-ui/types/button";
import { ElementUIComponentSize } from "element-ui/types/component";
// import { rowCallbackParams } from "element-ui/types/table";
import { empty } from "../../../shared/_commonProps";
import { VNode } from "vue/types/umd";
import { RowCallbackParams } from "../../../types/table";
import { TableColumn } from "element-ui";

export type TableProps = ExtractPropTypes<typeof tableProps>

export type ElTableColumnProps = ExtractPropTypes<typeof elTableColumnProps>

export type TableColumnChildrenProps = {
  type: 'button' | 'link';
  text: string;
  hue: ButtonType;
  size: ElementUIComponentSize;
  onClick: (scope: RowCallbackParams) => void
}

export type TableColumnOptions = {
  value: any;
  label: string;
}

export type TableColumnProps = {
  emptyText?: string;
  children?: TableColumnChildrenProps[] | ((scope: { row: RowCallbackParams['row'], column: TableColumn, $index: number }) => VNode);
  scopedSlots?: { [key: string]: ScopedSlot | undefined };
} & ElTableColumnProps

export const defaultFormats = {
  date: 'yyyy-MM-dd',
  time: 'HH:mm:ss',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  month: 'yyyy-MM',
  year: 'yyyy'
}

export type TableColumnExtendsType = keyof (typeof defaultFormats)

export const elTableColumnProps = {
  type: {
    type: String as PropType<'selection' | 'index' | 'expand' | TableColumnExtendsType>,
    default: 'default'
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {},
  minWidth: {},
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: false
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: true
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default() {
      return ['ascending', 'descending', null];
    },
    validator(val: any) {
      return val.every((order: string) => ['ascending', 'descending', null].indexOf(order) > -1);
    }
  },

  // 自定义属性
  dateFormat: {
    type: [String, Function],
    default: defaultFormats.date
  },
  timeFormat: {
    type: [String, Function],
    default: defaultFormats.time
  }
}

export const tableProps = {
  data: {
    type: Array,
    default: function() {
      return [];
    }
  },
  width: [String, Number],
  height: [String, Number],

  fit: {
    type: Boolean,
    default: true
  },
  rowKey: [String, Function],
  context: {},
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default() {
      return {
        hasChildren: 'hasChildren',
        children: 'children'
      };
    }
  },
  lazy: Boolean,
  load: Function,

  // global props
  size: {
    type: [String, undefined] as PropType<ElementUIComponentSize | undefined>,
    default: empty
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number | undefined>
  },
  stripe: {
    type: [Boolean, undefined] as PropType<boolean | undefined>,
    default: empty
  },
  border: {
    type: [Boolean, undefined] as PropType<boolean | undefined>,
    default: empty
  },

  // custom props
  columns: {
    type: Array as PropType<Array<TableColumnProps>>,
    default: () => []
  },
}
