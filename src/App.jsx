import { generate } from "generate-password-browser";
import bcrypt from "bcryptjs-react";
import { useState } from "react";
import {Button} from 'react-aria-components';
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

    return (
        <main>
            <h1>
                Generate a <span>free</span> secure password
            </h1>

            <Button onPress={() => genPass()}>generate</Button>
        </main>
    );
}

export default App;
