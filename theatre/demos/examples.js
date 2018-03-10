let examples = [
    {title: "Simple Circle", source: `["circle", {r: 5, fill: "white"}]`},
    {title: "Simple Animated Circle", source: `["circle", {r: ['a', 5, 50], fill: "white", time: 1000}]`},
    {title: "Single Node: Global Timing", source: `["circle", {r: ['a', 5, 50], fill: ['a', "white", "steelblue"], time: 1000}]`},
    {title: "Single Node: Local Timing", source: `["circle", {r: ['a', {time: 1000}, 5, 50], fill: ["a", {time: 2000}, "white", "steelblue"]}]`},
    {title: "Single Node: Local and Global Timings", source: `["circle", {r: ["a", {time: 1000}, 5, 50], fill: ["a", "white", "steelblue"], time: 5000}]`},
    {title: "Path Animation", source: `["path", {"svg-d": ["a", {timing: {duration: 2000, fill: "forwards", direction: "alternate", iterations: Infinity}}, "M -20, 50 Q 10,30 30, 80 T 80, 60", "M -20, 50 Q 10,120 30, 80 T 80, 60"], stroke: "white", strokeWidth: 2, fill: "transparent"}]`}
];

