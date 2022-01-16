import Handlebars from "handlebars";
import styles from "./layouts/sessions/signin/signin.css"
//import ex from "./layouts/ex.hbs"

const tpl = `
<div class=${styles.wrapper}>
    <h2 class=${styles.heading}>Test title</h2>
    <p>Hello, my name is {{name}}. I am from {{hometown}}. I have
        {{kids.length}} kids:</p>
    <p>3</p>
    <ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>
</div>
`

const root = document.querySelector("#root")

root.style.background = 'yellow';

const template = Handlebars.compile(tpl);

const data = { "name": "Alan", "hometown": "Somewhere, TX",
    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
console.log('Test', template(data))

root.innerHTML = template(data)
//console.log(template(data));