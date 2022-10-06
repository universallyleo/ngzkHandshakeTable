import { c as create_ssr_component, o as onDestroy, e as escape, b as add_attribute } from "../../../_app/immutable/chunks/index-16508633.js";
import "chart.js/auto/auto.mjs";
import "chartjs-plugin-datalabels";
const ProgressGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasWidth;
  let { progressData } = $$props;
  let { title } = $$props;
  let { maxlength } = $$props;
  let canvasContainer;
  let thechart;
  onDestroy(() => {
    if (thechart)
      thechart.destroy();
    thechart = null;
  });
  if ($$props.progressData === void 0 && $$bindings.progressData && progressData !== void 0)
    $$bindings.progressData(progressData);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  progressData.spanGaps = true;
  maxlength = progressData ? progressData.datasets[0].data.length : 0;
  canvasWidth = Math.max(maxlength * 80, 1e3);
  return `<div style="${"width:" + escape(canvasWidth, true) + "px"}"${add_attribute("this", canvasContainer, 0)}><canvas${add_attribute("this", thechart, 0)}></canvas></div>`;
});
export {
  ProgressGraph as default
};
