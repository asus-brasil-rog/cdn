// Copyright (c) 2020 by Davide Cantelli (https://codepen.io/cant89/pen/RLEoyV)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// # Accordion in Vanilla Js with Css transition

// A Pen created on CodePen.io. Original URL: [https://codepen.io/cant89/pen/RLEoyV](https://codepen.io/cant89/pen/RLEoyV).

// https://github.com/cant89/gianni-accordion-js

window.gianniAccordion = (function () {
    return class {
  
      transitionendEventName() {
        var i,
          el = document.createElement('div'),
          transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
          };
  
        for (i in transitions) {
          if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
          }
        }
      }
  
      expand(el) {
        function resetHeight(ev) {
          if (ev.target != el.content) return
          el.content.removeEventListener(this.transitionendevent, bindEvent);
  
          if (!el.isOpen) return
  
          requestAnimationFrame(() => {
            el.content.style.transition = '0';
            el.content.style.height = 'auto';
  
            requestAnimationFrame(() => {
              el.content.style.height = null;
              el.content.style.transition = null;
  
              this.setExpandedAria(el);
              el.wrapper.classList.add(this.expandedClass);
              this.trySetTabIndex(el.content, 0)
  
              this.fire("elementOpened", el);
            });
          });
        }
  
        var bindEvent = resetHeight.bind(this);
        el.content.addEventListener(this.transitionendevent, bindEvent);
  
        el.isOpen = true;
        el.wrapper.classList.remove(this.collapsedClass);
        el.content.style.height = el.content.scrollHeight + "px";
      }
  
      collapse(el) {
  
        function endTransition(ev) {
          if (ev.target != el.content) return
          el.content.removeEventListener(this.transitionendevent, bindEvent);
  
          if (el.isOpen) return
  
          this.fire("elementClosed", el);
          this.setCollapsedAria(el);
          el.wrapper.classList.add(this.collapsedClass);
          this.trySetTabIndex(el.content, -1)
        }
  
        var bindEvent = endTransition.bind(this);
        el.content.addEventListener(this.transitionendevent, bindEvent);
  
        el.isOpen = false;
        el.wrapper.classList.remove(this.expandedClass);
  
        requestAnimationFrame(() => {
          el.content.style.transition = '0';
          el.content.style.height = el.content.scrollHeight + "px";
  
  
          requestAnimationFrame(() => {
            el.content.style.transition = null;
            el.content.style.height = this.collapsedHeight;
          });
        });
      }
  
      open(el) {
        el.selected = true;
        this.fire("elementSelected", el);
        this.expand(el);
        el.wrapper.classList.add(this.selectedClass);
      }
  
      close(el) {
        el.selected = false;
        this.fire("elementUnselected", el);
        this.collapse(el);
        el.wrapper.classList.remove(this.selectedClass);
      }
  
      toggle(el) {
        if (el.selected) {
          this.close(el);
        } else {
          this.open(el);
  
          if (this.oneAtATime) {
            this.els.filter(e => e != el && e.selected).forEach(e => {
              this.close(e);
            });
          }
        }
      }
  
      trySetTabIndex(el, index) {
        const tappableElements = el.querySelectorAll(this.defaultElements)
        if (tappableElements) {
          tappableElements.forEach(e => {
            e.setAttribute('tabindex', index)
          })
        }
      }
  
      setExpandedAria(el){
        el.trigger.setAttribute('aria-expanded', 'true')
        el.content.setAttribute('aria-hidden', 'false')
      }
  
      setCollapsedAria(el){
        el.trigger.setAttribute('aria-expanded', 'false')
        el.content.setAttribute('aria-hidden', 'true')
      }
  
      attachEvents() {
        this.els.forEach((el, i) => {
          el.trigger.addEventListener("click", this.toggle.bind(this, el));
        });
      }
  
      setDefaultData() {
        this.els = [];
        this.events = {
          'elementSelected': [],
          'elementOpened': [],
          'elementUnselected': [],
          'elementClosed': [],
          'elementSelectedAtLanding': []
        };
        this.transitionendevent = this.transitionendEventName();
        this.oneAtATime = true;
        this.selectedClass = "selected";
        this.expandedClass = "expanded";
        this.collapsedClass = "collapsed";
        this.trigger = "[data-accordion-element-trigger]";
        this.content = "[data-accordion-element-content]";
        this.collapsedHeight = '0px';
        this.defaultElements = ['a', 'button', 'input'];
        this.openAtLandingIndex = -1
      }
  
      setCustomData(data) {
        var keys = Object.keys(data);
  
        for (var i = 0; i < keys.length; i++) {
          this[keys[i]] = data[keys[i]];
        }
      }
  
      fire(eventName, el) {
        var callbacks = this.events[eventName];
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i](el)
        }
      }
  
      on(eventName, cb) {
        if (!this.events[eventName]) return
        this.events[eventName].push(cb);
      }
  
      constructor(data) {
        this.setDefaultData();
        this.setCustomData(data);  // ES6 => Object.assign(this, data)
  
        [].forEach.call(document.querySelectorAll(this.elements), (el, i) => {
          this.els.push({
            wrapper: el,
            trigger: el.querySelector(this.trigger),
            content: el.querySelector(this.content)
          });
          
          const element = this.els[i]
  
          if (this.openAtLandingIndex !== i) {
            element.content.style.height = this.collapsedHeight
            element.wrapper.classList.add(this.collapsedClass);
            this.setCollapsedAria(element)
  
          } else {
            element.selected = true
            element.wrapper.classList.add(this.selectedClass)
            element.wrapper.classList.add(this.expandedClass)
            this.setExpandedAria(element);
            this.fire('elementSelectedAtLanding', element)
          }
        });
  
        this.attachEvents();
      }
  
    }
  })();


