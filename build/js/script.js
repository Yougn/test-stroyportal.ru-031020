const ARROW_DOWN_KEYCODE = 40;
const ARROW_UP_KEYCODE= 38;
const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;

Vue.component('auto-complete', {
  template: '#auto-complete',
  props: {
    value: String,
    data: Array,
    field: String
  },
  data() {
    return {
      input: '',
      filteredData: [],
      searchIndex: 0
    };
  },
  created() {
    this.input = this.value || '';
  },
  methods: {
    complete(i) {
      this.input = this.filteredData[i][this.field];
      this.filteredData = [];
    },
    onInputChange(e) {
      const isEnterKey = e.keyCode === ENTER_KEYCODE;
      const isArrowDownKey = e.keyCode === ARROW_DOWN_KEYCODE;
      const isArrowUpKey = e.keyCode === ARROW_UP_KEYCODE;
      const isTabKey = e.keyCode === TAB_KEYCODE;

      if(isEnterKey || isArrowDownKey || isArrowUpKey || isTabKey) {
        return;
      }
      const search = e.target.value.toLowerCase();
      this.input = e.target.value;
      this.searchIndex = 0;

      if(this.input.length) {
        this.filteredData = this.data.filter((person) => person[this.field].toLowerCase().startsWith(search));
      } else {
        this.filteredData = [];
      }
    },
    onSelectData(e) {
      const isArrowDownKey = e.keyCode === ARROW_DOWN_KEYCODE;
      const isArrowUpKey = e.keyCode === ARROW_UP_KEYCODE;
      const isEnterKey = e.keyCode === ENTER_KEYCODE;

      if(isArrowDownKey && this.searchIndex < this.filteredData.length - 1) {
        this.searchIndex++;
      } else if(isArrowUpKey && this.searchIndex > 0) {
        this.searchIndex--;
      } else if(isEnterKey) {
        this.complete(this.searchIndex);
      }
    }
  }
});

const app = new Vue({
  el: '#app',
  data: {
    data: [
      {id: 1, name: 'Бетон, ЖБИ'},
      {id: 2, name: 'Геоматериалы'},
      {id: 3, name: 'Крепеж'},
      {id: 4, name: 'Кровля'},
      {id: 5, name: 'Металл и металлические изделия'},
      {id: 6, name: 'Общестроительные материалы'},
      {id: 7, name: 'Пены, герметики, клеи'},
      {id: 8, name: 'Пиломатериалы'},
      {id: 9, name: 'Сухие строительные смеси'},
      {id: 10, name: 'Сыпучие материалы'},
      {id: 11, name: 'Утепление и изоляция'},
      {id: 12, name: 'Фасадные системы'}
    ],
    field: 'name'
  }
});
