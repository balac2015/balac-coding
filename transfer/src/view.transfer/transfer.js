/* eslint-disable operator-linebreak */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
import List from './list.vue'
import Operation from './operation.vue'
// import Locale from '../../mixins/locale'
// import Emitter from '../../mixins/emitter'
const Locale = {
    methods: {
        t(...args) {
            return 'args'
        }
    }
}
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
const Emitter = {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
}

const prefixCls = 'vc-transfer'

export default {
    name: 'Transfer',
    mixins: [ Emitter, Locale ],
    render (h) {

        function cloneVNode (vnode) {
            const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
            const cloned = h(vnode.tag, vnode.data, clonedChildren)
            cloned.text = vnode.text
            cloned.isComment = vnode.isComment
            cloned.componentOptions = vnode.componentOptions
            cloned.elm = vnode.elm
            cloned.context = vnode.context
            cloned.ns = vnode.ns
            cloned.isStatic = vnode.isStatic
            cloned.key = vnode.key

            return cloned
        }

        const vNodes = this.$slots.default === undefined ? [] : this.$slots.default

        const clonedVNodes = this.$slots.default === undefined ? [] : vNodes.map(vnode => cloneVNode(vnode))

        console.log( this._t, this.$createElement)

        return h('div', { class: this.classes }, [
            h('div', { class: `${this.classes}-list` }, [
                h('div', { class: `${this.classes}-list-header`}, [
                    this._t('panel-header', [
                        h('input', {
                            attrs: {
                                type: 'checkbox',
                                // value: checkedAll,
                                // disabled: checkedAllDisabled
                            },
                            on: {
                                change () {
                                    // toggleSelectAll
                                }
                            }
                        }),
                        h('span', {
                            class: `${this.classes}-list-header-title`,
                            on: {
                                click () {
                                    // toggleSelectAll(!checkedAll)
                                }
                            }
                        }, this.localeTitles[0]),
                        h('span', { class: `${this.classes}-list-header-count` }, 'count')
                    ])
                ])
                
            ])
        ])

        return h('div', {
            'class': this.classes
        }, [
            h(List, {
                ref: 'left',
                props: {
                    prefixCls: this.prefixCls + '-list',
                    data: this.leftData,
                    renderFormat: this.renderFormat,
                    checkedKeys: this.leftCheckedKeys,
                    validKeysCount: this.leftValidKeysCount,
                    listStyle: this.listStyle,
                    title: this.localeTitles[0],
                    filterable: this.filterable,
                    filterPlaceholder: this.localeFilterPlaceholder,
                    filterMethod: this.filterMethod,
                    notFoundText: this.localeNotFoundText
                },
                on: {
                    'on-checked-keys-change': this.handleLeftCheckedKeysChange
                },
                scopedSlots: {
                    default: props => h('span', props.text),
                    panelItem: props => h('span', props.text)
                },
                slot: 'panel-item'
            }, vNodes),

            !!this.$slots.operation ? this.$slots.operation :
            h(Operation, {
                props: {
                    prefixCls: this.prefixCls,
                    operations: this.operations,
                    leftActive: this.leftValidKeysCount > 0,
                    rightActive: this.rightValidKeysCount > 0
                }
            }),

            h(List, {
                ref: 'right',
                props: {
                    prefixCls: this.prefixCls + '-list',
                    data: this.rightData,
                    renderFormat: this.renderFormat,
                    checkedKeys: this.rightCheckedKeys,
                    validKeysCount: this.rightValidKeysCount,
                    listStyle: this.listStyle,
                    title: this.localeTitles[1],
                    filterable: this.filterable,
                    filterPlaceholder: this.localeFilterPlaceholder,
                    filterMethod: this.filterMethod,
                    notFoundText: this.localeNotFoundText
                },
                on: {
                    'on-checked-keys-change': this.handleRightCheckedKeysChange
                }
            }, clonedVNodes)
        ])
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        renderFormat: {
            type: Function,
            default (item) {
                return item.label || item.key
            }
        },
        targetKeys: {
            type: Array,
            default () {
                return []
            }
        },
        selectedKeys: {
            type: Array,
            default () {
                return []
            }
        },
        listStyle: {
            type: Object,
            default () {
                return {}
            }
        },
        titles: {
            type: Array
        },
        operations: {
            type: Array,
            default () {
                return []
            }
        },
        filterable: {
            type: Boolean,
            default: false
        },
        filterPlaceholder: {
            type: String
        },
        filterMethod: {
            type: Function,
            default (data, query) {
                const type = ('label' in data) ? 'label' : 'key'
                return data[type].indexOf(query) > -1
            }
        },
        notFoundText: {
            type: String
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            leftData: [],
            rightData: [],
            leftCheckedKeys: [],
            rightCheckedKeys: []
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`
            ]
        },
        leftValidKeysCount () {
            return this.getValidKeys('left').length
        },
        rightValidKeysCount () {
            return this.getValidKeys('right').length
        },
        localeFilterPlaceholder () {
            if (this.filterPlaceholder === undefined) {
                return this.t('i.transfer.filterPlaceholder')
            } else {
                return this.filterPlaceholder
            }
        },
        localeNotFoundText () {
            if (this.notFoundText === undefined) {
                return this.t('i.transfer.notFoundText')
            } else {
                return this.notFoundText
            }
        },
        localeTitles () {
            if (this.titles === undefined) {
                return [this.t('i.transfer.titles.source'), this.t('i.transfer.titles.target')]
            } else {
                return this.titles
            }
        }
    },
    methods: {
        getValidKeys (direction) {
            return this[`${direction}Data`].filter(data => !data.disabled && this[`${direction}CheckedKeys`].indexOf(data.key) > -1).map(data => data.key)
        },
        splitData (init = false) {
            this.leftData = [...this.data]
            this.rightData = []
            if (this.targetKeys.length > 0) {
                this.targetKeys.forEach((targetKey) => {
                    const filteredData = this.leftData.filter((data, index) => {
                        if (data.key === targetKey) {
                            this.leftData.splice(index, 1)
                            return true
                        }
                        return false
                    })
                    if (filteredData && filteredData.length > 0) this.rightData.push(filteredData[0])
                })
            }
            if (init) {
                this.splitSelectedKey()
            }
        },
        splitSelectedKey () {
            const selectedKeys = this.selectedKeys
            if (selectedKeys.length > 0) {
                this.leftCheckedKeys = this.leftData
                        .filter(data => selectedKeys.indexOf(data.key) > -1)
                        .map(data => data.key)
                this.rightCheckedKeys = this.rightData
                        .filter(data => selectedKeys.indexOf(data.key) > -1)
                        .map(data => data.key)
            }
        },
        moveTo (direction) {
            const targetKeys = this.targetKeys
            const opposite = direction === 'left' ? 'right' : 'left'
            const moveKeys = this.getValidKeys(opposite)
            const newTargetKeys = direction === 'right' ?
                moveKeys.concat(targetKeys) :
                targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey))

            this.$refs[opposite].toggleSelectAll(false)
            this.$emit('on-change', newTargetKeys, direction, moveKeys)
            this.dispatch('FormItem', 'on-form-change', {
                tarketKeys: newTargetKeys,
                direction: direction,
                moveKeys: moveKeys
            })
        },
        handleLeftCheckedKeysChange (keys) {
            this.leftCheckedKeys = keys
        },
        handleRightCheckedKeysChange (keys) {
            this.rightCheckedKeys = keys
        },
        handleCheckedKeys () {
            const sourceSelectedKeys = this.getValidKeys('left')
            const targetSelectedKeys = this.getValidKeys('right')
            this.$emit('on-selected-change', sourceSelectedKeys, targetSelectedKeys)
        }
    },
    watch: {
        targetKeys () {
            this.splitData(false)
        },
        data () {
            this.splitData(false)
        }
    },
    mounted () {
        this.splitData(true)
    }
}
