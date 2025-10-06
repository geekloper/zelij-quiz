# 🇲🇦 Zelij Quiz

Zelij Quiz is an interactive self-assessment quiz designed to help users compare their perception of Morocco's national performance with the facts established by globally recognized composite indices (HDI, Corruption Perception Index, Global Competitiveness Report, etc.).

The core goal is simple: to foster factual awareness by challenging personal estimates (often biased by patriotic overestimation) against objective, sourced, and up-to-date international data.

## 🚀 Key Features

- 100% Client-Side & No-Data Policy: The entire quiz is implemented using only HTML, CSS, and JavaScript. No data is collected, stored, or transmitted to any server. Your anonymity is fully guaranteed.

- Immediate Confrontation: The source of the correct factual answer is revealed after every question to ensure instant, factual learning and combat misinformation.

- Open Source & Auditable: The code is completely transparent, allowing anyone to audit the sources and data used in the test.

## ✨ Nice-to-Have

- [ ] More Questions: Expanding the question bank to cover more domains and indices.

- [ ] Question Randomization & Limitation: Implementing logic to randomly select a subset of questions (e.g., 7 out of 20 total) for each test session.

## 🛠 Project Structure

The application consists of a single HTML file and its embedded assets (CSS and JS). Hard-coded question data are in Yaml format (`src/i18n.yaml`)

## 💡 How to Run Locally

Clone the repository:

```bash
  git clone https://github.com/geekloper/zelij-quiz.git
```

Then use npm/pnpm/.. to install dependencies & run it locally:

```bash
  pnpm i
  pnpm run dev
```

## 🤝 How to Contribute

This project relies on accurate and up-to-date information. Contributions are highly welcome, especially for:

- Data Updates: Integrating the latest ranks and scores from international indices (Please cite the source and year).

- UI/UX Improvements: Enhancing the user interface for a smoother, more engaging experience.

**Reporting Misinformation:** If you identify any potential misinformation in the sources or question data, please open a new Issue immediately so it can be reviewed and corrected.

To contribute, please fork the repository, make your modifications primarily within `src/i18n.yaml` (where the questions and facts are stored), and submit a Pull Request.
