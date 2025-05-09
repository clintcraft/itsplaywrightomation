interface WebRequestDetails {
    url: string;
    type: string;
    timeStamp: number;
    requestId: string;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details: WebRequestDetails) {
        // Implement your ad-blocking rules here
        if (details.url.includes(".ads.")) {
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
); 