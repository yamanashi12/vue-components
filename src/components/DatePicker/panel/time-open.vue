<template>
<div class="time-open">
  <div class="time-open__select" v-if="visible">
    <ul v-show="timeList.length > 0">
      <li v-for="item in timeList" :key="item" :class="{ 'active': active == item, 'disabled': ItemDisabled(item) }" @click="handleSelect(item, $event)">{{item}}</li>
    </ul>
  </div>
  <div class="time-open__mask" v-if="visible" @click="handleClose"></div>
</div>
</template>
<script>
export default {
  // props: {
  //   visible: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  computed: {
    myValue: () => {
      return this.value
    }
  },
  data() {
    return {
      visible: false,
      value: 0,
      type: '',
      date: '',
      format: '',
      active: 0,
      timeList: [],
      rangeType: '',
      rangeValue: ''
    }
  },
  methods: {
    getTimeList(number) {
      let timeList = []
      for (let i = 0; i <= number; i++) {
        timeList.push(i)
      }
      return timeList
    },
    handleSelect(value, el) {
      if (!this.ItemDisabled(value)) {
        this.visible = false
        this.$emit('pick', this.outputTime(value, this.type), this.type, false)
      }
    },
    outputTime(value, type) {
      if (this.date) {
        let returnDate
        switch (type) {
          case 'h':
            returnDate = new Date(
              this.date.getFullYear(),
              this.date.getMonth(),
              this.date.getDate(),
              value,
              this.date.getMinutes(),
              this.date.getSeconds(),
              this.date.getMilliseconds()
            )
            break
          case 'm':
            returnDate = new Date(
              this.date.getFullYear(),
              this.date.getMonth(),
              this.date.getDate(),
              this.date.getHours(),
              value,
              this.date.getSeconds(),
              this.date.getMilliseconds()
            )
            break
          case 's':
            returnDate = new Date(
              this.date.getFullYear(),
              this.date.getMonth(),
              this.date.getDate(),
              this.date.getHours(),
              this.date.getMinutes(),
              value,
              this.date.getMilliseconds()
            )
            break
        }
        return returnDate
      }
    },
    adjustSpinners(rangeType, rangeValue) {
      this.value = null
      this.visible = true
      switch (this.type) {
        case 'h':
          this.timeList = this.getTimeList(23)
          this.active = this.date.getHours()
          break
        case 'm':
          this.timeList = this.getTimeList(60)
          this.active = this.date.getMinutes()
          break
        case 's':
          this.timeList = this.getTimeList(60)
          this.active = this.date.getSeconds()
          break
      }
      if (rangeType) {
        this.rangeType = rangeType
        this.rangeValue = rangeValue
      }
    },
    handleClose() {
      this.visible = false
      this.$emit('pick', this.date, this.type, false)
    },
    ItemDisabled(index) {
      const indexDate = this.outputTime(index, this.type)
      let disabled = false
      switch (this.rangeType) {
        case 'dateMin':
          disabled = indexDate > this.rangeValue
          break
        case 'dateMax':
          disabled = indexDate < this.rangeValue
          break
      }
      return disabled
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/var';
.time-open {
  &__select {
    margin: 5px 0;
    border: 1px solid #e4e7ed;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    position: absolute;
    width: 322px;
    left: 0;
    z-index: 1000;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    ul {
      display: flex;
      padding-left: 0;
      flex-wrap: wrap;
      li {
        width: 24px;
        line-height: 24px;
        height: 24px;
        border-radius: 50%;
        list-style-type: none;
        margin: 5px 8px;
        text-align: center;
        vertical-align: middle;
        &:hover {
          cursor: pointer;
          color: @color-primary;
        }
        &.active {
          background: @color-primary;
          color: @color-white;
          cursor: pointer;
        }
        &.disabled {
          &:hover {
            color: @color-sub;
          }
          color: @color-sub;
          background: @color-disabled;
        }
      }
    }
  }
  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 999;
  }
}
</style>
