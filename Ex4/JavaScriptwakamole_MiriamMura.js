let imagenes=['topo1','topo2','topo3','topo4','topo5','topo6','topo7','topo8','topo9'];
let aleatori2=null;
let score=0;
function pam(index) {
   
    if (aleatori2-1===index) {
        score+=10;
        document.getElementById('score').innerHTML=score;
        var audio = document.getElementById("boing");
        audio.play();
        document.getElementById(imagenes[index]).src = 'img/topoNo.png';
    }else{
        score-=10;
        document.getElementById('score').innerHTML=score;   
    }
    document.getElementById(imagenes[index]).src = 'img/topoPam.png';
}

function camviaTopo() {

    for (let i=0;i<imagenes.length;i++){
        document.getElementById(imagenes[i]).src = 'img/topoNo.png';
    }
    aleatori2 = Math.trunc((Math.random() * (9)) + 1);
    
    document.getElementById(imagenes[aleatori2-1]).src = 'img/topoSi.png';
    
}
setInterval(camviaTopo, 1000);

const colors = [
    '#2196f3',
    '#f43f5e',
    '#ec4899',
    '#d946ef',
    '#a855f7',
    '#8b5cf6',
    '#6366f1',
    '#3b82f6',
    '#0ea5e9',
    '#06b6d4',
    '#14b8a6',
    '#10b981',
    '#22c55e',
    '#84cc16',
    '#eab308',
    '#f59e0b',
    '#f97316',
    '#ef4444',
  ]
  
  setInterval(() => {
    const color = colors[Math.floor(Math.random()*colors.length)]
    document.body.style.setProperty('--background', color)
  }, 5000)