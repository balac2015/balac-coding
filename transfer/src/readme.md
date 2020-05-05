
思路：
过滤方法：
```javascript
const targetKeys = [];
const data = [];
const leftData = [];
const rightData = [];

data.forEach(function(item) {
    if (targetKeys.indexOf(item.id) === -1) {
        leftData.push(item)
    }
    else {
        rightData.push(item)
    }
});

// 选中操作：leftCheck, rightCheck 的操作

// 向左、向右：targetKeys 的操作，leftCheck, rightCheck 置空
// 全左、全右：targetKeys 置空或 targetKeys = data.map(item => item.id)
// 向上、向下：排序

// 过滤操作：leftData, rightData 的操作

props: [
    'data', // 操作数据
    'value',// 右侧对应 id 数组
    'selected', // 默认选中 id 数组
    'filterMethod'  // 过滤方法，返回 true | false
]

根据 value + data 确定 rightData，再过滤出 leftData
根据 selected + leftData 确定左侧默认选中 leftSelected
根据 selected + rightData 确定右侧默认选中 rightSelected 

过滤：v-if="filterMethod(item)" 显示

组件分离：transfer = panel + btns + panel
    panel = header + search + list + footer
```