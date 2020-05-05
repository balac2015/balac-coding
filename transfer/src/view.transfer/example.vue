<template>
    <Transfer
            :data="data3"
            target-key="key"
            :target-keys="targetKeys3"
            :list-style="listStyle"
            :render-format="render3"
            :operations="['To left','To right']"
            filterable
            @on-change="handleChange3">

        <template v-slot:list-header="slotProps">
            <input type="checkbox" v-model="slotProps.selected" />
            <span class="vc-transfer-list-header-title">源列表</span>
            <span class="vc-transfer-list-header-count">{{ slotProps.count }}</span>
        </template>

        <template v-slot:list-search="slotProps">
            <input type="text" @input="" />
        </template>

        <template v-slot:default="slotProps">
            <input type="checkbox" v-model="slotProps.selected" :value="slotProps.item.key" />
            <span>{{ slotProps.item.label }}</span>
        </template>

        <template v-slot:operation>
            <button>左</button>
            <button>右</button>
            <button>全左</button>
            <button>全右</button>
        </template>

        <template v-slot:list-footer="">
            <div :style="{float: 'right', margin: '5px'}">
                <Button type="ghost" size="small" @click="reloadMockData">Refresh见客户</Button>
            </div>
        </template>
    </Transfer>
    
</template>
<script>
    import Transfer from './index.js'
    
    function getMockData() {
        let mockData = []
        for (let i = 1; i <= 20; i++) {
            mockData.push({
                key: i.toString(),
                label: 'Content ' + i,
                description: 'The desc of content  ' + i,
                disabled: Math.random() * 3 < 1
            })
        }
        console.log('mockData: %o', mockData)
        return mockData
    }
    function getTargetKeys() {
        const targetKeys = getMockData()
            .filter(() => Math.random() * 2 > 1)
            .map(item => item.key)
        console.log('targetKeys: %o', targetKeys)

        return targetKeys
    }

    export default {
        components: {
            Transfer
        },
        data () {
            return {
                a: [],
                data3: [],
                targetKeys3: []
            }
        },
        created () {
            this.reloadMockData()
            this.listStyle = {
                width: '250px',
                height: '300px'
            }
        },
        methods: {
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys
            },
            render3 (item) {
                return item.label + ' - ' + item.description
            },
            reloadMockData () {
                this.data3 = getMockData()
                this.targetKeys3 = getTargetKeys()
            }
        }
    }
</script>
