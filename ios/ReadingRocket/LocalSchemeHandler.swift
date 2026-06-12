import WebKit

/* Serves the bundled www/ folder over rocket://app/… with proper MIME types.
   This gives the web app a stable origin (persistent localStorage), exactly
   the approach hybrid frameworks use under the hood. */
final class LocalSchemeHandler: NSObject, WKURLSchemeHandler {

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else { return }
        var path = url.path
        if path.isEmpty || path == "/" { path = "/index.html" }
        NSLog("RR scheme request: %@ -> path %@", url.absoluteString, path)

        guard let wwwRoot = Bundle.main.resourceURL?.appendingPathComponent("www") else {
            NSLog("RR ERROR: no resourceURL")
            urlSchemeTask.didFailWithError(NSError(domain: "rocket", code: 500))
            return
        }
        let fileURL = wwwRoot.appendingPathComponent(String(path.dropFirst()))

        guard let data = try? Data(contentsOf: fileURL) else {
            NSLog("RR 404: %@", fileURL.path)
            urlSchemeTask.didFailWithError(NSError(domain: "rocket", code: 404))
            return
        }
        NSLog("RR 200: %@ (%d bytes)", path, data.count)

        let response = URLResponse(url: url,
                                   mimeType: Self.mime(for: fileURL.pathExtension),
                                   expectedContentLength: data.count,
                                   textEncodingName: "utf-8")
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    private static func mime(for ext: String) -> String {
        switch ext.lowercased() {
        case "html":               return "text/html"
        case "css":                return "text/css"
        case "js":                 return "application/javascript"
        case "svg":                return "image/svg+xml"
        case "png":                return "image/png"
        case "woff2":              return "font/woff2"
        case "json", "webmanifest": return "application/json"
        default:                   return "application/octet-stream"
        }
    }
}
