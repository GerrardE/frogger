/*
var Enemy = function() {
};

Enemy.prototype.update = function(dt) {
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/
/* I chose to code in ES6, so here is
    my work.
*/

// Enemies our player must avoid
class Obstacle {
    constructor(x, y, move){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started 
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images 
        this.x = x; 
        this.y = y + 55;
        this.xx = 505;
        this.move = move;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.xx){
            this.x += (this.move * dt);
        } else {
            //set the value of x to a -ve value so enemy can really 
            //crawl in and crawl out of the screen 
            this.x = -101;
        }
    }
    
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}  

//Now instantiate the obstacle objects
const enemy = new Obstacle (-101, 0, 1000);
const enemyOne = new Obstacle (-101, 83, 500);
const enemyTwo = new Obstacle (-404, 83, 500);
const enemyThree = new Obstacle (-101, 166, 400);
const enemyFour = new Obstacle (-101, 166, 200);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(enemy, enemyOne, enemyTwo, enemyThree, enemyFour);

// Now write your own player class
class Warrior {
    constructor(){
        this.sprite = 'images/char-boy.png';
        //place the image at the start position by declaring image positions 
        this.xx = 101;
        this.yy = 83; 
        this.restx = this.xx*2;
        this.resty = (this.yy*4)+55; 
        this.x = this.restx;
        this.y = this.resty;
        this.win = false;
    }

    // This class requires an update(), render() and
    // a handleInput() method.
    update(){
        for (let onEnemy of allEnemies) {
            //Collision detection by Matthew Cranford
            if (this.y  === onEnemy.y && (onEnemy.x + onEnemy.xx/7 > this.x && onEnemy.x < this.x + this.xx/7)){
            this.rest();
            } 
        }

        // If Warrior crosses over to the river, let him know he has won
        //by setting this.win to true and displaying a modal
            if(this.y < 55) {
                this.win = true;
                let modal = document.getElementById('modal');
                modal.style.display = ('block');
                this.rest();
            }
        }

        //call rest on event of collision/ win 
        rest(){
            this.x = this.restx;
            this.y = this.resty;
        }

        handleInput(input){
            //check for the keyboard input and move accordingly wrt x and y axis.
            //also create boundaries of the movement on x and y axis
            if (input === 'left' && this.x > 0) {
                this.x -= this.xx;
            } else if (input === 'right' && this.x < 404){
                this.x += this.xx;
            } else if (input === 'up' && this.y > 0){
                this.y -= this.yy;
            } else if (input === 'down' && this.y < 380){
                this.y += this.yy;
            }
        }

        render(){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
}

// Now instantiate the Warrior object.
// Place the Warrior object in a variable called player 
const player = new Warrior ();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});