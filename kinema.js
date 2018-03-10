import yantra from 'yantra';
import 

(global => {

    "use strict";

    // How would I compose animations from scratch? That is from base level elements up?
    
    const dur = (d) => ({duration: d});

    const loop = (t = {duration: 1000}, c = 1) => Object.assign({},t,{iterations: c});

    const mirrorLoop = (t = {duration: 1000}, c = 2) => Object.assign({}, t, {direction: "alternate", iterations: c});

    const pingpong = (t = {duration: 1000}, i = 2) => mirrorLoop(t, Infinity);

    const forever = (t = {duration: 1000}) => loop(t, Infinity);

    const ease = (t, easing) => loop(t, {easing});

    const processDur = t => (typeof t == "number") ? {duration: t} : t;

    const domino = (t,count, variation, offset = (t.duration || t)/count) =>  {

        t = processDur(t);

        return mandala.steps(0,t.duration - offset,count).map(delay => Object.assign({}, t, {delay: delay + mandala.random(0,variation, {asInt: true})}));

    }

    // Implement circular domino
    // What happens when the domino is arranged in circle?

    const curryKf = (animation, timing) => el => [el, animation, timing];

    const validate = ([el, anim, timing]) => {

        if(!(el instanceof Element || m.isShape(el))) {

            console.log("Invalid Props: ", el,anim,timing)
            throw Error("Please pass in a node to animate:");
            
        } else if(!anim instanceof Object) {

            console.log("Invalid Props: ", el,anim,timing)
            throw Error("Please pass in a transition object");

        } else if(!(timing instanceof Object)) {

            console.log("Invalid Props: ", el,anim,timing)
            throw Error("Please pass a timing object");

        } else {

            return true;
        }
    }

    // Should probably check if duration is a number, which is a neat shortcut. May be a have a high level process duration function?
    const mirroredSeq = (item, transition, duration, delay = 0) => {

        duration = processDur(duration);

        let first_kf = [item, transition, duration];

        let reversed_kf = [item, fun.mapVals((k,v) => [...v].reverse(), transition), Object.assign({delay}, duration)];

        return {seq: [first_kf, reversed_kf]};

    }

    const delayedSeq = (anims, delays = 0, timing) => {

        if(!(delays instanceof Array)) {
            
            delays = fun.repeat(delays, anims.length);

        }
        
        // Replace the timing merge with update from funbox
        return seq(fun.map((x,delay) => fun.update(x, "timing", fun.merge, {delay}), anims, delays), timing);

    }

    let sample = (g, anims, times) => {

        let animatable = (g instanceof Element) ? Array.from(g.childNodes) : g;

        let anims_ = (anims instanceof Array) ? anims : fun.repeat(anims, animatable.length);

        let times_ = (times instanceof Array) ? times : fun.repeat(times, animatable.length);

        return fun.map((...x) => x, animatable, anims_, times_);

    }

    const process = (anim, baseAnim, baseTime, canvas) => {

        if(anim instanceof Array && validate(anim)) {

            let [el, effect, timing] = anim;

            return new KeyframeEffect(m.isShape(el) ? m.render(canvas,el) : el, effect || baseAnim,timing || baseTime);
            
        } else if(anim.hasOwnProperty("group")) {

            return new GroupEffect(fun.map(x => process(x, anim.baseAnim || baseAnim, anim.timing || baseTime), anim.group));

        } else if(anim.hasOwnProperty("seq")) {

            return new SequenceEffect(fun.map(x => process(x, anim.baseAnim || baseAnim, anim.timing || baseTime), anim.seq));

        } 

        else {
            
            console.log("Normalizing:", anim);
            throw Error("Unknown animation");

        }
        
    }

    const spec = (tree, canvas) => process(tree, null, null, canvas);

    const anim = (anims, timeline = document.timeline) => {
        
        let animation = new Animation(process(anims), timeline);

        // Remove after the sequence/group animation autoplay bug is removed.
        animation.pause();

        return animation;

    }

    let play = (anim) => {

        if(!(anim.playState == "paused")) anim.cancel();

        anim.play();

        return anim;
        
    }

    let pause = anim => anim.pause();

    let player = (canvasId, kf) => {

        // TODO:
        // Dim Play when playing but enable the feature
        // Pause button on the player bar
        // Seeker
        // If established to be an infinite animation by inspecting the anim
        // provide an icon
        // Also display the framecount/time of the animation
        // Enable Seeking
        let animation = anim(kf);

        let canvas = z.$(canvasId);
        canvas.parentNode.removeChild(canvas);

        let div = document.createElement("div");
        div.classList = "kino-player";
        div.appendChild(canvas);


        let player = document.createElement("div");
        player.style.display = "flex";
        player.style.flexFlow = "row";
        player.style.alignItems = "center";
        player.style.justifyContent = "space-between";
        player.style.width = "300px";
        player.style.padding = "1rem 0";

        let playButton = document.createElement("p");
        playButton.classList = "play-button";
        playButton.innerText = "Play";

        let pauseButton = document.createElement("p");
        pauseButton.classList = "play-button";
        pauseButton.innerText = "Pause";

        player.appendChild(playButton);
        player.appendChild(pauseButton);

        div.appendChild(player);

        canvas.setAttribute("tabindex", 1);
        canvas.style.outline = 0;
        canvas.addEventListener("keydown", e => {
            
            if(e.key == " " && e.shiftKey) {

                pause(animation);

            } else if(e.key == " ") {

                play(animation);

            }


        });

        playButton.addEventListener("click", e => {

            play(animation);
            
        });

        pauseButton.addEventListener("click", e => {

            pause(animation);
            
        });

        return div;

    };

    const api = {anim, dur, loop, mirrorLoop, pingpong, forever, ease, sample, domino, delayedSeq, mirroredSeq, curryKf, play, player, spec};

    global.kino = api;
    
})(this);
