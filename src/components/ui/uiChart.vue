 <!--
 /**
 * Copyright (c) 2017 Copyright bp All Rights Reserved.
 * Author: huangxinping
 * Date: 2020-09-21 15:27
 * Desc: 
 */
  -->
 
 <template>
  <component :is="type" v-bind="$attrs"></component>
</template>
 
 <script>
import lineChart from "./chart/line/lineChart";
import barChart from "./chart/bar/barChart";
import pieChart from "./chart/pie/pieChart";
import customChart from "./chart/custom/customChart";
export default {
  name: "ui-chart",
  components: {
    lineChart,
    barChart,
    pieChart,
    customChart,
  },
  props: {
    type: {
      type: String,
      default: "lineChart",
    },
  },
};
</script>
 