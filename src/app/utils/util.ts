/**
 * Filter out null and undefined properties
 * @param props
 * @returns {{}}
 */
export function removeEmptyProperties(props: any): any {
  return Object.keys(props || {})
    .filter((key) => props[key] !== undefined && props[key] !== null)
    .filter((key) => props[key] !== 'undefined' && props[key] !== 'null' && props[key] !== '')
    .filter((key) => (Array.isArray(props[key]) && props[key].length) || !Array.isArray(props[key]))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
}
