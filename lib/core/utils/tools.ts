// import _ from "lodash";
import * as _ from "lodash";

// 遇到相同的配置时，src覆盖obj
function customizer(objValue: any, srcValue: any) {
  if (_.isObject(objValue)) {
    return srcValue;
  }
}

// 深度合并
export const deepMerge = (target, source) => {
  const assgin = Object.assign({}, _.mergeWith(target, source, customizer));
  return assgin;
};
