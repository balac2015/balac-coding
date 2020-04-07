/**
 * JavaScript 数据结构与算法之美 - 计数排序
 */

const countingSort = array => {
    let len = array.length,
        result = [],
        countArr = [],
        min = (max = array[0]);
    console.time('计数排序耗时');
    for (let i = 0; i < len; i++) {
        // 获取最小，最大 值
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
        countArr[array[i]] = countArr[array[i]] ? countArr[array[i]] + 1 : 1;
    }
    console.log('countArr :', countArr);
    // 从最小值 -> 最大值,将计数逐项相加
    for (let j = min; j < max; j++) {
        countArr[j + 1] = (countArr[j + 1] || 0) + (countArr[j] || 0);
    }
    console.log('countArr 2:', countArr);
    // countArr 中,下标为 array 数值，数据为 array 数值出现次数；反向填充数据进入 result 数据
    for (let k = len - 1; k >= 0; k--) {
        // result[位置] = array 数据
        result[countArr[array[k]] - 1] = array[k];
        // 减少 countArr 数组中保存的计数
        countArr[array[k]]--;
        // console.log("array[k]:", array[k], 'countArr[array[k]] :', countArr[array[k]],)
        console.log('result:', result);
    }
    console.timeEnd('计数排序耗时');
    return result;
};

// 测试
const array = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log('原始 array: ', array);
const newArr = countingSort(array);
console.log('newArr: ', newArr);
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   5.6708984375ms
// newArr:  	 [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]

const countingSort2 = (arr, maxValue) => {
    console.time('计数排序耗时');
    maxValue = maxValue || arr.length;
    let bucket = new Array(maxValue + 1),
        sortedIndex = 0;
    (arrLen = arr.length), (bucketLen = maxValue + 1);

    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    console.timeEnd('计数排序耗时');
    return arr;
};

// 测试
const array2 = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log('原始 array2: ', array2);
const newArr2 = countingSort2(array2, 21);
console.log('newArr2: ', newArr2);
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   0.043212890625ms
// newArr:  	 [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]