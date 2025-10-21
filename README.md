# 🧠 Quiz App

A simple yet engaging quiz application built with React, **client-side routing**, and **Supabase**. It stores and fetches multiple-choice questions from a Supabase database, lets users **choose a category and difficulty**, presents questions in a clean interface, and evaluates responses. On completion, users get a tailored message based on their score.

<img src="src/images/home-page.png" alt="Quizlet select option view" width="600">

*Setup screen: Select category & difficulty, then start your quiz*

<img src="src/images/Quizlet-select-options-page.png" alt="Quizlet results select options page" width="600">
<img src="src/images/Quizlet-results-top-of-page.png" alt="Quizlet results view top of page" width="600">
<img src="src/images/Quizlet-results-bottom-of-page.png" alt="Quizlet results view bottom of page" width="600">

*Results screen: Displays score and a phrase based on the user's score*

---

## 🎯 Overview

This project helped me understand:

* React's component-based structure
* **Routing with React Router** (Home → Quiz)
* **Database integration with Supabase** for storing and querying quiz questions
* **Error handling and loading states** for better user experience
* State management using React Hooks
* Conditional rendering for UI updates
* Managing user input and scoring logic
* Modular code organization for scalability

---

## 🛠 Tech Stack

* **React** – Component-based UI
* **React Router** – Client-side routing between pages
* **Supabase** – PostgreSQL database for storing quiz questions
* **TypeScript** – Type-safe JavaScript
* **HTML5 / CSS3**
* **React Confetti** – Celebration effects
* **@supabase/supabase-js** – Supabase client library

---

## ✨ Key Features

* **Client-side routing:** `/` (Home) and `/quiz` (Quiz) via React Router
* **Configurable quiz:** Users choose **difficulty** and **category** on Home; values are read via `FormData` and sent to the Quiz page using **router state**
* **Database-powered questions:** Quiz questions are stored in Supabase and filtered by user preferences (category/difficulty)
* **Loading and error states:** Clear feedback when questions are loading or if something goes wrong, with a "Try Again" button
* **Lazy loading with `React.Suspense`:** `QuestionCard` is loaded on demand to keep initial loads snappy
* **Accessible results announcement:** A **screen reader live region** politely announces the score without stealing focus:
  ```jsx
  {/* Screen reader live region: announces result without moving focus */}
  <p className="sr-only" aria-live="polite" aria-atomic="true">
    {submitted ? `You scored ${scoreResults} out of ${numberOfQuestions}.` : ""}
  </p>
  ```
* Multiple-choice question cards with instant feedback
* Score calculation and encouragement phrases based on score
* "Play Again" fetches a fresh set of questions from the database
* Confetti celebration on completion

---

## 🧭 How It Works

* **Home → Quiz navigation:** The Home page form gathers `difficulty` and `category`, then navigates to `/quiz` with `{ filters }` in router state.
* **Database queries:** The Quiz page reads those filters and queries Supabase for matching questions:
  - Filters are applied dynamically (e.g., `.eq('difficulty', 'easy')` or `.eq('category', 'Science')`)
  - Questions are shuffled and limited to 5 per quiz
  - Answer options are randomized for each question
* **Error handling:** If the database query fails or returns no results, users see a clear error message with a "Try Again" button
* **Loading states:** While questions are being fetched, users see a loading indicator instead of an empty page

---

## ⚙️ Build & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the dev server**

   ```bash
   npm start
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

*(The starter test file is included; expand with component tests as you iterate.)*

---

## 📚 Lessons Learned

* **React Hooks:** Managing state with `useState` and lifecycle with `useEffect`
* **Database Integration:** Using Supabase to store and query data with filters
* **Error Handling:** Implementing loading states and error recovery mechanisms
* **Routing:** Splitting flows into pages and passing state via navigation
* **Component Design:** Breaking the UI into small, reusable components
* **Conditional Rendering:** Dynamic button states, correct/wrong answers, and results
* **Accessibility & UX:** Focus management, live announcements, and smooth scrolling

---

## 🧩 Areas for Improvement

* Add more mobile-responsive refinements
* Expand unit tests for all components
* Improve accessibility (labels, focus styles, ARIA roles)
* Add user authentication to track individual scores
* Create an admin interface for managing quiz questions

---

## 🚀 Future Enhancements

* **Leaderboard** for top scores stored in Supabase
* **User profiles** with authentication to track quiz history
* **Theme customization** (dark/light mode)
* **Admin dashboard** for adding/editing questions
* **More question categories** and customizable quiz lengths
* **Timed quizzes** with countdown functionality

---

## 🧭 Project Structure (excerpt)

* `src/pages/Home.tsx` – Form for category/difficulty; navigates with router state.
* `src/pages/QuizPage.tsx` – Queries Supabase with filters; renders questions & results with loading/error states.
* `src/App.tsx` – App routes (`/`, `/quiz`).
* `src/lib/supabase.ts` – Supabase client configuration.
* `src/components/` – Reusable UI components (Nav, Button, QuestionCard, ProgressBar, ResultsSection).

---

## 🗄️ Database Schema

The app uses a `quiz_questions` table in Supabase:

```sql
CREATE TABLE quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text DEFAULT 'General Knowledge',
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);
```

### Security

* **Row Level Security (RLS)** is enabled with public read access for quiz functionality
* Users can read questions but cannot modify them
* Questions are pre-seeded with 25+ trivia questions across various categories (Geography, History, Science, Art, Technology, Mathematics, Literature, Sports, Food)

### Sample Questions

The database includes questions like:
- "What is the capital of France?" (Geography, Easy)
- "Who developed the theory of relativity?" (Science, Medium)
- "What does HTML stand for?" (Technology, Medium)
- And many more across different categories and difficulty levels

---

## 🔄 Recent Changes

### Migration from External API to Supabase

The app was updated to resolve rate limiting issues with the Open Trivia DB API:

1. **Created Supabase database table** to store quiz questions locally
2. **Seeded database** with 25 diverse quiz questions
3. **Updated QuizPage component** to query Supabase instead of external API
4. **Added robust error handling** with loading states and retry functionality
5. **Improved user experience** with clear feedback during loading and errors

**Benefits:**
- No more rate limit errors
- Faster question loading
- Full control over question content
- Ability to easily add/edit questions
- More reliable and consistent performance

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
