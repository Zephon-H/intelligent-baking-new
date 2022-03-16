import {InfiniteScroll, Radio, TabPane, Tabs, FormItem, Form, Tooltip, Switch, Table, TableColumn, Button, Pagination, Popconfirm, Option, Input, DatePicker, TimePicker, Cascader, Message, MessageBox,Select} from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(InfiniteScroll)
Vue.use(Radio)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Cascader)
Vue.use(Tooltip)
Vue.component(Message.name, Message)


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;



