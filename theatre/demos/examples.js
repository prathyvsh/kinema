let examples = [
    {title: "Simple Circle", source: `["circle", {r: 5, fill: "white"}]`},
    {title: "Simple Animated Circle", source: `["circle", {r: ['a', 5, 50], fill: "white", timing: 1000}]`},
    {title: "Single Node: Global Timing", source: `["circle", {r: ['a', 5, 50], fill: ['a', "white", "steelblue"], timing: 1000}]`},
    {title: "Single Node: Local Timing", source: `["circle", {r: ['a', {timing: 1000}, 5, 50], fill: ["a", {timing: 2000}, "white", "steelblue"]}]`},
    {title: "Single Node: Local and Global Timings", source: `["circle", {r: ["a", {timing: 1000}, 5, 50], fill: ["a", "white", "steelblue"], timing: 5000}]`},
    {title: "Path Animation", source: `["path", {"svg-d": ["a", {timing: {duration: 2000, fill: "forwards", direction: "alternate", iterations: Infinity}}, "M -20, 50 Q 10,30 30, 80 T 80, 60", "M -20, 50 Q 10,120 30, 80 T 80, 60"], stroke: "white", strokeWidth: 2, fill: "transparent"}]`},
    {title: "Group Child Animation", source: `["g", ["circle", {cx: ["a", -100, 100], r: 5, fill: "white"}]]`},
    {title: "Group Animation", source: `let pingpong = (d, delay) => ({timing: {duration: d, direction: "alternate", delay, iterations: Infinity, fill: "both"}});

let c = (x,y,r) => ["circle", {cy: ['a', pingpong(3000, r*1000), 100, y, 100],
cx: x,
r: r,
fill: ["a", pingpong(3000, r*1000), "rgba(255,255,255,0.1)", "rgba(255,255,255,1)"]}];

let rs = repeatedly(() => random(2, 10), 500);

["g", ...rs.map(r => c(random(-200,200), random(-200, 200), r))];`}];

