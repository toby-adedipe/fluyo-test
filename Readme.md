# Fluyo Coding Test Submission

This is my submission for the coding test, showcasing my proficiency in using React Native (Expo), TypeScript, and Firebase Firestore. Below you will find information about the tech stack I used and a description of the Firestore schema for storing quiz exercises.

## Tech Stack

- **React Native (Expo):** The application is built using React Native, utilizing the Expo framework for rapid development.

- **TypeScript:** TypeScript is used to bring type safety to the application, ensuring a more robust codebase.

- **Firebase Firestore:** Firestore is used as the backend database to store and retrieve quiz exercises.

## Firestore Schema

### Collection Name: `quizexercises`

The Firestore schema for storing quiz exercises consists of a collection named `quizexercises` where each exercise is stored as a separate document with a unique name.

### Document Names: `1` through `5`

Each exercise is stored in a document with a name corresponding to its unique identifier (`id`). For example, the exercise with `id` equal to `1` is stored in a document named `1`.

### Data Structure

Each document in the collection follows this data structure:

```json
{
  "id": 1,
  "englishSentence": "The cat is black",
  "highlightedWord": "cat",
  "germanSentence": "Die ____ ist schwarz.",
  "options": ["Katze", "Hund", "Vogel", "Fisch"],
  "correctAnswer": "Katze"
}
```

- `id`: A unique identifier for the exercise.
- `englishSentence`: The complete English sentence.
- `highlightedWord`: The word in the English sentence that needs to be translated.
- `germanSentence`: The German sentence with a blank space where the noun is missing.
- `options`: An array of possible nouns to fill in the blank.
- `correctAnswer`: The correct noun that completes the sentence.

This schema allows for efficient storage and retrieval of quiz exercises in the application.

---

This README provides an overview of the technologies used and the Firestore schema employed in the coding test submission. If you have any questions or need further details, please feel free to reach out.

Thank you for considering my submission.
