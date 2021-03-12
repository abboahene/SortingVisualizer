
import {ctx,barWidth} from './app.js';

///Helper Functions ----------------------------------
//* Redraw functions
function redraw(arr, barWidth, color,i,j) {
        // console.log(arr);
        let margin =  barWidth < 10 ? barWidth*0.2 : barWidth*0.05;
        let x = (canvas.width- (barWidth*0.05) - barWidth * arr.length) / 2.5;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < arr.length; index++) {
            ctx.fillStyle = color;
            index == i ? ctx.fillStyle = '#fe00fe': color ;
            index == j ? ctx.fillStyle = '#bbb': color ;
            // index < mergeChunk ? ctx.fillStyle = '#eee': color ;
            ctx.fillRect(x, 0, barWidth, arr[index]/1.4);
            ctx.fillStyle = "#fff";
            ctx.font = ((barWidth/100)*17)+"px Georgia";
            ctx.fillText(arr[index], x+barWidth/2.5, 20);
            ctx.moveTo(x =x + barWidth + barWidth*0.05, 0);
            
        }
}


//* generates random array elements
function generateArray(size) {
    let arr =[];
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * 500) + 100;
    }   
    redraw(arr, barWidth,"#8a574e",0);
    return arr;
}


///* stop if sorted 
function sorted(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i+1]) {
            count++;
        }
        
    }
    return count == arr.length-1;
}


export {redraw,generateArray,sorted};