import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExerciseModal from '../components/ExerciseModal'
import { collection, onSnapshot, } from "firebase/firestore";
import { db } from '../../../utils/config';

interface ExerciseProp {
  id: number;
  correctAnswer: string;
  englishSentence: string;
  germanSentence: string;
  highlightedWord: string;
  options: string[];
}

export default function ExerciseScreen() {
  const [activeId, setActiveId] = useState<number>(1);
  const [exercises, setExercises] = useState<ExerciseProp[]>([]);
  const [error, setError] = useState<string| null >(null);
 
  useEffect(() => {
  // Initialize an empty array to store the fetched data
    const exercisesArray:ExerciseProp[] = [];
    const exercisesCollection = collection(db, "quizExercises");

    // Set up a listener to fetch and update data in real-time
    const unsubscribe = onSnapshot(exercisesCollection, 
      (querySnapshot: any) => {

        // Clear the existing data in the array
        exercisesArray.length = 0;

        // Loop through the documents in the "exercises" collection
        querySnapshot.forEach((doc: any) => {
          // Get the data from each document and add it to the array
          const exerciseData = doc.data();
          exercisesArray.push(exerciseData);
        });
  
        setExercises(exercisesArray);
      },
      (error: any) => {
        // Handle error
        console.error("Error fetching exercises:", error);
        setError(error)
      }
    );
  
    // Unsubscribe from the listener when the component is unmounted or when the dependencies change
    return () => unsubscribe();
  }, [])

  function changeQuestion() {
    setActiveId(prevActiveId => (prevActiveId !== exercises.length - 1 ? prevActiveId + 1 : 1));
  }
  
  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error occurred while fetching data</Text>
      ) : exercises.length > 0 ? (
        <ExerciseModal 
          exercise={exercises[activeId]}
          changeQuestion={changeQuestion}
        />
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
          <Text>Fetching Data...</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
})