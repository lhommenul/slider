let doc_lang = (document.getElementsByTagName('html')[0].getAttribute("lang")?.toLowerCase()??"en")!="fr"?false:true; // check the lang use in the doc by reading the lang attr => fr = true  , en = false
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
        let restant = this.cards.length%this.per_pages,index_position = 0;
        this.pages = ((this.cards.length-restant)/this.per_pages);
        if(this.pages === 0) this.pages = 1;
        // Je veux 4 pages donc 
        for (let index = 0; index < this.pages; index++) {
            (()=>{
                let l = [];
                for (let index = 0; index < this.per_pages; index++) {
                    const card = this.cards[index+index_position]; 
                    if (card != undefined) l.push(card); // push the card in the list only if he exist
                }
                this.list.push(l)
            })();
            index_position+=this.per_pages;
        }
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
            btn_left.setAttribute('aria-label', doc_lang?'précédent':'previous');
            btn_right.innerText = ">>"
            btn_right.className = "move_slide right_slide"
            btn_right.setAttribute('aria-label', doc_lang?'suivant':'next');
            // append
            c_cont.appendChild(btn_left)
                this.list.forEach((o,index) => {
                    let b = document.createElement('button') // Creation of btn for the swipe 
                    b.innerText = index+1; // Add defualt number's inside the btn representing the  page number
                    b.className = "move_slide dots" 
                    b.setAttribute('aria-label', doc_lang?`page du carousel numéro ${index+1}`:`go to slide ${index+1}`);
                    c_cont.appendChild(b)
                });
            c_cont.appendChild(btn_right)
        })();
        // Transi
        [...document.getElementsByClassName('move_slide')].forEach(ob=>{
            ob.addEventListener('click',()=>{
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