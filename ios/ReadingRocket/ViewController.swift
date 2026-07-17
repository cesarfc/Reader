import UIKit
import WebKit

/* Reading Rocket — a full-screen WKWebView hosting the bundled web game.
   Files are served over a custom rocket:// scheme (see LocalSchemeHandler)
   so localStorage gets a stable origin and persists across launches. */
final class ViewController: UIViewController {
    private var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.setURLSchemeHandler(LocalSchemeHandler(), forURLScheme: "rocket")

        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.bounces = false
        webView.allowsBackForwardNavigationGestures = false
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 0.76, green: 0.91, blue: 0.99, alpha: 1)
        view.addSubview(webView)

        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.load(URLRequest(url: URL(string: "rocket://app/index.html")!))
    }

    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var preferredStatusBarStyle: UIStatusBarStyle { .darkContent }
}

extension ViewController: WKUIDelegate {
    /* Family Voice recording: the web view asks for the microphone on the
       parent's behalf; iOS already showed its own system mic prompt (see
       NSMicrophoneUsageDescription), so a second WebKit prompt would only
       confuse — grant it. */
    func webView(_ webView: WKWebView,
                 requestMediaCapturePermissionFor origin: WKSecurityOrigin,
                 initiatedByFrame frame: WKFrameInfo,
                 type: WKMediaCaptureType,
                 decisionHandler: @escaping (WKPermissionDecision) -> Void) {
        decisionHandler(type == .microphone ? .grant : .deny)
    }
}

extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        NSLog("RR NAV FAIL (provisional): %@", error.localizedDescription)
    }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        NSLog("RR NAV FAIL: %@", error.localizedDescription)
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        NSLog("RR NAV FINISHED")
    }
}
