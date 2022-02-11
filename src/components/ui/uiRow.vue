<!--
/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: xieliangkai
* Date: 2019-09-18 16:56
* Desc:  栅格布局 ui-row
*/
 -->


<script>
export default {
  name: 'uiRow',
  components: {},
  render: function (createElement) {
    return createElement(
      this.tag,
      {
        class: ['ui-row', this.justify ? `is-justify-${this.justify}` : '', { 'ui-row--flex': this.type === 'flex' }],
        style: this.style
      },
      this.$slots.default
    );
  },
  props: {
    tag: {
      default: 'div'
    },
    gutter: {
      default: null
    },
    type: {
      default: null
    },
    justify: {
      default: null
    }
  },
  provide() {
    return {
      uiRow: this
    };
  },
  data() {
    return {};
  },
  computed: {
    style: function () {
      let style = {};
      if (this.gutter) {
        style.marginLeft = `-${this.gutter / 2}px`;
        style.marginRight = style.marginLeft;
      }
      return style;
    }
  },
  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.ui-row {
  position: relative;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}
.ui-row--flex {
  display: flex;
}
.is-justify-center {
  justify-content: center;
}
.is-justify-end {
  justify-content: flex-end;
}
.is-justify-between {
  justify-content: space-between;
}
.is-justify-around {
  justify-content: space-around;
}
</style>
