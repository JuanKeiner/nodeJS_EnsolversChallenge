
# Ensolvers implementation exercise
## Set up
- Clone the repository.
- Download and install latest [Node-js](https://nodejs.org/es/download/) version (18.14.0).
- Download and install latest [PostgreSQL](https://www.postgresql.org/download/) version (15.2).
  - During installation you will be asked to set a password for the default postgres user, this password will be requested when running index.js.

## Start the server
- Open a terminal.
- Navigate to the /.../Backend/src/ folder.
- Run:

    ```
    node index.js
    ```
    - OR
- If you are on windows there is a .bat file to open the server.
    
### Then
- Enter postgres user information.
    - "Database owner name (default: postgres):" press enter to set user=postgres.
    - "User password:" enter the password specified in the installation process.
- The message "Server is listening http://localhost:4000 !" will appear if the application started successfully.

---
---

## Webpage

- Follow this link: http://localhost:4000/


---
---


### Notes
 - This application is separated into two folders "Backend" and "Frontend".
   - Inside the Backend folder is a Node.js project that uses Express.js to open a server that responds to calls from the Frontend part.
   - The application creates a PostgreSQL database and manages it through an ORM (sequelize).
   - The Frontend uses Bootstrap for page layout, so it's also responsive.
 - With this application you can:
   - Create, Edit, Delete and Archive notes.
   - List your active notes and your archived notes.
 - There is a login button through which you could have been able to log in, but that part of the application is not finished. You can actually find unused code linking each user to their notes in the database and creating an admin user "admin/admin".
