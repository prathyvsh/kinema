z.append(document.body, ["div", {id: "app"},
			 ["header", {id: "main-header"},
			  ["h1", "Kinema"],
			  ["select", ...examples.map(x => ["option", x.title])]],
		       ["div", {id: "split-screen"},
			["div", {id: "silk-screen"}],
			["textarea", {id: "editor"}, examples[0].source]]]);

let mirror = CodeMirror.fromTextArea(z.$("#editor"));

yantra.setGlobals();

let canvas = surface({width: "100%", height: "100vh", viewBox: "-200 -150 400 300"});

z.$("#silk-screen").appendChild(canvas);

render(canvas, eval(mirror.getValue()));

mirror.on("change", () => {

    render(canvas, eval(mirror.getValue()));
    
});
