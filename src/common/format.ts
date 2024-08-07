/**
 * object to arr
 * 可拓展参数，是否只要叶子节点，指定遍历层数等
 * ag: { a: { b: { c: 1, c2: 2} }}  => [ a, a.b, a.b.c, a.b.c2 ]
 */
export function formatObjToArr(value?: Record<string, any>) {
  const arr: string[] = [];

  if (!value) {
    return [];
  }

  const _generateOptions = function (object: Record<string, any>, preStr = '') {
    const curKey = Object.keys(object);

    curKey.forEach((key) => {
      const cur = object[key];
      const str = `${preStr}${preStr ? '.' : ''}${key}`;
      arr.push(str);
      if (Object.prototype.toString.call(cur) === '[object Object]') {
        _generateOptions(cur, str);
      }
    });
  };

  _generateOptions(value);
  return arr;
}

export default {};
