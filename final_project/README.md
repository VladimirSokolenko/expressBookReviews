# Practice-Project


# CURL
List of books
curl.exe "localhost:5000/"

Log in
always exists
curl.exe "localhost:5000/customer/auth/?username=admin&password=1111"
new user on customer/auth
curl.exe "localhost:5000/customer/auth/?username=Vlad&password=pwd123"
on customer/login
curl.exe -X POST "localhost:5000/customer/login?username=admin&password=1111"

User registration
curl.exe -X POST "localhost:5000/register?username=Vlad&password=pwd123"

List of all books
curl.exe "localhost:5000/"

Book by isbn
curl.exe "localhost:5000/isbn/2"

Book by author
curl.exe "localhost:5000/author/Hans%20Christian%20Andersen"

Book by title
curl.exe "localhost:5000/title/The%20Divine%20Comedy"

Book review by isbn
curl.exe "localhost:5000/review/4"