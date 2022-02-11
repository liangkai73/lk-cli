/*
 * @Author: lanck.xie
 * @Date: 2019-09-18 18:44:55
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2019-09-26 16:50:10
 * @desc : 栅格布局 ui-col
 */


<script>
export default {
  name: 'uiCol',
  components: {},
  render: function(createElement) {
    let classList = [];
    classList.push(`ui-col-${this.span}`);
    this.offset && classList.push(`ui-col-offset-${this.offset}`);

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (this[size]) {
        classList.push(`ui-col-${size}-${this[size]}`);
      }
    });

    return createElement(
      this.tag,
      {
        class: ['ui-col', ...classList],
        style: this.style,
        on: {click: () => {this.$emit('click');}}
      },
      this.$slots.default
    );
  },
  props: {
    tag: {
      default: 'div'
    },
    span: {
      type: Number || String
    },
    offset: {
      default: null
    },
    xs: {
      default: 0
    },
    sm: {
      default: 0
    },
    md: {
      default: 0
    },
    lg: {
      default: 0
    },
    xl: {
      default: 0
    }
  },
  data() {
    return {};
  },
  inject: ['uiRow'],
  computed: {
    gutter: function() {
      if (this.uiRow) {
        return this.uiRow.gutter || 0;
      }
      return 0;
    },
    style: function() {
      let style = {};
      if (this.gutter) {
        style.paddingLeft = this.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
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
//nomal
.ui-col {
  float: left;
  box-sizing: border-box;
  :after {
    clear: both;
    content: "";
  }
}
.ui-col-0 {
  display: none;
}
@for $i from 0 through 24 {
  .ui-col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }
}
@for $i from 0 through 24 {
  .ui-col-offset-#{$i} {
    margin-left: (1 / 24 * $i * 100) * 1%;
  }
}
//响应式布局
// xs
@media only screen and (max-width: 767px) {
  .ui-col-xs-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .ui-col-xs-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .ui-col-xs-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
//sm
@media screen and (min-width: 768px) {
  .ui-col-sm-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .ui-col-sm-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .ui-col-sm-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
//md
@media screen and (min-width: 992px) {
  .ui-col-md-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .ui-col-md-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .ui-col-md-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
//lg
@media screen and (min-width: 1200px) {
  .ui-col-lg-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .ui-col-lg-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .ui-col-lg-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
//xl
@media screen and (min-width: 1920px) {
  .ui-col-xl-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .ui-col-xl-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .ui-col-xl-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>
