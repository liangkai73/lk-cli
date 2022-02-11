import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $transfer: (option?: any) => Promise<unknown>;
  }
}
