class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }
    
    /** 
     * Gets associated htmlToken.
     * @return  {element}   Html element associated with token object.
     */
    get htmlToken() {
        return document.getElementById(this.id);
    }

    /**
     * Gets left offset of html element
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }
    
    /** 
     * Draws new HTML token.
     */
    drawHTMLToken(){
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * Moves token to the left
     */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 75;
            //76 is the amount of pixels in one column
            this.columnLocation -= 1;
        }
    }

    /**
     * Moves token to the left
     */
    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 75;
            this.columnLocation += 1;
        }
    }

    /**
     * Drops html token into targeted board space.
     * @param {Object} target - Targeted space for dropped token.
     * @param {function} reset - The reset funtion to call after the dropped animation has been completed
     */
    drop(target, reset) {
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}