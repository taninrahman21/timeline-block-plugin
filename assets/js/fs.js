var __FSCheckoutGlobalInternal__ = function (h) { "use strict"; var G = Object.defineProperty, Q = Object.defineProperties; var z = Object.getOwnPropertyDescriptors; var S = Object.getOwnPropertySymbols; var P = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable; var v = (h, a, d) => a in h ? G(h, a, { enumerable: !0, configurable: !0, writable: !0, value: d }) : h[a] = d, I = (h, a) => { for (var d in a || (a = {})) P.call(a, d) && v(h, d, a[d]); if (S) for (var d of S(a)) O.call(a, d) && v(h, d, a[d]); return h }, A = (h, a) => Q(h, z(a)); var D = (h, a) => { var d = {}; for (var u in h) P.call(h, u) && a.indexOf(u) < 0 && (d[u] = h[u]); if (h != null && S) for (var u of S(h)) a.indexOf(u) < 0 && O.call(h, u) && (d[u] = h[u]); return d }; var l = (h, a, d) => v(h, typeof a != "symbol" ? a + "" : a, d); const a = { Log(...i) { console && console.log && console.log(...i) }, Error(...i) { console && console.error && console.error(...i) }, Warn(...i) { console && console.warn && console.warn(...i) }, Debug(...i) { console && console.debug && console.debug(...i) } }; function d(i, t) { const e = i.contentWindow, s = i.src, o = {}; if (!e || !s) return null; const n = function (r) { if (!(r && r.origin && r.origin.indexOf("js.stripe.com") > 0 || r.origin.indexOf("www.paypal.com") > 0) && r.origin === t && r && r.data && typeof r.data == "string" && r.data.charAt(0) === "{") try { const c = JSON.parse(r.data); typeof c == "object" && c.type && o[c.type] && o[c.type].forEach(m => { m(c.data) }) } catch (c) { a.Error(c) } }; return window.addEventListener("message", n), { on(r, c) { o[r] || (o[r] = []), o[r].push(c) }, one(r, c, m = !1) { m && delete o[r], !o[r] && this.on(r, c) }, destroy() { window.removeEventListener("message", n) }, post(r, c) { e.postMessage(JSON.stringify({ type: r, data: c }), s.replace(/([^:]+:\/\/[^/]+).*/, "$1")) } } } const u = 2147483647; function $() { const i = function () { return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1) }; return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i() } function N() { let i = !1; try { const t = navigator.userAgent.toLowerCase(); /edge\/|trident\/|msie /.test(t) ? i = !0 : t.indexOf("safari") !== -1 && (t.indexOf("chrome") > -1 || (i = !0)) } catch (t) { } return i } function x(i) { return typeof i == "undefined" || typeof i == "function" || typeof i == "object" && i !== null } function M(i) { return x(i) ? null : i === null ? "null" : i === !0 ? "1" : i === !1 ? "0" : encodeURIComponent(i).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+") } function U(i) { const t = []; return Object.keys(i).forEach(e => { const s = i[e], o = M(s); o !== null && t.push(`${e}=${o}`) }), t.join("&") } function B(i) { return i.pageY <= 20 } function y() { return typeof window == "undefined" } function w(i, t) { if (i == null) throw new Error(t) } class T { constructor(t) { l(this, "styleElement"); l(this, "bodyScrollDisableClassName"); l(this, "isFlashingBrowser"); l(this, "overflow", { x: 0, y: 0 }); l(this, "metaColorSchemeValue", null); l(this, "metaColorSchemeElement", null); this.guid = t, this.bodyScrollDisableClassName = `is-fs-checkout-open-${this.guid}`, this.styleElement = document.createElement("style"), this.styleElement.textContent += this.getBasicStyle(), this.isFlashingBrowser = N() || !y() && !!document.querySelector("#___gatsby"), this.metaColorSchemeElement = document.head.querySelector('meta[name="color-scheme"]') } addStyle(t) { this.styleElement.textContent += t } attach() { return document.head.appendChild(this.styleElement), this } remove() { return document.head.removeChild(this.styleElement), this } disableBodyScroll() { this.backupScrollPosition(), document.body.classList.add(this.bodyScrollDisableClassName) } enableBodyScroll() { document.body.classList.remove(this.bodyScrollDisableClassName), this.restoreScrollPosition() } disableMetaColorScheme() { this.metaColorSchemeElement && (this.metaColorSchemeValue = this.metaColorSchemeElement.getAttribute("content"), this.metaColorSchemeElement.setAttribute("content", "light")) } enableMetaColorScheme() { this.metaColorSchemeElement && this.metaColorSchemeValue && (this.metaColorSchemeElement.setAttribute("content", this.metaColorSchemeValue), this.metaColorSchemeValue = null) } getBasicStyle() { return `body.${this.bodyScrollDisableClassName} { overflow: hidden !important; }` } backupScrollPosition() { this.overflow = { x: document.documentElement.scrollTop, y: document.documentElement.scrollLeft } } restoreScrollPosition() { document.documentElement.scrollTop = this.overflow.x, document.documentElement.scrollLeft = this.overflow.y } } class q { constructor(t, e, s = "Loading Freemius Checkout") { l(this, "loaderElement"); l(this, "isOpen", !1); l(this, "loaderElementId"); this.style = t, this.loaderElementId = `fs-loader-${this.style.guid}`, this.loaderElement = document.createElement("div"), this.loaderElement.id = this.loaderElementId, this.loaderElement.innerHTML = `<img src="${e}" alt="${s}" />`, this.style.addStyle(this.getStyle()) } show() { return this.isOpen ? this : (this.loaderElement.classList.add("show"), document.body.appendChild(this.loaderElement), this.isOpen = !0, this) } hide() { return this.isOpen ? (this.loaderElement.classList.remove("show"), document.body.removeChild(this.loaderElement), this.isOpen = !1, this) : this } getStyle() { return `#${this.loaderElementId} { display: none; position: fixed; z-index: ${u - 1}; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; text-align: left; background: rgba(0, 0, 0, 0.6); transition: opacity 200ms ease-out; will-change: opacity; opacity: 0; } #${this.loaderElementId}.show { opacity: 1; display: block; } #${this.loaderElementId} img { position: absolute; top: 40%; left: 50%; width: auto; height: auto; margin-left: -25px; background: #fff; padding: 10px; border-radius: 50%; box-shadow: 2px 2px 2px rgba(0,0,0,0.1); }` } } class R { constructor(t, e, s, o, n) { l(this, "postman", null); l(this, "iFrame"); l(this, "loadedEventListeners", new Set); l(this, "closedEventListeners", new Set); this.baseUrl = t, this.visibleClass = o, this.checkoutEvents = n, this.iFrame = this.attachIFrame(t, e, s), this.addEventListeners() } close() { var t; (t = this.postman) == null || t.post("close", null) } onClosed(t) { this.closedEventListeners.add(t) } onLoaded(t) { this.loadedEventListeners.add(t) } addToExitIntent(t) { t.addListener(() => { var e, s, o; (e = this.postman) == null || e.post("exit_intent", null), (o = (s = this.checkoutEvents).onExitIntent) == null || o.call(s) }) } attachIFrame(t, e, s) { const o = `${t}/?${U(e)}#${encodeURIComponent(document.location.href)}`, n = document.createElement("iframe"); return n.id = s, n.src = o, n.setAttribute("allowTransparency", "true"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("style", "background: rgba(0,0,0,0.003); border: 0 none transparent;"), n.setAttribute("frameborder", "0"), n.setAttribute("data-testid", n.id), document.body.appendChild(n), n } addEventListeners() { var c, m, E, k, F; const { success: t, purchaseCompleted: e, cancel: s, track: o, afterOpen: n, afterClose: r } = this.checkoutEvents; this.postman = d(this.iFrame, this.baseUrl), (c = this.postman) == null || c.one("upgraded", p => { try { t == null || t(p) } catch (g) { a.Error(g) } this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r() }, !0), (m = this.postman) == null || m.one("purchaseCompleted", p => { try { e == null || e(p) } catch (g) { a.Error(g) } }, !0), (E = this.postman) == null || E.one("canceled", () => { try { s == null || s() } catch (p) { a.Error(p) } this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r() }, !0), (k = this.postman) == null || k.on("track", p => { try { o == null || o(p.event, p) } catch (g) { a.Error(g) } }), (F = this.postman) == null || F.one("loaded", () => { var p; this.dispatchOnLoaded(), (p = this.iFrame) == null || p.classList.add(this.visibleClass); try { n == null || n() } catch (g) { a.Error(g) } }, !0) } removeIFrameAndPostman() { var t; (t = this.postman) == null || t.destroy(), this.postman = null, this.iFrame.remove(), this.closedEventListeners.clear(), this.loadedEventListeners.clear() } dispatchOnLoaded() { this.loadedEventListeners.forEach(t => t()) } dispatchOnClosed() { this.closedEventListeners.forEach(t => t()) } } const b = class b { constructor(t, e, s) { l(this, "iFrameID"); this.style = t, this.options = e, this.baseUrl = s, this.iFrameID = `fs-checkout-page-${this.style.guid}` } create(t) { const e = I(I({}, this.options), t); return new R(this.baseUrl, this.getQueryParams(e), this.iFrameID, b.VISIBLE_CLASS, e) } addStyle() { this.style.addStyle(this.getStyle()) } getQueryParams(t) { const e = { mode: "dialog", guid: this.style.guid, _fs_checkout: !0 }; Object.entries(t).forEach(([o, n]) => { x(n) || (e[o] = n) }); const { sandbox: s } = t; return s && s.ctx && s.token && (e.s_ctx_ts = s.ctx, e.sandbox = s.token), e } getStyle() { return `#${this.iFrameID} { z-index: ${u - 1}; background: rgba(0,0,0,0.003); border: 0 none transparent; visibility: ${this.style.isFlashingBrowser ? "hidden" : "visible"}; margin: 0; padding: 0; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; overflow: hidden; } #${this.iFrameID}.${b.VISIBLE_CLASS} { visibility: visible; }` } }; l(b, "VISIBLE_CLASS", "show"); let _ = b; class V { constructor(t, e, s, o, n) { l(this, "checkoutIFrameBuilder"); l(this, "checkoutIFrame", null); this.style = t, this.exitIntent = e, this.loader = s, this.checkoutIFrameBuilder = new _(this.style, n, o), this.checkoutIFrameBuilder.addStyle() } isOpen() { return this.checkoutIFrame !== null } open(t) { return this.isOpen() ? this : (this.style.disableBodyScroll(), this.style.disableMetaColorScheme(), this.loader.show(), this.exitIntent.attach(), this.checkoutIFrame = this.checkoutIFrameBuilder.create(t), this.checkoutIFrame.onLoaded(this.onLoaded.bind(this)), this.checkoutIFrame.onClosed(this.onClosed.bind(this)), this.checkoutIFrame.addToExitIntent(this.exitIntent), this) } close() { var t; return (t = this.checkoutIFrame) == null || t.close(), this } onLoaded() { this.loader.hide() } onClosed() { this.checkoutIFrame = null, this.loader.hide(), this.style.enableBodyScroll(), this.style.enableMetaColorScheme(), this.exitIntent.detach() } } class j { constructor(t) { l(this, "exitIntentId"); l(this, "exitIntentDiv", null); l(this, "clearExitIntentListener", null); l(this, "listeners", []); this.style = t, this.exitIntentId = `fs-exit-intent-${this.style.guid}`, this.style.addStyle(this.getStyle()) } isAttached() { return this.exitIntentDiv !== null } addListener(...t) { this.listeners.push(...t) } attach(...t) { if (t && this.addListener(...t), this.isAttached()) return this; this.exitIntentDiv = document.createElement("div"), this.exitIntentDiv.id = this.exitIntentId, document.body.appendChild(this.exitIntentDiv); const e = document.documentElement; let s = null; const o = 300, n = c => { B(c) && (s = window.setTimeout(() => { try { this.fireListeners() } catch (m) { a.Error(m) } }, o)) }, r = () => { s && (clearTimeout(s), s = null) }; return e.addEventListener("mouseleave", n), e.addEventListener("mouseenter", r), this.clearExitIntentListener = () => { s && (clearTimeout(s), s = null), e.removeEventListener("mouseleave", n), e.removeEventListener("mouseenter", r) }, this } detach() { var t, e; return this.isAttached() ? ((t = this.exitIntentDiv) == null || t.remove(), this.exitIntentDiv = null, (e = this.clearExitIntentListener) == null || e.call(this), this) : this } fireListeners() { this.listeners.forEach(t => { t() }) } getStyle() { return `#${this.exitIntentId} { z-index: ${u}; border: 0; background: transparent; position: fixed; padding: 0; margin: 0; height: 10px; left: 0; right: 0; width: 100%; top: 0; }` } } const f = class f { constructor(t) { l(this, "queryParams", null); this.url = t, this.queryParams = this.parseQueryStringForCart() } hasCart() { return this.queryParams !== null } getPluginID() { return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_id } getPluginPublicKey() { return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_public_key } matchesPluginID(t) { const e = Number.parseInt(this.getPluginID(), 10), s = Number.parseInt(t.toString(), 10); return Number.isFinite(e) && Number.isFinite(s) && e === s } getCheckoutOptions() { w(this.queryParams, f.NO_CART_FOUND_MESSAGE); const t = { plugin_id: "", public_key: "" }; return Object.entries(this.queryParams).forEach(([e, s]) => { e === "__fs_plugin_id" ? t.plugin_id = s : e === "__fs_plugin_public_key" ? t.public_key = s : t[e] = s }), t } parseQueryStringForCart() { const t = "__fs_authorization", e = new URLSearchParams(this.url.search); if (!e.has(t)) return null; const s = {}; return e.forEach((o, n) => { n.startsWith("__fs_") && (s[n] = o) }), s } }; l(f, "NO_CART_FOUND_MESSAGE", "No cart was found"); let C = f; class L { constructor(t, e = !0, s = "https://checkout.freemius.com") { l(this, "options", { plugin_id: 0, public_key: "" }); l(this, "guid"); l(this, "style"); l(this, "loader"); l(this, "checkoutPopup"); l(this, "exitIntent"); l(this, "cart"); var E; this.baseUrl = s; const m = t, { plugin_id: o, product_id: n, public_key: r } = m, c = D(m, ["plugin_id", "product_id", "public_key"]); if (!o && !n) throw new Error("Must provide a product_id to options."); if (!r) throw new Error("Must provide the public_key to options."); this.options = A(I({}, c), { public_key: r, plugin_id: n != null ? n : o }), this.guid = $(), !y() && (this.style = new T(this.guid), this.loader = new q(this.style, (E = t.loadingImageUrl) != null ? E : `${this.baseUrl}/assets/img/spinner.svg`, t.loadingImageAlt), this.exitIntent = new j(this.style), this.checkoutPopup = new V(this.style, this.exitIntent, this.loader, this.baseUrl, this.options), this.style.attach(), this.cart = new C(new URL(window.location.href)), e && this.recoverCart()) } open(t) { var e, s; if (!y()) { if ((e = this.checkoutPopup) != null && e.isOpen()) { a.Warn("Checkout popup already open. Please close it first before opening it again."); return } (s = this.checkoutPopup) == null || s.open(t) } } close() { var t; y() || (t = this.checkoutPopup) == null || t.close() } destroy() { var t; y() || (this.close(), (t = this.style) == null || t.remove()) } getGuid() { return this.guid } recoverCart() { var t, e; if ((t = this.cart) != null && t.hasCart() && ((e = this.cart) != null && e.matchesPluginID(this.options.plugin_id))) { const s = this.cart.getCheckoutOptions(); this.open(s) } } } return window.FS = window.FS || {}, window.FS.Checkout = L, window.FS.postman = d, window.FS.Logger = a, h.Checkout = L, Object.defineProperty(h, Symbol.toStringTag, { value: "Module" }), h }({});
//# sourceMappingURL=checkout.global.js.map