## Agentic Bias Checkpoint Auditor

- **Problem:** Bias in ML systems is often detected only at the final output, making it hard to identify where in the pipeline it was introduced.
- **What I built:** A multi-agent forensic system with an orchestrator that coordinates specialized agents to trace bias across data, feature engineering, and model stages, with full execution observability and an interactive dashboard.
- **Tech:** Python, FastAPI, Streamlit, scikit-learn, Google Gemini API
- **Code:** [Bias_auditor](https://github.com/Sneha-a10/Bias_auditor)

## Neural Image Captioning Pipeline

- **Problem:** Understanding and indexing image content is difficult without descriptive metadata, limiting accessibility and automation for visually impaired users and search systems.
- **What I built:** An end-to-end image captioning pipeline involving image and text preprocessing, tokenizer design, DenseNet201-based feature extraction, and an LSTM sequence generation model, with performance evaluated using BLEU scores.
- **Tech:** TensorFlow/Keras, Pandas, NumPy, NLTK, Matplotlib
- **Code:** [Image_captioning](https://github.com/Sneha-a10/Image_captioning)

## Furniture Blueprint Generator

- **Problem:** Furniture design is often manual and time-consuming, limiting rapid prototyping and accessibility for non-designers.
- **What I built:** A conditional generative system that produces furniture blueprint images from textual descriptions using a hybrid CVAE architecture with skip connections, including data preprocessing, evaluation of multiple generative architectures, training, and comparative analysis.
- **Tech:** TensorFlow/Keras, Python, Sentence-Transformers, NumPy, OpenCV
- **Code:** [furniture_blueprint](https://github.com/Sneha-a10/furniture_blueprint)
