<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404 - Page Not Found</title>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1c1c1c);
        background-size: 400% 400%;
        animation: gradientMove 10s ease infinite;
        color: white;
    }

    @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .container {
        text-align: center;
        animation: fadeIn 1.2s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .robot {
        width: 180px;
        margin-bottom: 20px;
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }

    h1 {
        font-size: 5rem;
        margin-bottom: 10px;
        letter-spacing: 2px;
    }

    p {
        font-size: 1.2rem;
        opacity: 0.8;
        margin-bottom: 25px;
    }

    a {
        text-decoration: none;
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        background: linear-gradient(45deg, #ff416c, #ff4b2b);
        transition: 0.3s ease;
        display: inline-block;
    }

    a:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
</style>
</head>

<body>
    <div class="container">
        
        <!-- Broken Robot SVG -->
        <img class="robot" src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="Broken Robot">

        <h1>404</h1>
        <p>Oops... this page is lost in space 🤖</p>
        <a href="/">Go Home</a>

    </div>
</body>
</html>