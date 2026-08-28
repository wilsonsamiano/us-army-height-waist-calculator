package com.wilsonsamiano.armywhtr;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Base64;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private static final String APP_URL = "https://us-army-height-waist-calculator.grok.me/";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        webView.setBackgroundColor(0xFF0C0F0B);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUserAgentString(settings.getUserAgentString() + " ArmyWHtR/1.0");
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.addJavascriptInterface(new BlobSink(), "ArmyApk");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String host = uri.getHost() == null ? "" : uri.getHost();
                if (host.endsWith("grok.me") || host.endsWith("grok.com")) {
                    return false;
                }
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript(
                    "(function(){if(window.__armyApkHook)return;window.__armyApkHook=1;"
                        + "document.addEventListener('click',function(e){"
                        + "var a=e.target&&e.target.closest?e.target.closest('a[download]'):null;"
                        + "if(!a||!a.href||a.href.indexOf('blob:')!==0)return;"
                        + "e.preventDefault();e.stopPropagation();"
                        + "fetch(a.href).then(function(r){return r.blob()}).then(function(b){"
                        + "var n=a.download||'DA5500.pdf';var r=new FileReader();"
                        + "r.onloadend=function(){ArmyApk.save(n,String(r.result));};"
                        + "r.readAsDataURL(b);});},true);})();",
                    null
                );
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
                if (url != null && url.startsWith("blob:")) {
                    return;
                }
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            webView.loadUrl(APP_URL);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    public class BlobSink {
        @JavascriptInterface
        public void save(String filename, String dataUrl) {
            runOnUiThread(() -> writeAndShare(filename, dataUrl));
        }
    }

    private void writeAndShare(String filename, String dataUrl) {
        try {
            int comma = dataUrl.indexOf(',');
            String b64 = comma >= 0 ? dataUrl.substring(comma + 1) : dataUrl;
            byte[] bytes = Base64.decode(b64, Base64.DEFAULT);
            String safe = filename == null || filename.isEmpty() ? "DA5500.pdf" : filename.replaceAll("[^A-Za-z0-9._-]", "_");
            File out = new File(getCacheDir(), safe);
            FileOutputStream fos = new FileOutputStream(out);
            fos.write(bytes);
            fos.close();
            Uri uri = FileProvider.getUriForFile(this, getPackageName() + ".files", out);
            Intent share = new Intent(Intent.ACTION_SEND);
            share.setType("application/pdf");
            share.putExtra(Intent.EXTRA_STREAM, uri);
            share.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivity(Intent.createChooser(share, "DA Form 5500"));
        } catch (Exception e) {
            Toast.makeText(this, "Could not save PDF", Toast.LENGTH_SHORT).show();
        }
    }
}
