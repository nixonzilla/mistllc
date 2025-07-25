{
  "name": "MISTLLC DevContainer",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "settings": {
    "terminal.integrated.defaultProfile.linux": "bash"
  },
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ],
  "forwardPorts": [5173],
  "postCreateCommand": "npm install",
  "remoteUser": "node"
}
