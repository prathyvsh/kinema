z.append(document.body, ["div", {id: "app"},
			 ["header", {id: "main-header"},
			  ["h1", "Kinema"],
			  ["select", {id: "selector"}, ...examples.map(x => ["option", x.title])]],
		       ["div", {id: "split-screen"},
			["div", {id: "silk-screen"}],
			["textarea", {id: "editor"}, examples[0].source]]]);

let mirror = CodeMirror.fromTextArea(z.$("#editor"));

yantra.setGlobals();

let canvas = surface({width: "100%", height: "100vh", viewBox: "-200 -150 400 300"});

z.$("#silk-screen").appendChild(canvas);

render(canvas, eval(mirror.getValue()));

mirror.on("change", () => {


    let anims = document.getAnimations();

    anims.map(x => {x.cancel()});

    z.clearChildren(canvas);

    render(canvas, eval(mirror.getValue()));

    
});

z.$("#selector").addEventListener("change", evt => {

    mirror.setValue(examples.find(x => x.title == evt.target.value).source);

    let anims = document.getAnimations();

    anims.map(x => {
	
	x.cancel()
    });

    render(canvas, eval(mirror.getValue()));
    
});

document.addEventListener("keydown", evt => {

    if(!mirror.hasFocus()) {
	
    /* Crufty code, have to rewrite and select the selector properly */
    if(evt.key == "ArrowDown") {

	evt.preventDefault();

	let sel = z.$("#selector");
	let idx = sel.selectedIndex;
	let new_idx = ++idx%sel.options.length;
	sel.options[new_idx].selected = true;

	let title = sel.options[new_idx].textContent;
        mirror.setValue(examples.find(x => x.title == title).source);
	
    };

    if(evt.key == "ArrowUp") {

	evt.preventDefault();

	let sel = z.$("#selector");
	let idx = sel.selectedIndex;
	let new_idx = --idx%sel.options.length;
	if (new_idx < 0) new_idx = sel.options.length - 1;
	sel.options[new_idx].selected = true;

	let title = sel.options[new_idx].textContent;
        mirror.setValue(examples.find(x => x.title == title).source);
	
    }};
})
