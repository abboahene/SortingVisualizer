function mergeSort(arr, l, r) {
    if (l>=r) {
        console.log('we stop'+r+''+l);
        console.log(auto_generated);
        return;
    }

    let m = Math.floor( l + (r-l)/2 );
    
        mergeSort(arr, l, m);
        mergeSort(arr, m+1,r );
        merge(arr, l, m, r);
    
}


//* Merge for mergesort
function merge(arr, l, m, r) {
    let i = 0;
    let j = 0;
    let k = l;
    let L = [];
    let R = [];

    for (let ix = l; ix <= m ; ix++) L.push(arr[ix]);
    for (let ix = m+1; ix <= r; ix++) R.push(arr[ix]);
    // console.log(L);
    // console.log(R);
    while ( i < L.length && j < R.length) {
        if (L[i] >= R[j]) {
            arr[k] = L[i];
            i++;
        }else{
            arr[k] = R[j];
            j++;
        }
        console.log('i : '+i);
        console.log('j : '+j);
        redraw(arr, barWidth, "#00fe00");
        k++;
    }
    
    while (i < L.length) {
        arr[k] = L[i];
        redraw(arr, barWidth, "#00fe00");
        i++;
        k++;
    }
    while (j < R.length) {
        arr[k] = R[j];
        redraw(arr, barWidth, "#00fe00");
        j++;
        k++;
    }
    return arr;
}