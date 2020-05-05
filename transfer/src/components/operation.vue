<template>
    <div class="vc-transfer-operation">
        <slot name="operation">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </slot>
    </div>
</template>

<script>
    // import iButton from '../button/button.vue';
    // import Icon from '../icon/icon.vue';
    const iButton = {
        template: '<div>button</div>'
    }
    const Icon = {
        template: '<div>icon</div>'
    }

    export default {
        name: 'Operation',
        components: { iButton, Icon },
        props: {
            prefixCls: String,
            operations: Array,
            leftActive: Boolean,
            rightActive: Boolean
        },
        methods: {
            moveToLeft () {
                this.$parent.moveTo('left');
            },
            moveToRight () {
                this.$parent.moveTo('right');
            }
        }
    };
</script>
