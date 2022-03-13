// define callback function (same as url)
const __5szm2kaj = (data) => {
    if (data && data.success && data.success === 1 && data.data) handleJSONP(data.data);
    else console.log('error while loading JSONP');
};

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

const showTooltip = (stepIndex) => {
    document.getElementById(`my-tooltip-${stepIndex}`).style.display = "block";
};
const hideTooltip = (stepIndex) => {
    document.getElementById(`my-tooltip-${stepIndex}`).style.display = "none";
};

// show and hide tooltip according to index
const showHideTooltip = (showIndex, hideIndex) => {
    console.log(`From step ${hideIndex + 1} to step ${showIndex + 1}`);
    document.getElementById(`my-tooltip-${hideIndex}`).style.display = "none";
    // showTooltip(showIndex);
};

// closing tutorial on a step
const closeTutorial = (hideIndex) => {
    console.log(`Closing Tutorial on step ${hideIndex + 1}`);
    document.getElementById(`my-tooltip-${hideIndex}`).style.display = "none";
};

const createTip = (data, stepIndex) => {
    console.log('Creating tip...');

    const tooltip = document.createElement('div');


    tooltip.id = `my-tooltip-${stepIndex}`;

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
                        console.log('Creating tip complete!s');
    tooltip.style = `
    display: block;
    position: absolute;
    `

    document.body.appendChild(tooltip);

    /** add data and functionality */ 
    // add content
    tooltip.getElementsByClassName('popover-content')[0].children[0].innerHTML = Object.values(data.structure.steps[stepIndex].action.contents)[0];

    // add steps
    tooltip.getElementsByClassName("steps-count")[0].children[0].innerHTML = stepIndex + 1;
    tooltip.getElementsByClassName("steps-count")[0].children[1].innerHTML = data.structure.steps.length;

    // add next button click
    tooltip.getElementsByClassName("next-btn")[0].onclick = () => { showHideTooltip( -1, stepIndex) };

    // add close button click
    tooltip.getElementsByClassName("view-less-container")[0].children[1].onclick = () => { closeTutorial(stepIndex) };


};

// handle JSONP
const handleJSONP = (data) => {
    console.log('Handling JSONP input...');

    if(data && data.css) injectCustomCSS(data.css);
    
    console.log(data);

    createTip(data, 0);

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

// init method
const init = () => {
    console.log('Initializing GLS...');
    
    // inject css
    injectCSS();
    
    // inject JSONP
    injectJSONP();

    console.log('Initializing GLS complete!');
};

// call init
init();
