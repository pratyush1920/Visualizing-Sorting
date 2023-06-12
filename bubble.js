const n=10;
const array = [];

//whenever i refresh the array should be present on the page so i dont have to press the init button in the starting itself thus call in fucntion 
init();

// getting the sound or AUDIO CONTEXT
let audioCtx = null;

function playNote(freq) // play with a given freq
{
    if(audioCtx==null)
    {
        audioCtx = new(
          AudioContext || 
          webkitAudioContext || 
          window.webkitAudioContext
          )();

          // got the aduio context above basically
    }

    const dur = 0.1; // play a node for very short duration
    const osc = audioCtx.createOscillator();// obj to play the sound
    osc.frequency.value=freq; // play with a given frequency 
    osc.start();
    osc.stop(audioCtx.currentTime+dur); // stop it after the duration
    
    // syncing the audio of i and j bars 
    const node = audioCtx.createGain();
    node.gain.value = 0.1;

    // there is a little clicking sound thus interpolation will sort it out 
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    
    osc.connect(node);
    node.connect(audioCtx.destination);  // connection to your speakers 
}

function init()
{
    for(let i=0;i<n;i++)
    {
      array[i] = Math.random();
    }

    // everytime we have to show bars also
    showbars();
}

function play()
{   const copy = [...array];
    //const moves =  bubbleSort(copy);
    const moves = insertionSort(copy);
    //showbars();
    //animate(moves);

}

// function animate(moves)
// {
//     if(moves.length==0)
//     { ////////////////////////////////////////////////////////////////////
//         showbars();
//         return;
//     }

//     const move = moves.shift();
//     const [i,j] = move.indices;

//     if(move.type == "swap")
//     {
//         [array[i],array[j]] = [array[j],array[i]];
//     }

//     // playnote func range of frq 200 to 700 taken by us
//     // (max vol + overlapping) now if we left them as it is then the sound will be very bad and user experience will be worse thus Gain and syncing is required
//     playNote(200+array[i]*500);// math interpolation
//     playNote(200+array[j]*500);

//     showbars(move);
//     setTimeout(function(){
//     animate(moves);

//     },80);// each change is animated in 50 milliseconds
// }

function bubbleSort(array)
{   
   // for animation
   const moves = [];

    do{
    var swapped = false;
    for(let i=1;i<array.length;i++)
    {   
        moves.push({ indices:[i-1,i],type:"comp" });
        if(array[i-1]>array[i])
        {
            swapped=true;
            // these are the two indices that are going to be swapped 
            //these are the objeccts for the comparing 
            moves.push({ indices:[i-1,i],type:"swap" });
            [array[i-1],array[i]] = [array[i],array[i-1]];

        }
    }

    }while(swapped);
    // now return moves for the animation
    return moves;

}


function insertionSort(array) {
    console.log(array.length);

    for(let i=1;i<array.length;i++) {
        for(let j=0;j<array.length-i;j++) {
            if(array[j] > array[j+1]) {
                let h1 = document.querySelectorAll('.bar')[j].getBoundingClientRect().height
                let h2 = document.querySelectorAll('.bar')[j+1].getBoundingClientRect().height
                document.querySelectorAll('.bar')[j+1].style.height = h1+'px'
                document.querySelectorAll('.bar')[j].style.height = h2+'px';

                [array[j], array[j+1]] = [array[j+1], array[j]]

                //setInterval(() => {
  
                //}, 1000);
            }
        }
        document.querySelectorAll('.bar').forEach(e => console.log(e.style.height))
    }
}

function showbars(move)
{
    // problem is that the prev. one is appended to the new array thus it is required to just empt the array
    container.innerHTML = "";
    for(let i=0;i<array.length;i++)
  {
    const bar = document.createElement("div");
    // height = value of array*100 + % plus percent of the container 
    bar.style.height = array[i]*100 + "%";
    bar.style.width = "30px";
    bar.classList.add("bar");

    if(move && move.indices.includes(i))// the bars which are being swaped should be shown in red in color.
    {
        bar.style.backgroundColor=move.type=="swap"?"red":"blue";
    }

    container.appendChild(bar);
   }
}   
//console.log(array);
