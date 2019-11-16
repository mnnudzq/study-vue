<template>
    <div class="count">
      {{count}}
      <button @click="$store.commit('add')">+</button>
      <button @click="$store.commit('reduce')">-</button>
      {{$store.state.count}}
    </div>
</template>

<script>
import {mapState} from 'vuex'
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
            ...mapState(['count'])
        },
        methods: {
            // test() {
            //     this.count = this.$store.commit('add');
            //     // this.$store.state.count = count;
            // }
        }
    }
</script>

<style>

</style>
