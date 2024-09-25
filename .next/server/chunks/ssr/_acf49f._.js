module.exports = {

"[project]/components/ui/alert/types.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
"[project]/components/ui/alert/index.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/alert/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2d$react$2d$content$2f$dist$2f$sweetalert2$2d$react$2d$content$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/sweetalert2-react-content/dist/sweetalert2-react-content.es.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const Template = ({ titleText = "", text = "", icon, iconColor, footer, toast, grow, showDenyButton, showCancelButton, showCloseButton, input, inputPlaceholder, inputValue, inputLabel, inputOptions, html, isLoading, confirmButtonText = "OK", denyButtonText = "Abort", cancelButtonText = "Cancel", denyColor = "warning", confirmColor = "default", cancelColor = "danger", didOpen, ...props })=>{
    const Alert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2d$react$2d$content$2f$dist$2f$sweetalert2$2d$react$2d$content$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    return Alert.fire({
        ...props,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ALERT_OPTIONS"],
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
        confirmButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variants"][confirmColor],
        cancelButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variants"][cancelColor],
        denyButtonColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variants"][denyColor],
        didOpen: ()=>{
            isLoading && Alert.showLoading();
            return didOpen;
        }
    });
};
const Component = ({ titleText, text, icon, isLoading = false, ...props })=>Template({
        titleText,
        text,
        icon,
        isLoading,
        ...props
    });
const Success = ({ icon = "success", confirmColor = "success", isLoading = false, ...props })=>Template({
        ...props,
        icon,
        confirmColor,
        isLoading
    });
const Danger = ({ icon = "error", confirmColor = "danger", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
const Warning = ({ icon = "warning", confirmColor = "warning", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
const Info = ({ icon = "info", confirmColor = "info", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
const Question = ({ icon = "question", confirmColor = "secondary", isLoading = false, ...props })=>Template({
        icon,
        confirmColor,
        isLoading,
        ...props
    });
const Simple = (props)=>Template(props);
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
const Ask = ({ icon = "info", confirmButtonText = "Intentar Nuevamente", confirmColor = "secondary", cancelButtonText = "Cancelar", cancelColor = "danger", ...props })=>Template({
        ...props,
        icon,
        confirmButtonText,
        confirmColor,
        cancelButtonText,
        cancelColor
    });
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
const __TURBOPACK__default__export__ = Alert;

})()),
"[project]/app/home/page.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/alert/index.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
function Page() {
    const firstRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (firstRender.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Success"])({
                title: "Inicio de sesión exitoso",
                text: "Bienvenido al sistema"
            });
            //     .then(
            //     ({ isConfirmed, isDenied, isDismissed, value }) => isConfirmed && ,
            // );
            firstRender.current = false;
        }
    }, []);
}

})()),
"[project]/app/home/page.ts [app-rsc] (ecmascript, Next.js server component, client modules ssr)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),

};

//# sourceMappingURL=_acf49f._.js.map