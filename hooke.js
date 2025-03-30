import { useState } from "react";

const useLangFlowAPI = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (inputValue) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://172.19.0.1:7860/api/v1/run/ac325ffc-2462-42ff-aa33-292f0c33b66b?stream=false",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-hUK8esEVoCbgrs1JLIW9a2UmYakz-Tg6xfTapYpyL3k",
          },
          body: JSON.stringify({
            input_value: inputValue,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "Agent-2KW2O": {},
              "ChatInput-6v3mV": {},
              "PythonFunction-FcmS4": {},
              "PythonFunction-T0TgC": {},
              "NVIDIAEmbeddingsComponent-JJW34": {},
              "Chroma-ujg9M": {},
              "ChatOutput-uuXRz": {},
            },
          }),
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Erro ao conectar à API");
    }

    setLoading(false);
  };

  return { response, loading, error, fetchData };
};

export default useLangFlowAPI;
