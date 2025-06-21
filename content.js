function createDownloadButton(type) {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             height="18" viewBox="0 0 24 24" width="18" 
             fill="currentColor" style="margin-right: 6px;">
            <path d="M5 20h14v-2H5v2zM13 4h-2v8H8l4 4 4-4h-3V4z"/>
        </svg>
        Download ${type.toUpperCase()}
    `;
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.gap = "6px";
    btn.style.padding = "8px 14px";
    btn.style.margin = "6px 4px";
    btn.style.background = "#0f9d58";
    btn.style.color = "white";
    btn.style.fontWeight = "bold";
    btn.style.border = "none";
    btn.style.borderRadius = "20px";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.3s ease";

    btn.onmouseover = () => btn.style.background = "#0c7c46";
    btn.onmouseout = () => btn.style.background = "#0f9d58";

    btn.onclick = () => {
        const videoUrl = window.location.href;
        const downloadUrl = `http://localhost:8080/download?url=${encodeURIComponent(videoUrl)}&type=${type}`;
        window.open(downloadUrl, "_blank");
    };
    return btn;
}

function insertButtons() {
    if (document.getElementById("yt-download-buttons")) return;

    const container = document.querySelector("#top-level-buttons-computed");
    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.id = "yt-download-buttons";
    wrapper.style.display = "flex";

    wrapper.appendChild(createDownloadButton("mp4"));
    wrapper.appendChild(createDownloadButton("mp3"));

    container.appendChild(wrapper);
}

const observer = new MutationObserver(() => {
    insertButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener("yt-navigate-finish", () => {
    setTimeout(insertButtons, 1000);
});
