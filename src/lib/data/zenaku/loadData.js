const recordedData = ["36Single"];

const files = import.meta.glob("./*.json", {
    eager: true,
});

// console.log(files);
export const zenakuData = Object.keys(files)
    .sort((a, b) => {
        let partsa = a.split("/"),
            partsb = b.split("/");
        let fa = partsa[partsa.length - 1].split(".")[0],
            fb = partsb[partsb.length - 1].split(".");
        return recordedData.indexOf(fa) < recordedData.indexOf(fb);
    })
    .map((path) => files[path]);

// console.log(zenakuData);
