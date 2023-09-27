import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExerciseModal from '../components/ExerciseModal'

export default function ExerciseScreen() {
  const [activeId, setActiveId] = useState<number>(1);
  const exercises = [
    {
      id: 1,
      englishSentence: "The cat is black",
      highlightedWord: "cat",
      germanSentence: "Die _______ ist schwarz.",
      options: ["Katze", "Hund", "Vogel", "Fisch"],
      correctAnswer: "Katze"
    },
    {
      id: 2,
      englishSentence: "The car is fast",
      highlightedWord: "car",
      germanSentence: "Das _______ ist schnell.",
      options: ["Auto", "Fahrrad", "Bus", "Zug"],
      correctAnswer: "Auto"
    },
    {
      id: 3,
      englishSentence: "The book is interesting",
      highlightedWord: "book",
      germanSentence: "Das _______ ist interessant.",
      options: ["Buch", "Zeitung", "Magazin", "Brief"],
      correctAnswer: "Buch"
    },
    {
      id: 4,
      englishSentence: "The dog is friendly",
      highlightedWord: "dog",
      germanSentence: "Der _______ ist freundlich.",
      options: ["Hund", "Katze", "Pferd", "Kaninchen"],
      correctAnswer: "Hund"
    },
    {
      id: 5,
      englishSentence: "The tree is tall",
      highlightedWord: "tree",
      germanSentence: "Der _______ ist groß.",
      options: ["Baum", "Blume", "Gras", "Strauch"],
      correctAnswer: "Baum"
    }
  ]

  function changeQuestion() {
    if(activeId !== exercises.length -1 ){
      let newActiveId = activeId + 1;
      setActiveId(newActiveId)
    } else {
      setActiveId(1);
    }
  }

  return (
    <View style={styles.container}>
      <ExerciseModal 
        exercise={exercises[activeId]}
        changeQuestion={changeQuestion}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  }
})