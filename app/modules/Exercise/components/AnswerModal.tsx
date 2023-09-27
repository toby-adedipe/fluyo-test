import { 
  View, 
  Text,
  Modal, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

interface AnswerModalProps {
  modalVisible: boolean;
  checkAnswer(): boolean;
  onChangeQuestion(): void;
  correctAnswer: string;
}

export default function AnswerModal({
  modalVisible,
  checkAnswer,
  onChangeQuestion,
  correctAnswer,
}: AnswerModalProps) {
  const isAnswerCorrect = checkAnswer();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <View style={isAnswerCorrect ? styles.correctModalContainer : styles.wrongModalContainer}>
          {isAnswerCorrect ? (
            <Text style={[styles.answer, { fontWeight: "bold" }]}>Great Job!</Text>
          ) : (
            <View style={styles.modalText}>
              <Text style={[styles.answer, { fontWeight: "bold" }]}>Answer:</Text>
              <Text style={styles.answer}>{correctAnswer}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.modalBtn} onPress={onChangeQuestion}>
            <Text style={isAnswerCorrect ? styles.correctBtnText : styles.wrongBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const commonModalContainerStyles = {
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  padding: 32,
  gap: 20,
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  correctModalContainer: {
    ...commonModalContainerStyles,
    backgroundColor: colors.green,
  },
  wrongModalContainer: {
    ...commonModalContainerStyles,
    backgroundColor: colors.red,
  },
  modalBtn: {
    width: "100%",
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  answer: {
    color: colors.white,
    fontSize: 16,
  },
  modalText: {
    flexDirection: "row",
  },
  wrongBtnText: {
    fontWeight: "600",
    color: colors.red,
  },
  correctBtnText: {
    fontWeight: "600",
    color: colors.green,
  },
});