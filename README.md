# SLIDER JS
***
Slider with no themes by default and only js childs accepted.

## How to start
1. download the npm package :
```shell
    npm install --save-dev @lhommenul/slider
```
2. import the script in your html before the `</body>` : 
```js
    <script src="/node_modules/@lhommenul/slider/slider.js"></script>
```
3. add this html where you want the slider to be :
 ```js 
    <ul class="list_cards_actu">
    </ul>
    <div class="control">
    </div> 
```
4. initialise the slider with this script
 ```js 
    new Slider({
        per_pages:6,
        start:0,
        container : document.getElementsByClassName('list_cards_actu')[0],
        cards:[]
    }).init()
```

## How to add elements
1. Creates instance of element/s.
 ```js 
    // Exemple :
    let element = document.createElement('li')
    element.innerText = "test"
```
2. Place them in the propertie `cards` 
 ```js 
    // Exemple :
    new Slider({
        per_pages:6,
        start:0,
        container : document.getElementsByClassName('list_cards_actu')[0],
        // element is the instance create in the step 1.
        cards:[element]
    }).init()
```