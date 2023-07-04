export const loadAllCD = () => {
    //the path is relative to the current file, not to where the function is run!
    // const files = import.meta.glob("./ended/*.json", {
    //     eager: true,
    // });
    // const currentCD = import.meta.glob("./current.json", {
    //     eager: true,
    // });
    // let cdData = new Array(basicCDData.length);
    // Object.keys(files).map((path) => {
    //     let parts = path.split("/");
    //     let f = parts[parts.length - 1].split(".")[0];
    //     cdData[basicCDData.indexOf(f)] = files[path];
    // });
    // cdData[cdData.length - 1] = currentCD;
    // return cdData;
};
