import {
    version,
    locale,
    install,
    CollapseTransition,
    Loading,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    MessageBox,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Notification,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Message,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    Scrollbar,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer
  } from 'element-ui'
  
  Breadcrumb.props.separator.default = '>'
  
  MessageBox._confirm = MessageBox.confirm
  MessageBox.confirm = (content, title, props) => {
    return MessageBox._confirm(content, title, {
      customClass: 'dialog',
      ...props
    })
  }
  
//   Upload.props.action.required = false
//   Upload.props.action.default = '/api/upload/image'
  
  Carousel.beforeMount = function() {
    // 修正轮播图片在表单BUTTON提交的行为
    this.$nextTick(function() {
      Array.prototype.slice.call(this.$el.querySelectorAll('button')).forEach(function(item) {
        item.type = 'button'
      })
    })
  }
  
  Carousel.props.trigger.default = 'click'
  
  Carousel.props.slides = {
    type: Number,
    default: 1
  }
  
  Form.props.labelWidth.default = '142px'
  
  Pagination.props.layout.default = 'prev, pager, next, sizes, jumper, total'
  Pagination.props.pageSizes.default = () => {
    return [15, 20, 30, 40, 50]
  }
  /*
   *重写InputNumber默认行为
   */
  InputNumber.props.value.default = null
  InputNumber.props.validateEvent = true
  InputNumber.props.controls = false // 默认不是控制按钮
  // InputNumber.props.debounce.default = 380
  InputNumber.props.max.default = 100000
  InputNumber.props.bit = {
    type: Number
  }
  InputNumber.created = () => {}
  InputNumber.beforeMount = function() {
    this.$nextTick(() => {
      var self = this
      this.$el.addEventListener(
        'keydown',
        function(e) {
          e.keyCode === 13 && self.handleBlur(e)
        },
        false
      )
      this.$el.addEventListener(
        'focusin',
        function(e) {
          e.target.select() // 得到焦点选中值
        },
        false
      )
      this.$refs.input.setCurrentValue = function(value) {
        // 重写 setCurrentValue控制validateEvent
        if (value === this.currentValue) return
        this.$nextTick(function() {
          this.resizeTextarea()
        })
        this.currentValue = value
        if (self.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value])
        }
      }
    })
  }
  InputNumber.methods.debounceHandleInput = function() {}
  InputNumber.methods.handleBlur = function(e) {
    var value = Number(e.target.value)
    if (!isNaN(value)) {
      let bValue = this.bit || 1
      let newValue = Math.round((1 / bValue) * value) / (1 / bValue)
      this.setCurrentValue(newValue)
    } else {
      this.$refs.input.setCurrentValue(this.currentValue)
    }
  }
  
  /*
   * Input组件含输入文字数扩展
   */
  Input.props.numberWord = {
    type: Boolean,
    default: false
  }
  Input.beforeMount = function() {
    if (this.numberWord) {
      // this.$refs.input.attributes.maxlength = this.maxlength
      this.$nextTick(function() {
        if (this.$attrs.maxlength) {
          let node = document.createElement('div')
          node.className = 'el-input-word-counter'
          node.innerHTML = this.value ? this.value.length : 0 + '/' + this.$attrs.maxlength
          this.$el.appendChild(node)
          if (this.$el.classList) {
            this.$el.classList.add('el-input__number-word')
          } else if (this.$el.className.indexOf('el-input__number-word') === -1) {
            this.$el.className += ' el-input__number-word'
          }
        }
      })
    }
  }
  Input.updated = function() {
    if (this.numberWord) {
      let node = this.$el.querySelector('.el-input-word-counter')
      if (node) {
        node.innerHTML = this.value.length + '/' + this.$attrs.maxlength
      }
    }
  }
  
  export {
    version,
    locale,
    install,
    CollapseTransition,
    Loading,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    MessageBox,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Notification,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Message,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    Scrollbar,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer
  }
  