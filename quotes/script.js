/**
 * script.js — Rendering + Interaction Layer
 */

const container = document.getElementById("quoteContainer");

function renderQuotes(list = quotes) {

    container.innerHTML = "";

    list.forEach(q => {

        const wrapper = document.createElement("div");
        wrapper.className = "quote-wrapper";

        const card = document.createElement("div");
        card.className = "quote";

        /* Quote Text Container */

        const quoteText = document.createElement("p");
        quoteText.className = "quote-text";

        if (q.original) {
            quoteText.textContent = q.text;

            card.dataset.original = q.original;
            card.dataset.translation = q.text;
            card.dataset.showOriginal = "false";
        } else {
            quoteText.textContent = q.text;
        }

        card.appendChild(quoteText);

        /* Footer (Author + Controls) */

        if (q.author) {

            const footer = document.createElement("div");
            footer.className = "author";

            let footerText = "— " + q.author;

            if (q.work) footerText += ", " + q.work;

            footer.textContent = footerText;

            const controlGroup = document.createElement("span");
            controlGroup.style.marginLeft = "10px";

            /* Language Toggle */

            if (q.original) {

                const langToggle = document.createElement("button");
                langToggle.className = "marginalia-toggle";
                langToggle.textContent = "[↔] original";

                langToggle.onclick = () => {

                    const showingOriginal =
                        card.dataset.showOriginal === "true";

                    const switchText = (newText, toggleLabel, newState) => {

                        quoteText.classList.add("fade-out");

                        setTimeout(() => {

                            quoteText.textContent = newText;

                            quoteText.classList.remove("fade-out");
                            quoteText.classList.add("fade-in");

                            setTimeout(() => {
                                quoteText.classList.remove("fade-in");
                            }, 220);

                        }, 180);

                        langToggle.textContent = toggleLabel;
                        card.dataset.showOriginal = newState;
                    };

                    if (showingOriginal) {
                        switchText(
                            card.dataset.translation,
                            "[↔] original",
                            "false"
                        );
                    } else {
                        switchText(
                            card.dataset.original,
                            "[↔] English",
                            "true"
                        );
                    }
                };

                controlGroup.appendChild(langToggle);
            }

            /* Separator + Marginalia Toggle */

            if (q.comment) {

                const separator = document.createElement("span");
                separator.textContent = " | ";
                separator.style.opacity = "0.4";

                controlGroup.appendChild(separator);

                const toggle = document.createElement("button");
                toggle.className = "marginalia-toggle";
                toggle.textContent = "[+] note";

                toggle.onclick = () => {
                    wrapper.classList.toggle("show-comment");

                    toggle.textContent =
                        wrapper.classList.contains("show-comment")
                            ? "[-] note"
                            : "[+] note";
                };

                controlGroup.appendChild(toggle);
            }

            footer.appendChild(controlGroup);
            card.appendChild(footer);
        }

        /* Tags */

        if (q.tags) {
            const tags = document.createElement("div");
            tags.className = "tags";
            tags.textContent = q.tags.join(" ");
            card.appendChild(tags);
        }

        /* Source Link */

        if (q.source) {
            const source = document.createElement("a");
            source.className = "source-link";
            source.href = q.source;
            source.target = "_blank";
            source.textContent = "Source";
            card.appendChild(source);
        }

        wrapper.appendChild(card);

        /* Side Comment Panel */

        if (q.comment) {
            const comment = document.createElement("div");
            comment.className = "side-comment";
            comment.innerText = q.comment;
            wrapper.appendChild(comment);
        }

        container.appendChild(wrapper);
    });
}

/* Search Filtering */

document.getElementById("searchInput").addEventListener("input", e => {

    const query = e.target.value.toLowerCase();

    const filtered = quotes.filter(q =>
        (q.text && q.text.toLowerCase().includes(query)) ||
        (q.original && q.original.toLowerCase().includes(query)) ||
        (q.author && q.author.toLowerCase().includes(query)) ||
        (q.tags && q.tags.join(" ").toLowerCase().includes(query))
    );

    renderQuotes(filtered);
});

/* Theme Switching — Smooth Morph Engine */

function setTheme(theme) {

    const body = document.body;

    const themes = ["cyber", "foucault"];

    themes.forEach(t => body.classList.remove(t));

    /* Reflow to stabilize transition perception */
    void body.offsetWidth;

    if (theme) body.classList.add(theme);
}

/* Initial Render */

renderQuotes();