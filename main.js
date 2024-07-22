import { help, aboutme } from "./commands.js";

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
                <input type="text" class="input" id="prompt" autocomplete="off" autofocus>
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
                output.innerHTML = help;
                break;
            case "aboutme":
                output.innerHTML = aboutme;
                break;
            case "linkedin":
                openTab("https://www.linkedin.com/in/codyhoang/");
                break;
            default:
                output.textContent = `${command}: command not found`;
        }

        promptDiv.appendChild(output);
        scrollToCurrentInput();
    }

    function scrollToCurrentInput() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    function openTab(link) {
        window.open(link);
    }

    createPrompt();
});
