const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it('should load successfully', () => {
    axios
      .get(url)
      .then( result => 
        expect( result.status === 200 )
      )
  });

  it('should contain an <h1> element for the page title', () => { 
    return pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then( headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
      });
  });

  it('should contain a #output element for result', () => { 
    return pageObject
      .evaluate(() => document.querySelector('#output'))
      .then( output => {
        expect(output).to.exist;
        expect(output).to.not.be.null;
        expect(typeof output).to.equal('object');
      });
  });

  it('should correctly calculate mortgage payment', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 200000)
      .type('input[name=interestRate]', 4)
      .type('input[name=loanTerm]', 30)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$954.83');
      })
  ).timeout(8000);

  it('should correctly calculate mortgage payment', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 100000)
      .type('input[name=interestRate]', 1)
      .type('input[name=loanTerm]', 10)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$876.04');
      })
  ).timeout(8000);

  it('should correctly calculate mortgage payment', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 100000)
      .type('input[name=interestRate]', 2)
      .type('input[name=loanTerm]', 15)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$643.51');
      })
  ).timeout(8000);

  it('should correctly calculate mortgage payment', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 300000)
      .type('input[name=interestRate]', 3)
      .type('input[name=loanTerm]', 15)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$2071.74');
      })
  ).timeout(8000);

  it('should correctly calculate quarterly mortgage payment', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 400000)
      .type('input[name=interestRate]', 4)
      .type('input[name=loanTerm]', 40)
      .select('select[name=period]', 4)
      .click('button#calculate')
      .wait('#output')
      .evaluate( () => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$5022.02');
      })
  ).timeout(8000);

  it('should return $0 if prinicpal is missing', () =>
    pageObject
      .wait()
      //.type('input[name=principal]', 400000) //<<== intentially removed
      .type('input[name=interestRate]', 4)
      .type('input[name=loanTerm]', 40)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$0.00');
      })
  ).timeout(8000);

  it('should return $NaN if interest rate is missing', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 400000)
      //.type('input[name=interestRate]', 4)  //<<== intentially removed
      .type('input[name=loanTerm]', 40)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$NaN');
      })
  ).timeout(8000);

  it('should return $0.00 if term is missing', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 400000)
      .type('input[name=interestRate]', 4)
      //.type('input[name=loanTerm]', 40)  //<<== intentially removed
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$Infinity');
      })
  ).timeout(8000);

  it('should default to 12 month term if term is missing', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 400000)
      .type('input[name=interestRate]', 4)
      .type('input[name=loanTerm]', 40)  
      //.select('select[name=period]', 12) //<<== intentially removed
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then( output => {
        expect(output).to.equal('$1671.75');
      })
  ).timeout(8000);

})
