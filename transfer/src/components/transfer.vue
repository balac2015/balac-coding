<template>
    <div class="el-transfer" style="margin: 88px;">
        <panel :data="leftData" :value="leftSelected" @on-change="handleLeftChange">

             <template v-slot:panel-header="">
                <el-checkbox v-model="isLeftChecked">
                    源列表
                    <span>
                        {{ leftSelected.length ? (leftSelected.length + '/' + leftData.length) : leftData.length}}
                    </span>
                </el-checkbox>
                <!-- <span class="vc-transfer-list-header-title">源列表</span> -->
                <!-- <span class="vc-transfer-list-header-count">
                    {{ leftSelected.length ? (leftSelected.length + '/' + leftData.length) : leftData.length}}
                </span> -->
            </template>

            <template v-slot:panel-search>
                <!-- <input type="text" @input="handleSearch($event)" /> -->
                <el-input size="mini" v-model="leftInput" placeholder="请输入内容"></el-input>
            </template>

            <template v-slot:panel-footer>
                <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </template>
        </panel>

        <div class="el-transfer__buttons">
            <slot name="operation">
                <el-button :type="leftSelected.length > 0 ? 'primary' : 'default'" icon="el-icon-arrow-right" circle :disabled="!leftSelected.length" @click.stop.prevent="handleToRight"></el-button>
                <br />
                <el-button :type="rightSelected.length > 0 ? 'primary' : 'default'" icon="el-icon-arrow-left" circle :disabled="!rightSelected.length" @click.stop.prevent="handleToLeft"></el-button>
                <br />
                <el-button :type="leftSelected.length > 0 ? 'primary' : 'default'" icon="el-icon-d-arrow-right" circle :disabled="!leftSelected.length" @click.stop.prevent="handleAllRight"></el-button>
                <br />
                <el-button :type="rightSelected.length > 0 ? 'primary' : 'default'" icon="el-icon-d-arrow-left" circle :disabled="!rightSelected.length" @click.stop.prevent="handleAllLeft"></el-button>
            </slot>
        </div>

        <panel :data="rightData" :value="rightSelected" @on-change="handleRightChange" />
    </div>
</template>

<script>
import Panel from './panel'

function getMockData(len = 20) {
    let mockData = []
    for (let i = 1; i <= len; i++) {
        mockData.push({
            key: i.toString(),
            label: 'Content ' + i,
            description: 'The desc of content  ' + i,
            disabled: Math.random() * 3 < 1
        })
    }

    return mockData
}

export default {
    name: 'Transfer',
    components: {
        Panel
    },
    data() {
        return {
            leftData: [],
            leftSelected: [],
            rightData: [],
            rightSelected: [],
            isLeftChecked: false,
            leftInput: ''
        }
    },
    created() {
        const data = getMockData()

        this.leftData = data
        this.leftSelected = data
            .filter(() => Math.random() * 2 > 1)
            .map(item => item.key)
    },
    methods: {
        handleRightChange(selected = []) {
            this.rightSelected = selected
        },
        handleLeftChange(selected = []) {
            this.leftSelected = selected         
        },
        handleToRight() {
            let leftData = []
            let rightData = []
            const selected = this.leftSelected

            this.leftData.forEach(item => {
                if (selected.indexOf(item.key) === -1) {
                    leftData.push(item)
                }
                else {
                    rightData.push(item)
                }
            })
            this.rightData = this.rightData.concat(rightData)
            this.leftData = leftData
            this.leftSelected = []
            this.rightSelected = selected  
        },
        handleToLeft() {
            let leftData = []
            let rightData = []
            const selected = this.rightSelected

            this.rightData.forEach(item => {
                if (selected.indexOf(item.key) === -1) {
                    rightData.push(item)
                }
                else {
                    leftData.push(item)
                }
            })
            this.leftData = this.leftData.concat(leftData)
            this.rightData = rightData
            this.rightSelected = []
            this.leftSelected = selected  
        },
        handleAllRight() {
            const data = this.leftData
            this.leftSelected = []
            this.leftData = []

            data.forEach(item => {
                this.rightData.push(item)
                this.rightSelected.push(item.key)
            })
            console.log( this.leftSelected )
        },
        handleAllLeft() {
            const data = this.rightData
            this.rightSelected = []
            this.rightData = []

            data.forEach(item => {
                this.leftData.push(item)
                this.leftSelected.push(item.key)
            })
        },
        handleSearch(event) {
            const val = event.target.value

        //     if (!val) {
        //         return this.init()
        //     }
        //     let data = []
        //     let selected = []
        //     this.data.forEach(item => {
        //         if (item.label.indexOf(val) !== -1) {
        //             data.push(item)

        //             if (this.selected.indexOf(item[this.targetKey]) !== -1) {
        //                 selected.push(item[this.targetKey])
        //             }
        //         }
        //     })
        //     this.list = data
        //     this.selected = selected
        //     // this.$emit('on-change', this.selected)
        }
    }
}
</script>