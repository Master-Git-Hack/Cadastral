(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_78f22a._.js", {

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
"[project]/app/home/page.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/** @format */ __turbopack_esm__({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/alert/index.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function Page() {
    _s();
    const firstRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (firstRender.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Success"])({
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
_s(Page, "ATSdOeWIj8DnzpAvwLTk08ZcQSw=");
_c = Page;
var _c;
__turbopack_refresh__.register(_c, "Page");

})()),
"[project]/app/home/page.ts [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=_78f22a._.js.map