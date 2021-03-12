

import { redraw, generateArray, sorted} from './helperFunctions.js';



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const _document = document;

let manimateId;
let banimateId;
let sanimateId;
let _barWidth = document.getElementById('barsize');
let barWidth = 5;
const maxBarWidth= 120;
let num_of_bars = Math.floor(maxBarWidth/ barWidth * 7);
let auto_generated = generateArray(num_of_bars);
let stop = false;
 
export {auto_generated,barWidth,maxBarWidth,num_of_bars,stop,canvas,ctx,_document as document};

document.getElementById('stop').addEventListener('click',() => {
        stop = true;
});

document.getElementById('auto-generate').addEventListener('click',()=>{ 
    auto_generated = generateArray(num_of_bars)
    redraw(auto_generated, barWidth, "#8a574e");
});


_barWidth.addEventListener('input',()=>{
    barWidth = _barWidth.value * 1;
    num_of_bars = Math.floor(maxBarWidth/ barWidth * 7);
    auto_generated = generateArray(num_of_bars);
    redraw(auto_generated, barWidth, "#8a574e",0);
});


/// bubble sort button
let bubbleButton = document.getElementById("bubble");
bubbleButton.addEventListener('click', () => {
    stop = false;
    requestAnimationFrame(banimate);

});
/// merge sort button
let mergeButton = document.getElementById("merge");
mergeButton.addEventListener('click', () => {
    stop = false;
    requestAnimationFrame(manimate)
    // mergeSort(0,auto_generated.length-1)
});

let selectionButton = document.getElementById("selection");
selectionButton.addEventListener('click', () => {
    stop = false;
    requestAnimationFrame(sanimate)
    // selectionSort()
});

//play button listener
document.getElementById('play').addEventListener('click', () => {
    stop = false;
});


//FUNCTIONS------------------------------------------
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//bubble sort 
let countPass = 0
let countSwap = 0
let j = 0;
function bubbleSort(start,end) {
    if ( countPass > end || stop || sorted(auto_generated) ) {
        console.log(countPass >= end);
        console.log(stop);

        cancelAnimationFrame(banimateId);
        return;
    }
    
    console.log('count pass', countPass)
    console.log('count pass', countSwap)
    console.log('arr', auto_generated)
    if (auto_generated[j] < auto_generated[j+1]) {
        let temp = auto_generated[j+1];
        auto_generated[j+1] = auto_generated[j];
        auto_generated[j] = temp;
    }
    redraw(auto_generated, barWidth, "#8a574e",start,start+1);
    j++;
    countSwap++;

    if (countSwap >= end - countPass-1) {
        start = start - countSwap;
        j=0;
        countSwap=0;
        countPass++;
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
///merge sort

function mergeSort(l, r) {
    if (r-l <=0 || stop || sorted(auto_generated)) {
        // console.log('we stop'+r+''+l);
        // console.log(auto_generated);
        cancelAnimationFrame(manimateId);
        return;
    }
    
    let m = Math.floor( l + (r-l)/2 );
    
    mergeSort(l, m);
    mergeSort(m+1,r );

    merge(l, m, r);
}
//* Merge for mergesort
function merge(l, m, r) {
    let i = 0;
    let j = 0;
    let k = l;
    let L = [];
    let R = [];
    
    for (let ix = l; ix <= m ; ix++) L.push(auto_generated[ix]);
    for (let ix = m+1; ix <= r; ix++) R.push(auto_generated[ix]);
    // console.log(L);
    // console.log(R);
    while ( i < L.length && j < R.length) {
        if (L[i] >= R[j]) {
            auto_generated[k] = L[i];
            i++;
        }else{
            auto_generated[k] = R[j];
            j++;
        }
        // console.log('i : '+i);
        // console.log('j : '+j);
        redraw(auto_generated, barWidth, "#8a574e",k);
        k++;
    }
    
    while (i < L.length) {
        auto_generated[k] = L[i];
        redraw(auto_generated, barWidth, "#8a574e",k);
        i++;
        k++;
    }
    while (j < R.length) {
        auto_generated[k] = R[j];
        redraw(auto_generated, barWidth, "#8a574e",k);
        j++;
        k++;
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Selection sort
let pos=0,pointer = 0,largest = pos, scountPass = 0
function selectionSort(){
    if (pos > auto_generated.length-1 || sorted(auto_generated)) {
        cancelAnimationFrame(sanimateId);
        return;
    }
    console.log('pos', pos);
    // console.log('pos+1', pos+1);
    console.log(auto_generated)
    for (let i = pos; i < auto_generated.length; i++) {
        if (auto_generated[i] > auto_generated[largest]) {
            largest = i
           setTimeout( ()=> redraw(auto_generated, barWidth, "#8a574e",pos,largest),500)
            // console.log('traverse',auto_generated[largest])
        }
    }
    console.log('largest index',largest)
    console.log('Largest number',auto_generated[largest])

    let temp =  auto_generated[pos]
    auto_generated[pos] = auto_generated[largest]
    auto_generated[largest] = temp
    redraw(auto_generated, barWidth, "#8a574e",pos,largest)
    pos++
    largest = pos
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

///animation frame selection
let sstart
function sanimate(timestamp) {
    if (sstart == undefined) {
        sstart = timestamp
    }
    
    if (!sorted(auto_generated)) {
        selectionSort()
        setTimeout( () => sanimateId = requestAnimationFrame(sanimate), 500)
    }else{
        cancelAnimationFrame(sanimateId)
    }
    
}
///animation frame bubble

function banimate(timestamp) {

    if (!sorted(auto_generated)) {
        bubbleSort(j, auto_generated.length)
        setTimeout( () => banimateId = requestAnimationFrame(banimate), 500)
    }else{
        cancelAnimationFrame(banimateId)
    }
    
}

//animation frame for merge
let mStart = 0, mChunk = 10, mEnd = mChunk
function manimate(timestamp) {
    if (!sorted(auto_generated) ) {
        if (mStart + mChunk >= auto_generated.length-1) {
            mEnd = auto_generated.length-1
        }else{
            mEnd = mStart + mChunk
        }

        mergeSort(mStart, mEnd);
        if (mStart + mChunk >= auto_generated.length-1){ 
            mStart = 0
            mChunk *= 2
        }else{
            mStart += mChunk
        }
        // manimateId = requestAnimationFrame(manimate)
        setTimeout( () => manimateId = requestAnimationFrame(manimate), 1000)
    }else{
        cancelAnimationFrame(manimateId)
    }
}

