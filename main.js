import {help, aboutme} from "./commands.js";

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal");

    function createPrompt() {
        const promptDiv = document.createElement("div");
        promptDiv.className = "prompt-line";

        promptDiv.innerHTML = `
            <div class="flexbox">
                <span style="color: palegreen;">guest</span>
                <span style="color: yellowgreen;">@</span>
                <span style="color: ghostwhite;">ckuudee.com</span>
                <span style="color: lightblue;">:~$</span>
                <input type="text" class="input" id="prompt" autocomplete="off" autofocus>
            </div>
        `;

        terminal.appendChild(promptDiv);
        const inputField = promptDiv.querySelector(".input");

        inputField.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const input = inputField.value.trim();
                if (input !== "") {
                    handleCommand(input, promptDiv);
                }
                inputField.disabled = true;
                inputField.classList.remove("input");
                inputField.classList.add("completed-input");
                createPrompt();
            }
        });

        inputField.focus();
        scrollToCurrentInput();
    }

    function handleCommand(input, promptDiv) {
        const command = input.toLowerCase();
        const output = document.createElement("div");
        output.className = "output";

        switch (command) {
            case "help":
                output.innerHTML = help;
                break;
            case "aboutme":
                output.innerHTML = aboutme;
                break;
            default:
                output.textContent = `${command}: command not found`;
        }

        promptDiv.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function scrollToCurrentInput() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    createPrompt();
});
