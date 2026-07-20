class LLMService {
  constructor() {
    this.provider = "gemini";
    this.model = "gemini-2.5-flash";
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }

  async generate(prompt) {
    try {
      switch (this.provider) {
        case "gemini":
          return await this.callGemini(prompt);

        default:
          throw new Error(
            `Unsupported provider: ${this.provider}`
          );
      }
    } catch (error) {
      console.error(
        "LLM Error:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async callGemini(prompt) {
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Gemini request failed."
      );
    }

    const json =
      await response.json();

    return {
      success: true,

      text:
        json.candidates?.[0]
          ?.content?.parts?.[0]?.text ??
        "No response.",
    };
  }

  setProvider(provider) {
    this.provider = provider;
  }

  setModel(model) {
    this.model = model;
  }
}

export default new LLMService();