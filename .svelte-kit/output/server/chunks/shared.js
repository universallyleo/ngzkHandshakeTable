let assets = "";
let base = "";
let version = "";
let public_env = {};
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_building(value) {
}
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_version(value) {
  version = value;
}
export {
  assets as a,
  base as b,
  set_paths as c,
  set_version as d,
  set_building as e,
  set_private_env as f,
  public_env as p,
  set_public_env as s,
  version as v
};
