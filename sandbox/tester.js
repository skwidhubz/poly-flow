/// take a single value which has a range of 1 - 255, and output three different values with range 1 - 255. 

// pass in sliderValue as sV (1 - 255)

let sV = 100;

// function to return 

const colorMix = (sV) => {

    // do fully sick maths
    let r = Math.round(Math.random(sV * Math.random() * 1.1) * 1.5);
    let g = Math.round(Math.random(sV * Math.random() * 1.1) * 1.5);
    let b = Math.round(Math.random(sV * Math.random() * 1.1) * 1.5);

    // set min and max values for variables
    // Math.max(r,g,b, 255) && Math.min(r,g,b, 1);
    
    console.log(r,g,b);
    // return r, g, b;

};

colorMix();

<style>
    
</style>
