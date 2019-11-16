<template>
    <div class="count">
      {{count}}
      <!-- 方式1 -->
      <!--
      <button @click="$store.commit('add', 20)">+</button>
      <button @click="$store.commit('reduce')">-</button>
      -->
      <!-- 方式2 -->
      <button @click="add(5)">+</button>
      <button @click="reduce">-</button>
      {{count2}}
    </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
    export default {
        name: "Count",
        data() {
            return {
                // count: null
            }
        },
        // 写法1
        // computed: {
        //     count() {
        //         return this.$store.state.count;
        //     }
        // },
        // 写法2
        // computed: mapState({
        //     count: state => state.count
        //     // count(state) {
        //     //     return state.count;
        //     // }
        // }),
        // 写法3
        // computed: mapState(['count']),
        // 写法4
        computed: {
            // es6解构
            ...mapState(['count']),
            // ...mapGetters(['count2'])
            // getters方式2
            count2() {
                return this.$store.getters.count2;
            }
        },
        methods: {
            // test() {
            //     this.count = this.$store.commit('add');
            //     // this.$store.state.count = count;
            // }
            ...mapMutations(['add', 'reduce'])
        }
    }
</script>

<style>

</style>
