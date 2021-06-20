window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let bod = document.querySelector('body');
    console.log(bod);

    function DomElement (h, w) {
        this.height = h;
        this.width = w;
        this.newElem = document.createElement('div');
        this.top = 0;
        this.left = 0;
    }
    DomElement.prototype.render = function() {
        this.newElem.classList.add('cub');
        console.log(this);
        this.newElem.style.width = this.width + 'px';
        this.newElem.style.height = this.height + 'px';
        this.newElem.style.background = 'black';
        this.newElem.style.position = 'absolute';
        bod.insertAdjacentElement('afterbegin', this.newElem);
        this.renderEvent();
    };
    DomElement.prototype.renderEvent = function() {
        console.log(this);
        let leftN = this.left;
        let topN = this.top;
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp') {
                topN = topN - 10;
            this.newElem.style.top = topN + 'px';
            }
            if (event.code === 'ArrowDown') {
                topN = topN + 10;
                this.newElem.style.top = topN + 'px';
            }
            if (event.code === 'ArrowLeft') {
                leftN = leftN - 10;
            this.newElem.style.left = leftN + 'px';
            }
            if (event.code === 'ArrowRight') {
                leftN = leftN + 10;
            this.newElem.style.left = leftN + 'px';
            }
        });
    };

    let obj = new DomElement(100, 100);
    obj.render();
});