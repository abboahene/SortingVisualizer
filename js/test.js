let me = mergeSort([503, 245, 298, 107, 488, 140, 541, 371, 493], 0,8);
console.log(me);

function mergeSort(arr, l, r) {
    if (l >= r ) {
        return;
    }

    let m = Math.floor( l + (r-l)/2 );
    let me = merge(arr, l, m, r);
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);

    return me;
}

function merge(arr, l, m, r) {
    let i = 0;
    let j = 0;
    let k = l;
    let L = [];
    let R = [];

    for (let ix = l; ix <= m ; ix++) L.push(arr[ix]);
    for (let ix = m+1; ix <= r+1 ; ix++) R.push(arr[ix]);
    console.log(L);
    console.log(R);
    while ( i < L.length && j < R.length) {
        if (L[i] >= R[j]) {
            arr[k] = L[i];
            i++;
        }else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < L.length) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < R.length) {
        arr[k] = R[j];
        j++;
        k++;
    }
    return arr;
}