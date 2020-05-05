<template>
    <div :class="classes">
        <div :class="classes + '-list'">
            <div :class="classes + '-list-header'">
                <slot name="list-header" :selected="allChecked" :count="leftSelected.length ? (leftSelected.length + '/' + leftData.length) : leftData.length">
                    header
                </slot>
            </div>
            <div :class="classes + '-list-body'">
                <slot name="list-search" :data="leftData">
                    search
                </slot>
                <ul :class="classes + '-content'">
                    <li v-for="item in leftData" @click.prevent="handleChoose(item)">
                        <slot :item="item" :selected="leftSelected">
                            <span>{{ item.label }}</span>
                        </slot>
                    </li>
                    <slot name="list-empty"></slot>
                </ul>
            </div>
            <div :class="classes + '-footer'">
                <slot name="list-footer"></slot>
            </div>
        </div>

        <div class="vc-transfer-operation">
            <slot name="operation">operation</slot>
        </div>

        <div :class="classes + '-list'">
            <div :class="classes + '-list-header'">
                <slot name="list-header" :selected="rightSelected">
                    header
                </slot>
            </div>
            <div :class="classes + '-list-body'">
                <slot name="list-search" :data="leftData">
                    search
                </slot>
                <ul :class="classes + '-content'">
                    <li v-for="item in rightData" @click.prevent="handleChoose(item)">
                        <slot :item="item">
                            <span>{{ item.label }}</span>
                        </slot>
                    </li>
                    <slot name="list-empty"></slot>
                </ul>
            </div>
            <div :class="classes + '-footer'">
                <slot name="list-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Transfer',
    props: ['data', 'value', 'selected', 'filterMethod', 'targetKey'],
    data() {
        return {
            allChecked: true,
            leftData: [],
            rightData: [],
            leftSelected: [],
            rightSelected: []
        }
    },
    created() {
        this.classes = 'vc-transfer'
        this.splitData()
    },
    methods: {
        splitData () {
            let leftData = []
            let rightData = []
            let leftSelected = []
            let rightSelected = []
            const selected = this.selected || [];

            (this.data || []).forEach(item => {
                let val = item[this.targetKey]

                item.checked = !!item.checked

                if ((this.value || []).indexOf(val) === -1) {
                    leftData.push(item)

                    if (selected.indexOf(val) !== -1) {
                        leftSelected.push(val)
                    }
                }
                else {
                    rightData.push(item)

                    if (selected.indexOf(val) !== -1) {
                        rightSelected.push(val)
                    }
                }
            })
            this.leftSelected = leftSelected
            this.leftData = leftData
            this.rightData = rightData
            this.rightSelected = rightSelected
        },
        handleChoose(item) {
            const val = item[this.targetKey]

            this.leftSelected.push(val)
        }
    },
    watch: {
        data() {
            this.splitData()
        },
        value() {
            this.splitData()
        },
        allChecked() {
            console.log( this.allChecked )
        }
    }
}
</script>
