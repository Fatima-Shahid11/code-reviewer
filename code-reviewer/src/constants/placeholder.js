export const PLACEHOLDER_CODE = `// Paste your code here for AI-powered review
// Supports: JavaScript, Python, Java, C++, Go, Rust, and more!

function fetchUserData(userId) {
    var query = "SELECT * FROM users WHERE id = " + userId;
    
    return database.execute(query)
        .then(function(result) {
            console.log("User data:", result);
            return result;
        })
        .catch(function(error) {
            console.log(error);
        });
}`;
