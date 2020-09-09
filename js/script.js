// Copyright (c) 2020 by Davide Cantelli (https://codepen.io/cant89/pen/RLEoyV)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// # Accordion in Vanilla Js with Css transition
// A Pen created on CodePen.io. Original URL: [https://codepen.io/cant89/pen/RLEoyV](https://codepen.io/cant89/pen/RLEoyV).

// https://github.com/cant89/gianni-accordion-js

var myAccordion = new gianniAccordion({
  elements: ".card article",
  trigger: "[data-accordion-element-trigger]",
  content: "[data-accordion-element-content]",
  openAtLandingIndex: 0,

})

  myAccordion.on("elementSelected", data => {
    console.log("elementOpened", data);
});




 