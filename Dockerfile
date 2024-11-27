# Step 1: Use an official Node.js runtime (Node 12) as the build stage
FROM node:12 AS build

# Step 2: Set the working directory in the container
WORKDIR /home/team/student

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install Angular CLI v9.1.15 globally
RUN npm install -g @angular/cli@9.1.15

# Step 5: Install project dependencies while ignoring peer dependency issues
RUN npm install --legacy-peer-deps

# Step 6: Copy the rest of the application code
COPY ./ .

# Step 7: Build the Angular application for production
RUN npm run build --prod

# Step 8: Use an official Nginx runtime to serve the Angular app
FROM nginx:latest

# Step 9: Copy the Angular build output to Nginx's default serving directory
COPY --from=build /home/team/student/dist/student /usr/share/nginx/html

# Step 10: Expose port 80 to allow traffic to the container
EXPOSE 80

# Step 11: Start Nginx
CMD ["nginx", "-g", "daemon off;"]

