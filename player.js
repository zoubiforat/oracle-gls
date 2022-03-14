// define callback function (same as url)
const __5szm2kaj = (data) => {
    if (data && data.success && data.success === 1 && data.data) handleJSONP(data.data);
    else console.log('error while loading JSONP');
};

const toolTipDict = {};
const toolTipArr = [];

const injectJSONP = () => {
    console.log('Injecting JSONP input...');

    // create script
    var jsonpScript = document.createElement("script");

    // change attributes
    jsonpScript.src = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
    
    // append css link to head
    document.head.appendChild(jsonpScript);

    console.log('Injecting JSONP input complete!');
};

const injectCustomCSS = (css) => {
    console.log('Injecting custom css...');

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    console.log('Injecting custom css complete');
};

const showTooltip = (stepId) => {
    document.getElementById(`my-tooltip-${stepId}`).style.display = "block";
};
const hideTooltip = (stepId) => {
    document.getElementById(`my-tooltip-${stepId}`).style.display = "none";
};

// show and hide tooltip according to index
const showHideTooltip = (showId, hideId) => {
    console.log(`From step ${hideId} to step ${showId}`);
    document.getElementById(`my-tooltip-${hideId}`).style.display = "none";
    if(showId !== "eol0" && showId !== -1){
        console.log(`showing ${showId}`);
        document.getElementById(`my-tooltip-${showId}`).style.display = "block";
    }
};

// closing tutorial on a step
const closeTutorial = (hideId) => {
    console.log(`Closing Tutorial on step ${hideId}`);
    document.getElementById(`my-tooltip-${hideId}`).style.display = "none";
};

const createTip = (data, stepIndex) => {
    if (data.structure.steps[stepIndex].action.type === "closeScenario") return;
    console.log('Creating tip...');


    const tooltip = document.createElement('div');

    const stepId = data.structure.steps[stepIndex].id;
    toolTipArr.push(tooltip);
    toolTipDict[stepId] = tooltip; 

    tooltip.id = `my-tooltip-${stepId}`;

    tooltip.className = "sttip"
    
    tooltip.innerHTML = `
                            <div class="tooltip in"> 
                            <div class="tooltip-arrow"></div>
                            <div class="tooltip-arrow second-arrow"></div>
                                <div class="popover-inner">
                                        ${data.tiplates.tip}
                                </div>
                            </div>
                        `;

    document.body.appendChild(tooltip);
    console.log('Creating tip complete!');

    tooltip.style = `
    display: none;
    position: absolute;
    `

    // set fixed positions
    const positions = [
        {top: 250, left: 1020},
        {top: 50, left: 1456},
        {top: 420, left: 720},
        {top: 490, left: 660},
    ];
    tooltip.style.top = `${positions[stepIndex].top}px`;
    tooltip.style.left = `${positions[stepIndex].left}px`;

    // set position
    // if (data.structure.steps[stepIndex].action.selector)  {
    //     try {
    //         const { top, left } = $(data.structure.steps[stepIndex].action.selector).position();
    //         console.log(top, left);
    //         tooltip.style.top = `${top}px`;
    //         tooltip.style.left = `${left}px`;
    //     } catch (exception) {}
    // }

    // render on site
    document.body.appendChild(tooltip);

    /** add data and functionality */ 
    // add content
    tooltip.getElementsByClassName('popover-content')[0].children[0].innerHTML = Object.values(data.structure.steps[stepIndex].action.contents)[0];

    // add steps
    tooltip.getElementsByClassName("steps-count")[0].children[0].innerHTML = stepIndex + 1;
    tooltip.getElementsByClassName("steps-count")[0].children[1].innerHTML = data.structure.steps.length - 1;

    // add next button click
    let showId = data.structure.steps[stepIndex].followers[0].next;
    tooltip.getElementsByClassName("next-btn")[0].onclick = () => { showHideTooltip( showId, stepId) };

    // add close button click
    tooltip.getElementsByClassName("view-less-container")[0].children[1].onclick = () => { closeTutorial(stepId) };

};

// handle JSONP
const handleJSONP = (data) => {
    console.log('Handling JSONP input...');

    if(data && data.css) injectCustomCSS(data.css);
    
    console.log(data);

    for (let i = 0; i < data.structure.steps.length; i++) {
        createTip(data, i);
    }

    showTooltip(1);

    console.log('Handling JSONP input complete!');
};

// inject css
const injectCSS = () => {
    console.log('Injecting CSS...');

    // create link
    var cssLink = document.createElement('link')

    // change attributes
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css';

    // append css link to head
    document.head.appendChild(cssLink);

    console.log('Injecting CSS complete!');
};

// inject jQuery
const injectJQuery = () => {
    console.log('Injecting JQuery...');

    // create script
    var cssLink = document.createElement('script')

    // change attributes
    cssLink.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';

    // append jquery
    document.head.appendChild(cssLink);

    console.log('Injecting JQuery complete!');
};

// init method
const init = () => {
    console.log('Initializing GLS...');
    
    // inject css
    injectCSS();

    // inject jquery
    injectJQuery();
    
    // inject JSONP
    injectJSONP();

    console.log(toolTipArr);
    console.log(toolTipDict);

    console.log('Initializing GLS complete!');
};

// call init
init();
