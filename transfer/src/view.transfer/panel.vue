<template>
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
</template>

<script>
export default {
    name: 'TransferPanel'
}
</script>