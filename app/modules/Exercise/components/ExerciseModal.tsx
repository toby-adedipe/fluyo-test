import { 
  View, 
  Text,
  StyleSheet, 
  ViewProps, 
  TouchableOpacity 
} from 'react-native'
import React, { useState } from 'react'
import AnswerModal from './AnswerModal';
import OptionButton from './OptionButtons';
import { colors } from '../../../utils/colors';

interface Props extends ViewProps {
  exercise: {
    id: number;
    englishSentence: string;
    highlightedWord: string;
    germanSentence: string;
    options: string[];
    correctAnswer: string;
  },
  changeQuestion(): void;
}

interface ButtonProps {
  style: object;
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

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

export default function ExerciseModal({
  exercise,
  changeQuestion,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function onSelectOption(option: string): void {
    setSelectedOption((prevOption) => prevOption === option ? "" : option);
  }

  function onChangeQuestion() {
    toggleModal();
    setSelectedOption("");
    changeQuestion();
  }

  function toggleModal() {
    setModalVisible((prevVisible) => !prevVisible);
  }

  function checkAnswer(): boolean {
    return selectedOption === exercise.correctAnswer;
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
                  <View style={styles.highlightedContainer}>
                    <Text style={styles.highlightedText}>
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
      <View style={styles.btnContainer}>
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
  btnContainer: {},
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
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedText: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.backgroundColor,
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