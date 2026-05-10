import * as cheerio from 'cheerio';

//Comics wepage Wumo
//Please wait fetch
let res = await fetch('https://wumo.com/wumo/2026/05/10');
let html = await res.text();

const $ = cheerio.load(html);
//find image. Always first image.
let img = $('img').first();
console.log(img.attr('src')); //location
console.log(img.attr('alt')); //date of the comics
