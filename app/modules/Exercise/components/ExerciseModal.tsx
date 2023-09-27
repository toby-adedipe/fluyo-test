import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import AnswerModal from './AnswerModal';
import OptionButton from './OptionButtons';
import { colors } from '../../../utils/colors';

// Interface for Exercise data
interface Exercise {
  id: number;
  englishSentence: string;
  highlightedWord: string;
  germanSentence: string;
  options: string[];
  correctAnswer: string;
}

// Interface for Button component props
interface ButtonProps {
  style: object;
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

// Reusable Button component
function Button({ style, onPress, text, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

// Reusable Exercise component
export default function ExerciseModal({
  exercise,
  changeQuestion,
}: {
  exercise: Exercise;
  changeQuestion(): void;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function onSelectOption(option: string): void {
    setSelectedOption((prevOption) => prevOption === option ? "" : option);
  }

  function onChangeQuestion() {
    toggleModal(); // Close modal
    setSelectedOption(""); // Reset state
    changeQuestion(); // Change question
  }

  function toggleModal() {
    setModalVisible((prevVisible) => !prevVisible);
  }

  function checkAnswer(): boolean {
    return selectedOption === exercise.correctAnswer;
  }

  // Determine highlightedContainerStyle based on current state
  let highlightedContainerStyle = styles.highlightedContainer;
  if (modalVisible) {
    if (checkAnswer()) {
      highlightedContainerStyle = styles.correctHighlightedContainer;
    } else {
      highlightedContainerStyle = styles.wrongHighlightedContainer;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.quizContainer}>
        <AnswerModal
          modalVisible={modalVisible}
          checkAnswer={checkAnswer}
          onChangeQuestion={onChangeQuestion}
          correctAnswer={exercise.correctAnswer}
        />
        <Text style={styles.text}>Fill in the missing word</Text>
        <View style={styles.sentenceContainer}>
          {exercise.englishSentence.split(exercise.highlightedWord).map((part, index) => (
            <View key={index} style={styles.sentencePart}>
              <Text style={styles.sentenceText}>{part}</Text>
              {index === 0 && (
                <Text style={styles.highlightedWord}>
                  {exercise.highlightedWord}
                </Text>
              )}
            </View>
          ))}
        </View>
        {selectedOption.length > 0 ? (
          <View style={styles.sentenceContainer}>
            {exercise.germanSentence.split('_______').map((part, index) => (
              <View key={index} style={styles.sentencePart}>
                <Text style={styles.sentenceText}>{part}</Text>
                {index === 0 && (
                  <View style={highlightedContainerStyle}>
                    <Text style={!modalVisible ? styles.highlightedText : styles.visibleHighlightedText}>
                      {selectedOption}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.sentenceText}>{exercise.germanSentence}</Text>
        )}
        <OptionButton
          options={exercise.options}
          selectedOption={selectedOption}
          onSelectOption={onSelectOption}
        />
      </View>
      <View>
        {selectedOption.length > 0 ? (
          <Button
            style={styles.continueBtn}
            onPress={toggleModal}
            text="CHECK ANSWER"
          />
        ) : (
          <Button
            style={styles.deactivatedBtn}
            disabled
            text="CONTINUE"
            onPress={toggleModal}
          />
        )}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundColor,
    paddingVertical: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    gap: 200,
  },
  quizContainer: {
    alignItems: 'center',
    paddingTop: 32,
    gap: 32,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  sentenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentencePart: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentenceText: {
    color: colors.white,
    fontSize: 24,
  },
  highlightedContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  correctHighlightedContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
  },
  wrongHighlightedContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  highlightedText: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.backgroundColor,
  },
  visibleHighlightedText: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.white,
  },
  highlightedWord: {
    fontWeight: "bold",
    textDecorationLine: 'underline',
    fontSize: 24,
    color: colors.white,
  },
  deactivatedBtn: {
    backgroundColor: colors.darkGreen,
    width: '100%',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: colors.green,
    width: '100%',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontWeight: '600',
  },
});