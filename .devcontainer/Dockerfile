# Use official Node.js image with bash
FROM node:18

# Create app directory
WORKDIR /app

# Set permissions for Node user
RUN chown -R node:node /app

# Use the node user from now on
USER node

# Default command
CMD ["npm", "run", "dev"]
