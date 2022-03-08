// define callback function (same as url)
const __5szm2kaj = (data) => {
    if (data && data.success && data.success === 1) handleJSONP(data);
} 

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

// handle JSONP
const handleJSONP = (data) => {
    console.log('Handling JSONP input...');

    console.log(data);

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

    // inject JSONP
    injectJSONP();

    // inject css
    injectCSS();

    console.log('Initializing GLS complete!');
};

// call init
init();
