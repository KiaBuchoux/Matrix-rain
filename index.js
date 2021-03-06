const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create and draw individual symbol objects thatg make up the rain effect
// Create and manage all individual symbols
class Symbol{
    constructor(x, y, fontSize, canvasHeight){
        this.characters = "ヌフムユュルグズブヅプエェケ李可儿是小怪兽马蹄子是大怪兽爸爸妈妈超级打怪大王セテネヘメレヱゲゼデベペオォコソッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y; 
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.text = " ";
    }

    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize)
        if (this.y*this.fontSize > this.canvasHeight && Math.random()>.98){
            this.y = 0
        } this.y ++ 

    }
}

// Main wrapper for the entire rain effect
// where we put all functionalities to create, update and draw all symbols
class Effect{ //the effect needs to be aware of the canvas sixe, so it can spread symbols all around
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 12;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();

    }

    #initialize(){
        for (let i = 0; i<this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight )
        };

    }
    resize(width, height){
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth/this.fontSize
        this.symbols=[]
        this.#initialize()
    }
}

const effect = new Effect (canvas.width, canvas.height)
let lastTime = 0; 
const fps = 35;
const nextFrame = 1000/fps
let timer = 0; 

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    if (timer > nextFrame){
        ctx.fillStyle = "rgba(0,0,0,0.05)"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.textAlign = "center"
        ctx.fillStyle = "#0aff0a"
        ctx.fontSize = effect.fontSize + "px"
        effect.symbols.forEach(symbol => symbol.draw(ctx))
        timer = 0

    }else{
        timer += deltaTime
    }
    
    requestAnimationFrame(animate)

}

animate(0)

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
})