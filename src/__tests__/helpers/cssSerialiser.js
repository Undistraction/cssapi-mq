import toCSS from './toCSS';

export default {
  test() {
    return true;
  },
  print(val) {
    return toCSS(val);
  },
};
