import Footer from "../../components/Footer";

function dashLayout({ children }) {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                "min-height": "100vh",
                "flex-direction": "column",
                "align-Items": "center",
            }}
        >
            {children}

            <Footer />
        </div>
    );
}

export default dashLayout;
