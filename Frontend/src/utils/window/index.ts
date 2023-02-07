export const close = () => {
    window.opener = null;
    window.open("about:blank", "_self");
    window.close();
    console.log("close");
}