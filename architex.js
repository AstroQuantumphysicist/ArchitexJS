/**
 * ==============================================================
 * 🌆 ARCHITEX.JS - The Library for Architectural Web Designs 🏛️
 * ==============================================================
 * 
 * Architex.js is a specialized Web Component library that enables
 * the creation of websites that resemble real building facades. 
 * By combining `image-wall`, `image-window`, `image-column`, and 
 * `image-object`, users can design structures inspired by buildings, 
 * castles, or other architectural facades.
 * 
 * 🏗️ Features:
 * - 🔲 `image-wall`: Creates a repeating texture wall
 * - 🏠 `image-window`: Adds a window with an overlaying frame
 * - 🏛️ `image-column`: Generates a scalable architectural column
 * - 🖼️ `image-object`: Places a decorative object with fixed aspect ratio
 * 
 * ⚡ Usage:
 * 1. Include `Architex.js` in your HTML.
 * 2. Use the custom elements to build your own "building facade"!
 * 
 * Example:
 * ```html
 * <image-wall src="brick-texture.jpg" width="800" height="600">
 *     <image-window background="window.jpg" frame="frame.png" width="200" height="200" style="position: absolute; top: 100px; left: 200px;"></image-window>
 *     <image-column src="column.png" width="80" height="300" style="position: absolute; bottom: 0px; right: 100px;"></image-column>
 *     <image-object src="logo.png" width="100" height="100" style="position: absolute; top: 50px; left: 50px;"></image-object>
 * </image-wall>
 * ```
 * 
 * 🌟 Get creative and design your own virtual architecture with Architex.js!
 * 
 * Developed by: Lino Brendler 🚀
 * License: MIT (Open Source, Free to Use and Modify)
 */

class ImageWall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.wrapper = document.createElement("div");
        this.wrapper.style.position = "relative";
        this.wrapper.style.display = "inline-block";
        this.wrapper.style.overflow = "hidden";

        this.wallImage = document.createElement("div");
        this.wallImage.style.position = "absolute";
        this.wallImage.style.top = "0";
        this.wallImage.style.left = "0";
        this.wallImage.style.width = "100%";
        this.wallImage.style.height = "100%";
        this.wallImage.style.backgroundImage = `url(${this.getAttribute("src")})`;
        this.wallImage.style.backgroundRepeat = "repeat";
        this.wallImage.style.backgroundSize = "auto";
        this.wallImage.style.backgroundPosition = "center";

        this.width = this.getAttribute("width") || "500";
        this.height = this.getAttribute("height") || "500";

        this.wrapper.style.width = `${this.width}px`;
        this.wrapper.style.height = `${this.height}px`;

        this.slotContainer = document.createElement("slot");

        this.wrapper.appendChild(this.wallImage);
        this.wrapper.appendChild(this.slotContainer);
        this.shadowRoot.appendChild(this.wrapper);
    }
}
customElements.define("image-wall", ImageWall);

class ImageWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.canvas = document.createElement("canvas");
        this.shadowRoot.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.imgBackground = new Image();
        this.imgFrame = new Image();

        this.imgBackground.src = this.getAttribute("background");
        this.imgFrame.src = this.getAttribute("frame");

        this.width = this.getAttribute("width") || "300";
        this.height = this.getAttribute("height") || "300";

        this.imgBackground.onload = () => this.render();
        this.imgFrame.onload = () => this.render();
    }

    render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.drawImage(this.imgBackground, 0, 0, this.width, this.height);
        this.ctx.drawImage(this.imgFrame, 0, 0, this.width, this.height);
    }
}
customElements.define("image-window", ImageWindow);

class ImageColumn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.canvas = document.createElement("canvas");
        this.shadowRoot.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.imgColumn = new Image();
        this.imgColumn.src = this.getAttribute("src");

        this.width = this.getAttribute("width") || "100";
        this.height = this.getAttribute("height") || "300";

        this.imgColumn.onload = () => this.render();
    }

    render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.drawImage(this.imgColumn, 0, 0, this.width, this.height);
    }
}
customElements.define("image-column", ImageColumn);

class ImageObject extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.wrapper = document.createElement("div");
        this.wrapper.style.position = "relative";
        this.wrapper.style.display = "inline-block";
        this.wrapper.style.overflow = "hidden";

        this.image = document.createElement("img");
        this.image.style.position = "absolute";
        this.image.style.top = "50%";
        this.image.style.left = "50%";
        this.image.style.transform = "translate(-50%, -50%)";
        this.image.style.maxWidth = "100%";
        this.image.style.maxHeight = "100%";
        this.image.style.objectFit = "contain";

        this.image.src = this.getAttribute("src");

        this.width = this.getAttribute("width") || "100";
        this.height = this.getAttribute("height") || "100";

        this.wrapper.style.width = `${this.width}px`;
        this.wrapper.style.height = `${this.height}px`;

        this.wrapper.appendChild(this.image);
        this.shadowRoot.appendChild(this.wrapper);
    }
}
customElements.define("image-object", ImageObject);
