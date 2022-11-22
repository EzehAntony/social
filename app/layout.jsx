import "../styles/globals.css";

function RootLayout({ children }) {
    return (
        <html>
            <head>
                <body style={{ margin: 0, padding: 0 }}>{children}</body>
            </head>
        </html>
    );
}

export default RootLayout;
