<template>
    <div class="el-transfer-panel">
        <div class="el-transfer-panel__header" v-if="$slots['panel-header']">
            <slot name="panel-header"></slot>
        </div>

        <div class="el-transfer-panel__body" :class="{'is-with-footer': $slots['panel-footer'] }">

            <div class="el-transfer-panel__filter" v-if="$slots['panel-search']">
                <slot name="panel-search" class="el-transfer-panel__filter"></slot>
            </div>

            <template v-if="data && data.length">
                <el-checkbox-group class="el-transfer-panel__list" :class="{ 'is-filterable': $slots['panel-search'] }" v-model="selected" @change="handleChange">
                    <template v-for="item in data">
                        <slot>
                            <el-checkbox class="el-transfer-panel__item" :label="item.key">
                                <div>{{ item.label }}</div>

                            </el-checkbox>
                        </slot>
                    </template>
                </el-checkbox-group>
            </template>

            <div class="el-transfer-panel__empty" v-else>无数据</div>
        </div>
        <div class="el-transfer-panel__footer"  v-if="$slots['panel-footer']">
            <slot name="panel-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TransferPanel',
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        },
        value: {
            type: Array,
            default: function() {
                return []
            }
        },
        targetKey: {
            type: String,
            default: 'key'
        }
    },
    data() {
        return {
            selected: []
        }
    },
    created() {
        console.log( this.$slots )
        this.init()
    },
    methods: {
        init() {
            this.selected = this.value
        },
        handleChange() {
            this.$emit('on-change', this.selected)
        }
    },
    watch: {
        value () {
            this.init()
        }
    }
}
</script>

<style scoped lang="less">
    .el-transfer-panel__body {
        .el-transfer-panel__item {
            height: auto;
        }
    }
</style>