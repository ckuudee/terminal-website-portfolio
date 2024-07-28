import { help, aboutme, linkedin, youtube } from "./commands.js";

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal");
    const previousCommands = [];
    let commandIndex = -1;

    function createPrompt() {
        const promptDiv = document.createElement("div");
        promptDiv.className = "prompt-line";

        promptDiv.innerHTML = `
            <div class="flexbox">
                <span style="color: palegreen;">guest</span>
                <span style="color: yellowgreen;">@</span>
                <span style="color: ghostwhite;">ckuudee.com</span>
                <span style="color: lightblue;">:~$</span>
                <input type="text" class="input blinking-cursor" id="prompt" autocomplete="off" autofocus>
            </div>
        `;

        terminal.appendChild(promptDiv);
        const inputField = promptDiv.querySelector(".input");

        inputField.addEventListener("keydown", (event) => handleKeyDown(event, inputField, promptDiv));

        inputField.focus();
        scrollToCurrentInput();
    }

    function handleKeyDown(event, inputField, promptDiv) {
        if (event.key === "Enter") {
            handleEnterKey(inputField, promptDiv);
        } else if (event.key === "ArrowUp") {
            handleUpArrow(inputField);
        } else if (event.key === "ArrowDown") {
            handleDownArrow(inputField);
        }
    }

    function handleEnterKey(inputField, promptDiv) {
        const input = inputField.value.trim();
        if (input !== "") {
            previousCommands.push(input);
            commandIndex = previousCommands.length;
            handleCommand(input, promptDiv);
        }
        inputField.disabled = true;
        inputField.classList.remove("input");
        inputField.classList.add("completed-input");
        inputField.classList.remove("blinking-cursor");
        createPrompt();
    }

    function handleUpArrow(inputField) {
        if (previousCommands.length > 0 && commandIndex > 0) {
            commandIndex--;
            inputField.value = previousCommands[commandIndex];
        }
    }

    function handleDownArrow(inputField) {
        if (previousCommands.length > 0 && commandIndex < previousCommands.length - 1) {
            commandIndex++;
            inputField.value = previousCommands[commandIndex];
        } else {
            commandIndex = previousCommands.length;
            inputField.value = "";
        }
    }

    function handleCommand(input, promptDiv) {
        const command = input.toLowerCase();
        const output = document.createElement("div");
        output.className = "output";

        switch (command) {
            case "help":
                typeTextArray(help, output);
                break;
            case "aboutme":
                typeTextArray(aboutme, output);
                break;
            case "linkedin":
                typeText("Opening LinkedIn...", output, () => newTab(linkedin));
                break;
            case "youtube":
                typeTextArray(youtube, output);
                break;
            default:
                typeText(`${command}: command not found`, output);
        }

        promptDiv.appendChild(output);
        scrollToCurrentInput();
    }

    function typeTextArray(lines, element, speed = 20) {
        let lineIndex = 0;
        function typeLine() {
            if (lineIndex < lines.length) {
                typeText(lines[lineIndex], element, () => {
                    element.innerHTML += "<br>";
                    lineIndex++;
                    typeLine();
                }, speed);
            }
        }
        typeLine();
    }

    function typeText(text, element, callback = null, speed = 20) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function scrollToCurrentInput() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    function newTab(link) {
        setTimeout(() => {
            window.open(link, "_blank");
        }, 500);
    }

    createPrompt();
});
