(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_da131e._.js", {

"[project]/utils/localStorage.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "LS": ()=>LS,
    "clear": ()=>clear,
    "default": ()=>__TURBOPACK__default__export__,
    "getItem": ()=>getItem,
    "getLocation": ()=>getLocation,
    "rm": ()=>rm,
    "saveLocation": ()=>saveLocation,
    "setItem": ()=>setItem
});
const clear = ()=>localStorage.clear();
const rm = (item)=>localStorage.removeItem(item);
const getItem = (item)=>{
    if (typeof window === "undefined") return undefined;
    try {
        if (item === "token") return localStorage.getItem(item);
        const data = localStorage.getItem(item);
        if (data === null) return undefined;
        // Check if data is an object or a string
        if (/^\{.*\}$/.test(data)) {
            return JSON.parse(data);
        } else if (/^".*"$/.test(data)) {
            return data.slice(1, -1);
        } else {
            return data;
        }
    } catch (error) {
        console.error(`Error getting localStorage item '${item}':`, error);
        return undefined;
    }
};
const setItem = (key, value)=>{
    if (typeof window === "undefined") return undefined;
    if (typeof key !== "string") {
        throw new Error("The key must be a string");
    }
    const jsonValue = JSON.stringify(value);
    localStorage.removeItem(key);
    localStorage.setItem(key, key !== "token" ? jsonValue : value);
};
const saveLocation = (path)=>setItem("location", path);
const getLocation = ()=>{
    return localStorage.getItem("location") || "";
};
const LS = {
    get: getItem,
    set: setItem,
    rm,
    clear,
    location: {
        save: saveLocation,
        get: getLocation
    }
};
const __TURBOPACK__default__export__ = LS;

})()),
"[project]/utils/time.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "now": ()=>now
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/moment/moment.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const now = (format)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().format(format ?? "YYYY-MM-DD HH:mm:ss");

})()),
"[project]/store/api.config.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "api": ()=>api,
    "default": ()=>__TURBOPACK__default__export__,
    "useStatusStore": ()=>useStatusStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/utils/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/utils/time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
const _URL = ("TURBOPACK compile-time value", "http://172.31.103.50:5000");
const _ENDPOINT = ("TURBOPACK compile-time value", "api");
const _VERSION = ("TURBOPACK compile-time value", "v3");
const baseURL = `${_URL}/${_ENDPOINT}/${_VERSION}`;
const consume = ({ headers = {}, responseType = "json", auth = {
    username: "",
    password: ""
}, cancelToken, signal, data, ...config })=>{
    const instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
        baseURL,
        responseType,
        timeout: 180000,
        headers: {
            Accept: `application/${responseType}`,
            Authorization: "",
            Protected: false,
            ...headers
        },
        auth,
        cancelToken,
        signal,
        data,
        ...config
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("lastRequest", (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["now"])());
    return instance;
};
const setConfig = (url, config)=>{
    if (config === undefined) config = {};
    let headers = {};
    if (url !== "oauth2/sign-in") {
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("user-storage");
        const token = user?.token;
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
                Protected: true
            };
        }
        //check if data element on config delete it
        if (config?.data) {
            delete config.data;
        }
    }
    return {
        headers: {
            ...headers,
            ...config?.headers
        },
        ...config
    };
};
const useStatusStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((set)=>({
        isLoading: false,
        isSuccess: false,
        isError: false,
        isUninitialized: true,
        message: null,
        data: null,
        // Funciones para actualizar el estado del fetch
        setLoading: ()=>set({
                isLoading: true,
                isSuccess: false,
                isError: false,
                isUninitialized: false,
                message: null,
                data: null
            }),
        setSuccess: (data, message = null)=>set({
                isLoading: false,
                isSuccess: true,
                isError: false,
                isUninitialized: false,
                data,
                message: null
            }),
        setError: (message)=>set({
                isLoading: false,
                isSuccess: false,
                isError: true,
                isUninitialized: false,
                message
            }),
        setDefault: ()=>set({
                isLoading: false,
                isSuccess: false,
                isError: false,
                isUninitialized: true,
                message: null,
                data: null
            })
    }));
const api = {
    get: async (url, params)=>{
        const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
        const config = setConfig(url, params);
        setLoading();
        try {
            const response = await consume(config).get(url);
            setSuccess(response.data.data, response.data.message);
            return response;
        } catch (error) {
            const { response, message } = error;
            setError(response?.data?.message || message);
            return error;
        } finally{
            setTimeout(()=>setDefault(), 500);
        }
    },
    post: async (url, data = {}, formData = false, params)=>{
        const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
        const config = setConfig(url, params);
        setLoading();
        try {
            // 	if (formData) {
            // 		const formData = new FormData();
            // 		Object.keys(data).forEach((key) => {
            // 			formData.append(key, data[key]);
            // 		});
            // 		const response = await consume(config).post(url, formData, {
            // 			headers: {
            // 				"Content-Type": "multipart/form-data",
            // 			},
            // 		});
            // 		setSuccess(response.data.data, response.data.message);
            // 		return response;
            // 	} else {
            // 	}
            const response = await consume(config).post(url, data);
            setSuccess(response.data.data, response.data.message);
            return response;
        } catch (error) {
            const { response, message } = error;
            setError(response?.data?.message || message);
            return error;
        } finally{
            setTimeout(()=>setDefault(), 1000);
        }
    },
    patch: async (url, data = {}, params)=>{
        const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
        const config = setConfig(url, params);
        setLoading();
        try {
            const response = await consume(config).put(url, data);
            setSuccess(response.data.data, response.data.message);
            return response;
        } catch (error) {
            const { response, message } = error;
            setError(response?.data?.message || message);
            return error;
        } finally{
            setTimeout(()=>setDefault(), 500);
        }
    },
    delete: async (url, params)=>{
        const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
        const config = setConfig(url, params);
        setLoading();
        try {
            const response = await consume(config).delete(url);
            setSuccess(response.data.data, response.data.message);
            return response;
        } catch (error) {
            const { response, message } = error;
            setError(response?.data?.message || message);
            return error;
        } finally{
            setTimeout(()=>setDefault(), 500);
        }
    }
};
const __TURBOPACK__default__export__ = useStatusStore;

})()),
"[project]/store/fotogrametria/index.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/store/api.config.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const useFotogrametria = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        municipios: [],
        municipio: null,
        imagenes: [],
        scraping: [],
        puntos: [],
        getMunicipios: async ()=>{
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("fotogrametria/schemas");
            set({
                municipios: data
            });
        },
        setMunicipio: (municipio)=>set({
                municipio
            }),
        setImages: (imagenes)=>set({
                imagenes
            }),
        getMap: async (etapa)=>{
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`fotogrametria/map?municipio=${get().municipio}${etapa ? `&etapa=${etapa}` : ""}`);
            set({
                scraping: data
            });
        },
        addImage: (image)=>set({
                imagenes: [
                    ...get().imagenes,
                    image
                ]
            }),
        removeImage: (index)=>set({
                imagenes: get().imagenes.filter((_, i)=>i !== index)
            }),
        editScraping: (scraping)=>set({
                scraping: get().scraping.map((s)=>s.survey_point_id === scraping.survey_point_id ? scraping : s)
            }),
        addPunto: (punto)=>set({
                puntos: [
                    ...get().puntos,
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        ...punto
                    }
                ]
            }),
        editPunto: (punto)=>set({
                puntos: get().puntos.map((p)=>p.id === punto.id ? punto : p)
            }),
        removePunto: (index)=>set({
                puntos: get().puntos.filter((_, i)=>i !== index)
            }),
        postScraping: async (file)=>{
            const formData = new FormData();
            formData.append("file", file);
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("fotogrametria/scraping-project", formData);
            set({
                scraping: data
            });
        },
        postImages: async (files)=>{
            const formData = new FormData();
            files.forEach((file)=>formData.append("files", file));
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("fotogrametria/metadata-images", formData);
            set({
                scraping: data
            });
        },
        getReport: async ()=>{
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("fotogrametria/report");
            set(data);
        },
        postReport: async ()=>{
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("fotogrametria/report", get());
        // set(data);
        },
        patchReport: async ()=>{
            const { data: { data } } = await __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch("fotogrametria/report", get());
        // set(data);
        }
    }), {
    name: "fotogrametria-storage",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage)
}));
const __TURBOPACK__default__export__ = useFotogrametria;

})()),
"[project]/components/ui/alert/types.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "DEFAULT_ALERT_OPTIONS": ()=>DEFAULT_ALERT_OPTIONS,
    "variants": ()=>variants
});
const variants = {
    default: "#2563EB",
    primary: "#8B5CF6",
    secondary: "#4FD1C5",
    outline: "#FFFFFF",
    dark: "#1F2937",
    light: "#FFFFFF",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#22D3EE"
};
const DEFAULT_ALERT_OPTIONS = {
    backdrop: false,
    allowOutsideClick: false,
    allowEscapeKey: true,
    allowEnterKey: true,
    focusConfirm: true,
    scrollbarPadding: true,
    returnInputValueOnDeny: true,
    position: "center",
    showConfirmButton: true
};

})()),
"[project]/components/ui/alert/index.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "Alert": ()=>Alert,
    "Ask": ()=>Ask,
    "Danger": ()=>Danger,
    "Info": ()=>Info,
    "Question": ()=>Question,
    "Save": ()=>Save,
    "Simple": ()=>Simple,
    "Success": ()=>Success,
    "Warning": ()=>Warning,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/alert/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2d$react$2d$content$2f$dist$2f$sweetalert2$2d$react$2d$content$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/sweetalert2-react-content/dist/sweetalert2-react-content.umd.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const Template = ({ titleText = "", text = "", icon, iconColor, footer, toast, grow, showDenyButton, showCancelButton, showCloseButton, input, inputPlaceholder, inputValue, inputLabel, inputOptions, html, isLoading, confirmButtonText = "OK", denyButtonText = "Abort", cancelButtonText = "Cancel", denyColor = "warning", confirmColor = "default", cancelColor = "danger", didOpen, ...props })=>{
    const Alert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2d$react$2d$content$2f$dist$2f$sweetalert2$2d$react$2d$content$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    return Alert.fire({
        ...props,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ALERT_OPTIONS"],
        titleText,
        text,
        icon,
        iconColor,
        footer,
        toast,
        grow,
        showDenyButton,
        showCancelButton,
        showCloseButton,
        input,
        inputPlaceholder,
        inputValue,
        inputLabel,
        inputOptions,
        html,
        confirmButtonText,
        denyButtonText,
        cancelButtonText,
        confirmButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variants"][confirmColor],
        cancelButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variants"][cancelColor],
        denyButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variants"][denyColor],
        didOpen: ()=>{
            isLoading && Alert.showLoading();
            return didOpen;
        }
    });
};
_c = Template;
const Component = ({ titleText, text, icon, isLoading = false, ...props })=>Template({
        titleText,
        text,
        icon,
        isLoading,
        ...props
    });
_c1 = Component;
const Success = ({ icon = "success", confirmColor = "success", isLoading = false, ...props })=>Template({
        ...props,
        icon,
        confirmColor,
        isLoading
    });
_c2 = Success;
const Danger = ({ icon = "error", confirmColor = "danger", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
_c3 = Danger;
const Warning = ({ icon = "warning", confirmColor = "warning", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
_c4 = Warning;
const Info = ({ icon = "info", confirmColor = "info", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
_c5 = Info;
const Question = ({ icon = "question", confirmColor = "secondary", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
_c6 = Question;
const Simple = (props)=>Template(props);
_c7 = Simple;
const Save = ({ text, icon = "warning", confirmButtonText = "Continuar", confirmColor = "success", cancelButtonText = "Cancelar", cancelColor = "danger", showCancelButton = true, ...props })=>Template({
        text: `¿Desea proceder a ${text} los cambios?`,
        icon,
        confirmButtonText,
        confirmColor,
        cancelButtonText,
        cancelColor,
        showCancelButton,
        ...props
    });
_c8 = Save;
const Ask = ({ icon = "info", confirmButtonText = "Intentar Nuevamente", confirmColor = "secondary", cancelButtonText = "Cancelar", cancelColor = "danger", ...props })=>Template({
        ...props,
        icon,
        confirmButtonText,
        confirmColor,
        cancelButtonText,
        cancelColor
    });
_c9 = Ask;
const Alert = Object.assign(Component, {
    Success,
    Danger,
    Warning,
    Info,
    Question,
    Simple,
    Save,
    Ask
});
_c10 = Alert;
const __TURBOPACK__default__export__ = Alert;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_refresh__.register(_c, "Template");
__turbopack_refresh__.register(_c1, "Component");
__turbopack_refresh__.register(_c2, "Success");
__turbopack_refresh__.register(_c3, "Danger");
__turbopack_refresh__.register(_c4, "Warning");
__turbopack_refresh__.register(_c5, "Info");
__turbopack_refresh__.register(_c6, "Question");
__turbopack_refresh__.register(_c7, "Simple");
__turbopack_refresh__.register(_c8, "Save");
__turbopack_refresh__.register(_c9, "Ask");
__turbopack_refresh__.register(_c10, "Alert");

})()),
"[project]/utils/index.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "cn": ()=>cn
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}

})()),
"[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "ScrollArea": ()=>ScrollArea,
    "ScrollBar": ()=>ScrollBar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/utils/index.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
const ScrollArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Viewport, {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 22,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Corner, {}, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 23,
                columnNumber: 3
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 2
    }, this));
_c1 = ScrollArea;
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root.displayName;
const ScrollBar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(({ className, orientation = "vertical", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaScrollbar, {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaThumb, {
            className: "relative flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800"
        }, void 0, false, {
            fileName: "[project]/components/ui/scroll-area.tsx",
            lineNumber: 43,
            columnNumber: 3
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/scroll-area.tsx",
        lineNumber: 32,
        columnNumber: 2
    }, this));
_c2 = ScrollBar;
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaScrollbar.displayName;
;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "ScrollArea$React.forwardRef");
__turbopack_refresh__.register(_c1, "ScrollArea");
__turbopack_refresh__.register(_c2, "ScrollBar");

})()),
"[project]/components/ui/separator.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "Separator": ()=>Separator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/utils/index.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, orientation = "horizontal", decorative = true, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root, {
        ref: ref,
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0 bg-zinc-200 dark:bg-zinc-800", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/separator.tsx",
        lineNumber: 14,
        columnNumber: 2
    }, this));
_c1 = Separator;
Separator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root.displayName;
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Separator$React.forwardRef");
__turbopack_refresh__.register(_c1, "Separator");

})()),
"[project]/app/fotogrametria/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$fotogrametria$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/store/fotogrametria/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/store/api.config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/alert/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/navbar/index.tsx [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
;
function Page() {
    _s();
    const { municipios, getMunicipios, setMunicipio } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$fotogrametria$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { isLoading, isError, message } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])((state)=>state);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!municipios.length) getMunicipios();
    }, []);
    if (isError) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Danger"])({
            title: "Error al cargar municipios",
            text: message
        });
    }
    //make a function to replace "-" with " " and return the string and make as title
    const title = (municipio)=>{
        const data = municipio.split("-");
        return data.map((word)=>word[0].toUpperCase() + word.slice(1)).join(" ");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Municipios Disponibles"
            }, void 0, false, {
                fileName: "[project]/app/fotogrametria/page.tsx",
                lineNumber: 28,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row min-h-screen justify-center items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "w-1/6 min-w-48 h-96 overflow-x-auto rounded-md border border-black dark:border-gray-400 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: municipios.map((municipio)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full overflow-hidden  transition-all duration-300 hover:shadow-lg hover:scale-110",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/fotogrametria/${municipio}`,
                                        onClick: ()=>setMunicipio(municipio),
                                        children: title(municipio)
                                    }, municipio, false, {
                                        fileName: "[project]/app/fotogrametria/page.tsx",
                                        lineNumber: 34,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                        className: "my-2 bg-black dark:bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/fotogrametria/page.tsx",
                                        lineNumber: 41,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/fotogrametria/page.tsx",
                                lineNumber: 33,
                                columnNumber: 8
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/fotogrametria/page.tsx",
                        lineNumber: 31,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/fotogrametria/page.tsx",
                    lineNumber: 30,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/fotogrametria/page.tsx",
                lineNumber: 29,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/fotogrametria/page.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this);
}
_s(Page, "Qxo15/1xxjeppm2RIahju/f0nuQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$fotogrametria$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Page;
var _c;
__turbopack_refresh__.register(_c, "Page");

})()),
"[project]/app/fotogrametria/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=_da131e._.js.map