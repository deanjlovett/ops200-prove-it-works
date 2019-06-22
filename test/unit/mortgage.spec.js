const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    
  let mort = null;

  beforeEach( () => {
    mort = new Mortgage(200000,4,30,12);
  });

  it('should have a monthlyPayment function', () => {
    expect(mort.monthlyPayment).to.exist;
  });

  it('should calculate monthly payment correctly', () => {
    expect(mort.monthlyPayment().toFixed(2)).to.equal('954.83');
  });

  it('should have a principal variable', () => {
    expect(mort.principal).to.exist;
  });

  it('should have a interest variable', () => {
    expect(mort.interest).to.exist;
  });

  it('should have a term variable', () => {
    expect(mort.term).to.exist;
  });

  it('should have a period variable', () => {
    expect(mort.period).to.exist;
  });

  before(() => {
    anotherMort = new Mortgage();
  });

  it('should return NaN if all parameters are missing', () => {
    expect(anotherMort.monthlyPayment().toFixed(0)).to.equal('NaN');
  });

  before(() => {
    mortAgain = new Mortgage(200000,4,30);
  });

  it('should return NaN if period parameter is missing', () => {
    expect(mortAgain.monthlyPayment().toFixed(0)).to.equal('NaN');
  });

  before( () => {
    mort2 = new Mortgage(100000,4,30,4);
  });

  it('should calculate quarterly payment correctly', () => {
    expect(mort2.monthlyPayment().toFixed(2)).to.equal('1434.71');
  });

  before( () => {
    mort3 = new Mortgage(100000,4,15,12);
  });

  it('should calculate payment correctly for 15 year term', () => {
    expect(mort3.monthlyPayment().toFixed(2)).to.equal('739.69');
  });

  before( () => {
    mort4 = new Mortgage(100000,4,30,52);
  });

  it('should calculate weekly payment correctly', () => {
    expect(mort4.monthlyPayment().toFixed(2)).to.equal('110.10');
  });

  before( () => {
    mort5 = new Mortgage(100000,4,15,52);
  });

  it('should calculate weekly payment correctly for 15 year term', () => {
    expect(mort5.monthlyPayment().toFixed(2)).to.equal('170.54');
  });

});
