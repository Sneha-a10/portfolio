# Agentic Bias Checkpoint Auditor

## Problem
Bias in ML systems is often detected only at the final output, making it hard to identify where in the pipeline it was introduced.

## What I Built
A multi-agent forensic system with an orchestrator that coordinates specialized agents to trace bias across data, feature engineering, and model stages, with full execution observability and an interactive dashboard.

## How It Works
The system uses an orchestrator to manage specialized agents. These agents analyze different stages of the ML pipeline (data, features, model). It provides valid execution traces and visualizes findings on a dashboard.

## Tech Stack
- Python
- FastAPI
- Streamlit
- scikit-learn
- Google Gemini API

## Links
- GitHub: https://github.com/Sneha-a10/Bias_auditor
- Demo:
