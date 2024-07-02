# Practice-Project


# CURL
List of books
curl.exe "localhost:5000/"

Log in
always exists
curl.exe -X POST "localhost:5000/customer/login/?username=admin&password=1111"

new user
curl.exe -X POST "localhost:5000/customer/login?username=Vlad&password=pwd123"

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

Add/update review (for authorized users)
curl.exe -X PUT "localhost:5000/customer/auth/review/3?review=test%20review%20with%20spaces!"

Delete review
curl.exe -X DELETE "localhost:5000/customer/auth/review/3"