
import XHeader from './XHeader/index'
import XBody from './XBody'
import XFooter from './XFooter'
import Sidebar from './Sidebar/index'
import Wrapper from './Wrapper'
import Layout from './Layout'
import Pagination from './Pagination'
import Placeholder from './Placeholder/index'
import ContentBox from './ContentBox'
import {Cellbox, CellItem} from './Cellbox/index'
// import DatePick from './DatePick/index'
import Editor from './Editor/index'
import TimePicker from './TimePicker/index'
import CheckoutGroup from './CheckoutGroup'
import FileUpload from './FileUpload'
import Group from './Group'
import ImgGroupUpload from './ImgGroupUpload'
import ImgUpload from './ImgUpload'
import InputGroup from './InputGroup'
import InputMoney from './InputMoney'
import MultipleCascader from './MultipleCascader'
import Preview from './Preview'
import PreviewBox from './PreviewBox'
import Search from './Search'
import SearchMore from './SearchMore'
import TreeTable from './TreeTable'


const components = {
  XHeader,
  XBody,
  XFooter,
  Sidebar,
  Wrapper,
  Layout,
  Pagination,
  Placeholder,
  Cellbox,
  CellItem,
  ContentBox,
  // DatePick,
  Editor,
  TimePicker,
  CheckoutGroup,
  FileUpload,
  Group,
  ImgGroupUpload,
  ImgUpload,
  InputGroup,
  InputMoney,
  MultipleCascader,
  Preview,
  PreviewBox,
  Search,
  SearchMore,
  TreeTable
}

const install = function (Vue) {
  for (let name in components) {
    Vue.component(name, components[name])
  }
}

export {
  install,
  XHeader,
  XBody,
  XFooter,
  Sidebar,
  Wrapper,
  Layout,
  Pagination,
  Placeholder,
  Cellbox,
  CellItem,
  ContentBox,
  // DatePick,
  Editor,
  TimePicker,
  CheckoutGroup,
  FileUpload,
  Group,
  ImgGroupUpload,
  ImgUpload,
  InputGroup,
  InputMoney,
  MultipleCascader,
  Preview,
  PreviewBox,
  Search,
  SearchMore,
  TreeTable
}
