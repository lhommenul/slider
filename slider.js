



class Slider{
    constructor(props){
        this.pages = 0;
        this.per_pages = props.per_pages;
        this.start = props.start;
        this.cards = props.cards;
        this.list = [];
        this.container_card_slider = props.container;
    }
    init(){
        // define the number of pages
        let restant = this.cards.length%this.per_pages;
        this.pages = ((this.cards.length-restant)/this.per_pages);
        if(this.pages === 0) this.pages = 1;
        let index_position = 0;
        // Je veux 4 pages donc 
        for (let index = 0; index < this.pages; index++) {
            (()=>{
                let l = [];
                for (let index = 0; index < this.per_pages; index++) {
                    const card = this.cards[index+index_position];
                    if (card != undefined) {
                        l.push(card)
                    };
                }
                this.list.push(l)
            })();
            console.log(this.pages);
            index_position+=this.per_pages;
        }
        console.log(this.list);
        // append cards
        this.list[this.start].forEach(e => {
            this.container_card_slider.appendChild(e);    
        });
        // generate btn
        (()=>{
            const c_cont = document.getElementsByClassName('control')[0] // Container where to append the btn's
            let btn_left = document.createElement('button'), // Create a btn to swipe left
                btn_right = document.createElement('button'); // Create a btn to swipe right
            btn_left.innerText = "<<" // Add default content to the btn
            btn_left.className = "move_slide left_slide" // Add default class's
            btn_right.innerText = ">>"
            btn_right.className = "move_slide right_slide"
            // append
            c_cont.appendChild(btn_left)
                this.list.forEach((o,index) => {
                    let b = document.createElement('button') // Creation of btn for the swipe 
                    b.innerText = index+1; // Add defualt number's inside the btn representing the  page number
                    b.className = "move_slide dots" 
                    c_cont.appendChild(b)
                });
            c_cont.appendChild(btn_right)
        })();
        // Transi
        [...document.getElementsByClassName('move_slide')].forEach(ob=>{
            ob.addEventListener('click',()=>{
                var style = document.createElement('style');
                style.innerHTML = `
                    .change_state_perf{ min-height:${this.container_card_slider.clientHeight}px; } 
                `;
                document.head.appendChild(style);
                this.container_card_slider.classList.add("change_state_perf");
                let chil = this.container_card_slider,
                    posi = ob.classList.contains("dots"),
                    i = chil.children;
                [...i].forEach(m=>{
                    m.classList.add("transi");
                })
                setTimeout(()=>{
                    [...i].forEach(p => { p.classList.remove("transi"); p.remove() });
                    this.start = this.start+1===this.pages?0:this.start+1;
                    this.list[posi?Number(ob.innerText)-1:this.start].forEach(e => {
                        this.container_card_slider.appendChild(e)    
                    });
                    this.container_card_slider.classList.remove("change_state_perf");
                },700)
            })
        })        
    }
}