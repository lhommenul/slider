
/*
======= >  Container pour faire les pages et le contenu
<ul class="list_cards_actu">

</ul>
======= >  Container pour faire apparaitre les bouttons de control 
<div class="control">

</div> 

=> Javascript pour initialiser un slider

// new Slider({
//     per_pages:6,
//     start:0,
//     container : document.getElementsByClassName('list_cards_actu')[0],
//     cards:[]
// }).init()

*/

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
            // PUSH une liste de 6 ELEMENTS
            (()=>{
                let l = [];
                for (let index = 0; index < this.per_pages; index++) {
                    const card = this.cards[index+index_position];
                    if (card != undefined) l.push(card);
                    // console.log(card.data.message.length);
                }
                this.list.push(l)
            })();
            index_position+=6;
        }
        // append cards
        this.list[this.start].forEach(e => {
            this.container_card_slider.appendChild(e);    
        });
        // generate btn
        (()=>{
            const c_cont = document.getElementsByClassName('control')[0]
            let btn_left = document.createElement('button'),
                btn_right = document.createElement('button');
            btn_left.innerText = "<<"
            btn_left.className = "move_slide left_slide"
            btn_right.innerText = ">>"
            btn_right.className = "move_slide right_slide"
            // append
            c_cont.appendChild(btn_left)
                this.list.forEach((o,index) => {
                    let b = document.createElement('button')
                    b.innerText = index+1;
                    b.className = "move_slide dots"
                    c_cont.appendChild(b)
                });
            c_cont.appendChild(btn_right)
        })();
        // Transi
        [...document.getElementsByClassName('move_slide')].forEach(ob=>{
            ob.addEventListener('click',(btn_value)=>{
                let chil = this.container_card_slider,
                    posi = ob.classList.contains("dots"),
                    i = chil.children;
                [...i].forEach(m=>{
                    m.classList.add("transi");
                })
                setTimeout(()=>{
                    [...i].forEach(p => { p.remove() });
                    this.start = this.start+1===this.pages?0:this.start+1;
                    this.list[posi?Number(ob.innerText)-1:this.start].forEach(e => {
                        this.container_card_slider.appendChild(e)    
                    });
                },700)
            })
        })        
    }
}