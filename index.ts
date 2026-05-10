import fs from 'fs';
import * as cheerio from 'cheerio';

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-10, License - CC BY-SA 4.0

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}


//Comics wepage Wumo
//Please wait fetch
for (let i = 1; i < 10; i++) { //add different day comics webpages
    let html = '';

    if (fs.existsSync(`./cache/${i}.html`)) {
        html = fs.readFileSync(`./cache/${i}.html`, { encoding: 'utf-8' }); //read file using utf-8
    }
    else {
        sleep(1000); //1sec delay
        let res = await fetch(`https://wumo.com/wumo/2026/05/0${i}`);
        html = await res.text();
        fs.writeFileSync(`./cache/${i}.html`, html);
    }

    const $ = cheerio.load(html);
    //find image. Always first image.
    let img = $('img').first();
    console.log(img.attr('src')); //img location url
    console.log(img.attr('alt')); //date of the comics
}