function sin(a, b) {
    return Math.sin(a) * b;
  }
  
  function cos(a, b) {
    return Math.cos(a) * b;
  }
  
  function tan(a) {
    return Math.tan((a * Math.PI) / 180);
  }
  
  function pi(a) {
    return 2 * Math.PI * a;
  }
  
  function percentage(a, per) {
    return (a / 100) * per;
  }
  
  function square(a, b) {
    return Math.sqrt(a * a + b * b);
  }
  
  function cube(a) {
    return Math.cbrt(a);
  }
  
  function nthRoot(a, n) {
    const ng = a % 2;
    if (ng == 1 || a < 0) a = -a;
    const r = Math.pow(a, 1 / n);
    n = Math.pow(r, n);
  
    if (Math.abs(a - n) < 1 && a > 0 === n > 0) return ng ? -r : r;
  }
  
  function binaryFactorial(a) {
    if (a === 0) {
      return 1;
    } else {
      return a * binaryFactorial(a - 1);
    }
  }
  
  function naturalLog(a) {
    return Math.log(a);
  }
  
  function commonLog(a, b) {
    return Math.log(b) / Math.log(a);
  }
  
  export {
    sin,
    cos,
    tan,
    pi,
    percentage,
    square,
    cube,
    nthRoot,
    binaryFactorial,
    naturalLog,
    commonLog,
  };