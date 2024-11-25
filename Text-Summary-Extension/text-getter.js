document.addEventListener("keyup", function(event) {
	if (!((event.ctrlKey || event.metaKey) && event.altKey && event.key === 'z')) 
		return;
	
	event.preventDefault();
	
	const selectedText = window.getSelection().toString();
	
	if (!selectedText)
		return;
	
	chrome.runtime.sendMessage({"type": "text-getter-selected-text", "data": selectedText}, (response) => {
		if (document.getElementById("iooigashoW$#Gdgsx-botdiv-textsummarydiv")){
			document.getElementById("iooigashoW$#Gdgsx-botdiv-textsummarydiv").innerHTML = response.data;
		}
		else{
			const div = document.createElement("div");
			const topdiv = document.createElement("div");
			const botdiv = document.createElement("div");
			const btn = document.createElement("button");
			const title = document.createElement("p");

			div.style = "position:fixed; top:50px; right:0px; width:25em; max-width:25em; height:25em; overflow:auto; z-index:999; background-color:white; border:3px black solid;"
			div.id = "iooigashoW$#Gdgsx-botdiv-textsummarybigdiv";
			
			topdiv.innerHTML = "Text Summarizer";
			topdiv.style = "position:absolute; top:0px; width:100%; background-color:black; color:white; font-weight:bold; padding-left:2%";
			topdiv.id = "iooigashoW$#Gdgsx-botdiv-textsummaryheaderdiv";
			
			botdiv.innerHTML = response.data;
			botdiv.style = "position:absolute; top:20px; width:97%; white-space: normal; overflow-x:hidden; word-wrap: break-word; padding-left:2%";
			botdiv.id = "iooigashoW$#Gdgsx-botdiv-textsummarydiv";

			btn.innerHTML = "X";
			btn.style = "position:absolute; top:0px; right:0px; background:red; width:1.2em; height:1.2em; text-align:center; padding:0;";
			btn.addEventListener("click", (evt) => {div.remove();});

			topdiv.appendChild(btn);

			div.appendChild(topdiv);
			div.appendChild(botdiv);

			document.body.appendChild(div);
			
			textSummarizerDragElement(div);
		}
	});
});

function textSummarizerDragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	document.getElementById("iooigashoW$#Gdgsx-botdiv-textsummaryheaderdiv").onmousedown = textSummarizerDragMouseDown;

	function textSummarizerDragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = textSummarizerCloseDragElement;
		document.onmousemove = textSummarizerElementDrag;
	}

	function textSummarizerElementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function textSummarizerCloseDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}