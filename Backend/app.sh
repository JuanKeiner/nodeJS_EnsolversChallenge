
# set the database name and username
DB_NAME="notesdatabase"
DB_USER="notesowner"
DB_PASS="admin"

# create the database
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;" && echo "Database created successfully."

# create a user and grant privileges to the database
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD $DB_PASS;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" && echo "Privileges granted successfully."