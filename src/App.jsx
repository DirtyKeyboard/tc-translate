import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
    const [result, setResult] = useState("");
    const [input, setInput] = useState({ text: "", target_language: "es" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.text.length === 0) {
            toast.error("Please enter a sentence to be translated.");
        } else {
            const encodedParams = new URLSearchParams();
            encodedParams.set("source_language", "auto");
            encodedParams.set("target_language", input.target_language);
            encodedParams.set("text", input.text);
            const options = {
                method: "POST",
                url: "https://long-translator.p.rapidapi.com/translate",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key":
                        "9e0c0ccf07msh5034fcd9c9e8340p12555cjsn516087d377c1",
                    "X-RapidAPI-Host": "long-translator.p.rapidapi.com",
                },
                data: encodedParams,
            };

            try {
                const response = await axios.request(options);
                setResult(response.data.data.translatedText);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    return (
        <>
            <ToastContainer />
            <section className="flex flex-col items-center justify-center bg-[#499cd3] min-h-[30vh] gap-2">
                <h1 className="text-white font-bold text-2xl">
                    What sentance would you like to translate?
                </h1>
                <form
                    className="flex flex-col items-center justify-center gap-2"
                    onSubmit={handleSubmit}
                >
                    <textarea
                        type="text"
                        placeholder="Translate..."
                        className="h-32 w-[50vw] p-2 text-xl resize-none"
                        value={input.text}
                        onChange={(e) =>
                            setInput({ ...input, text: e.target.value })
                        }
                        wrap="true"
                    />
                    <div className="flex gap-2">
                        <h1 className="text-white font-bold">Translate to:</h1>
                        <select
                            onChange={(e) => {
                                setInput({
                                    ...input,
                                    target_language: e.target.value,
                                });
                            }}
                        >
                            <option value="es">Spanish</option>
                            <option value="zh">Chinese</option>
                            <option value="hi">Hindi</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="ar">Arabic</option>
                            <option value="bn">Bengali</option>
                            <option value="ru">Russian</option>
                            <option value="pt">Portuguese</option>
                            <option value="ur">Urdu</option>
                            <option value="de">German</option>
                            <option value="ja">Japanese</option>
                        </select>
                    </div>
                    <input
                        type="button"
                        value="Translate"
                        className="bg-[#292929] text-white px-4 py-2 rounded-3xl hover:cursor-pointer hover:bg-[#585858] translate-all ease-in-out duration-200 hover:translate-y-1"
                        onClick={handleSubmit}
                    />
                </form>
            </section>
            <section className="relative flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <div className="custom-shape-divider-top-1710200736 m-">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </div>
                <h1 className="text-xl text-white font-bold">Translation:</h1>
                {result.length > 0 ? (
                    <p className="bg-[#499cd3] rounded-xl text-white font-bold py-4 px-32 mx-32">
                        {result}
                    </p>
                ) : null}
            </section>
        </>
    );
}

export default App;
