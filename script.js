const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command');

let packages = {}; // This variable will hold your package list

// Fetch the package list from GitHub
async function fetchPackages() {
    const response = await fetch('https://raw.githubusercontent.com/yourusername/TFS-repo/main/packages.json');
    packages = await response.json();
}

// Initialize the application
fetchPackages().then(() => {
    commandInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            executeCommand(command);
            commandInput.value = '';
        }
    });
});

// Command execution logic
function executeCommand(command) {
    const output = document.createElement('div');
    terminal.appendChild(output);

    if (command === 'apt update') {
        output.textContent = 'Updating package lists...';
        // Logic for updating package lists can be implemented here
    } else if (command === 'apt upgrade') {
        output.textContent = 'Upgrading packages...';
        // Logic for upgrading packages can be implemented here
    } else if (command.startsWith('apt install ')) {
        const packageName = command.split(' ')[2];
        if (packages[packageName]) {
            output.textContent = `Installing ${packageName}...`;
        } else {
            output.textContent = `Package ${packageName} not found.`;
        }
    } else if (command.startsWith('run ')) {
        const packageName = command.split(' ')[1];
        if (packages[packageName]) {
            output.textContent = `Running ${packageName}...`;
            runPackage(packageName);
        } else {
            output.textContent = `Package ${packageName} not found.`;
        }
    } else if (command.startsWith('echo ')) {
        const message = command.slice(5);
        output.textContent = message; // Simply echo the message
    } else if (command === 'clear') {
        terminal.innerHTML = ''; // Clear the terminal
    } else if (command === 'help') {
        output.textContent = 'Available commands: apt update, apt upgrade, apt install <package>, run <package>, echo <message>, clear, help';
    } else {
        output.textContent = `Command not found: ${command}`;
    }

    terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the bottom
}

// Function to run the specific package
function runPackage(packageName) {
    if (packageName.endsWith('.html')) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://raw.githubusercontent.com/yourusername/TFS-repo/main/${packageName}`;
        iframe.style.width = '100%';
        iframe.style.height = '600px'; // Adjust height as needed
        terminal.appendChild(iframe);
    } else if (packageName.endsWith('.tl') || packageName.endsWith('.js')) {
        // Logic to run TFS Lang or JavaScript
        output.textContent += ` (Execution logic for ${packageName} is not implemented)`;
    }
}
