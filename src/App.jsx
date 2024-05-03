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
            strict: true,
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

    const writeToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(hash);
        } catch (error) {
            new Error("Unable to copy to clipboard, please try again");
        } finally {
            toast.success("copied", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                newestOnTop: true,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: false,
                pauseOnHover: false,
                theme: "light",
            });
        }
    };

    return (
        <>
            <header className="flex justify-start items-center px-5 w-full min-h-20">
                <p className="block w-fit h-fit text-xl">GenPass</p>
            </header>
            <main>
                <h1 className="text-2xl font-bold">
                    Instantly generate a secure, random password with this online tool
                </h1>

                <section
                    id="generatedPasswordContainer"
                    className="flex justify-center items-center flex-col gap-y-4 h-full mt-9"
                >
                    <span
                        id="generatePasswordValue"
                        className="flex justify-center items-center min-w-[575px] min-h-16 px-5 rounded border border-gray-200"
                        onClick={() => writeToClipboard()}
                    >
                        <p>{hash ? hash : error ? error : null}</p>
                    </span>
                    <button onClick={() => genPass()}>generate my secure password</button>
                </section>

                <p>
                    Don`t share a password with anyone. Not even a friend or family member. - Never
                    send a password by email, instant message, or any other means of communication
                    that is not reliably secure. - Use a unique password for each website. If crooks
                    steal your account information from one site, theyll try to use those
                    credentials on hundreds of other well-known websites, such as banking, social
                    media, or online shopping, hoping you`ve reused the password elsewhere. That`s
                    called a Credential stuffing attack and it`s extremely common. - If you don`t
                    want to memorize multiple passwords, consider using a password manager. The best
                    password managers will automatically update stored passwords, keep them
                    encrypted, and require multi-factor authentication for access. Microsoft Edge
                    can remember your passwords for you and automatically fill them in for you when
                    needed. See Save or forget passwords in Microsoft Edge. - It`s ok to write your
                    passwords down, as long as you keep them secure. Don`t write them on sticky
                    notes or cards that you keep near the thing the password protects, even if you
                    think they`re well-hidden.
                </p>
            </main>
        </>
    );
}

export default App;
