This extension uses Google Gemini's API to generate summaries of whatever text the user highlights.  
The user must first highlight text, and then click the shortcut ctrl+alt+z/cmd+alt+z.  
The extension stores the api key in chrome.storage.local, and does not use it for anything except the fetch request to Google Gemini's API or save it elsewhere.  
The only time the extension accesses chrome.storage.local is to get the api key.  
