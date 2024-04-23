import { generate } from "generate-password-browser";
import bcrypt from "bcryptjs-react";
import { useState } from "react";
import { toast } from "react-toastify";
function App() {
    const [hash, setHash] = useState();
    const [error, setError] = useState("");

    const genPass = () => {
        var password = generate({
            length: 10,
            numbers: true,
            symbols: true,
        });

        bcrypt.genSalt(14, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    return setError("There seems to be an issue, please try again");
                }
                setHash(hash);
            });
        });
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(hash);

        toast.success("copied");
    };

    return (
        <main>
            <h1>Instantly generate a secure, random password with this online tool</h1>

            <section id="generatedPassword">
                <p
                    id="passwordText"
                    style={{
                        padding: `${hash ? "20px 16px" : null}`,
                        border: `${hash ? "1px solid silver" : null}`,
                        borderRadius: `${hash ? "4px" : null}`,
                    }}
                    onClick={() => copyToClipBoard()}
                >
                    {hash ? hash : error ? error : null}
                </p>
            </section>

            <button onClick={() => genPass()}>generate my password</button>
        </main>
    );
}

export default App;
