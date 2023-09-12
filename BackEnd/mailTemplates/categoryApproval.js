exports.categoryApproval = (name, categoryName) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotionprod.vercel.app/"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Category Creation Request Declined</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your Request for creating category <span class="highlight">${categoryName}</span> was declined.
                </p>
                <p>If you want to know the reason, please contact the admin.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};